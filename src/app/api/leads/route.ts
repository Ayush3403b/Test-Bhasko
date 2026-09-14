import { NextRequest } from 'next/server';
import { z } from 'zod';
import connectDB from '@/server/database/connection';
import { Lead, City } from '@/server/database/models';
import { calculate, type EngineInput } from '@/calculators/solarEngine';
import { sendEmail } from '@/server/services/email';
import { apiOk, apiError } from '@/lib/api';

const LeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  city: z.string().min(1),
  state: z.string().optional(),
  propertyType: z.enum(['residential','commercial','industrial','institutional','apartment']).default('residential'),
  monthlyBill: z.coerce.number().min(0).optional(),
  monthlyUnits: z.coerce.number().min(0).optional(),
  roofArea: z.coerce.number().min(0).optional(),
  roofType: z.enum(['rcc','metal-sheet','tiled','other']).default('rcc'),
  systemType: z.enum(['on-grid','hybrid','off-grid']).default('on-grid'),
  evRequirement: z.boolean().default(false),
  batteryRequirement: z.boolean().default(false),
  source: z.enum(['calculator','homepage','contact-form','report-request','survey','commercial','society','partner','whatsapp','blog','referral','other']).default('calculator'),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  sendConfirmation: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = LeadSchema.parse(json);

    await connectDB();
    const cityDoc = await City.findOne({ name: new RegExp(`^${data.city}$`, 'i') }).lean() ||
                    await City.findOne({ slug: data.city.toLowerCase() }).lean();

    const engineInput: EngineInput = { ...data, cityData: cityDoc || undefined };
    const calc = calculate(engineInput);

    const lead = await Lead.create({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      city: data.city,
      state: data.state,
      propertyType: data.propertyType,
      monthlyBill: data.monthlyBill,
      recommendedCapacity: calc.recommendedCapacity,
      systemType: data.systemType,
      source: data.source,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      status: 'new',
      calculation: {
        monthlyBill: data.monthlyBill || 0,
        monthlyUnits: data.monthlyUnits,
        city: data.city,
        propertyType: data.propertyType,
        roofArea: data.roofArea,
        roofType: data.roofType,
        systemType: data.systemType,
        evRequirement: data.evRequirement,
        batteryRequirement: data.batteryRequirement,
        tariff: calc.tariffUsed,
        solarYield: calc.yieldUsed,
        recommendedCapacity: calc.recommendedCapacity,
        estimatedAnnualGeneration: calc.estimatedAnnualGeneration,
        monthlySavings: calc.monthlySavings,
        annualSavings: calc.annualSavings,
        subsidyAmount: calc.subsidy,
        grossCost: calc.grossCost,
        netCost: calc.netCost,
        paybackPeriodYears: calc.paybackPeriodYears,
        twentyFiveYearSavings: calc.twentyFiveYearSavings,
        co2ReductionTons: calc.co2ReductionTonsPerYear,
      },
    });

    if (data.sendConfirmation && data.email) {
      sendEmail(data.email, 'lead-confirmation', {
        name: data.name,
        phone: data.phone,
        capacity: calc.recommendedCapacity,
        monthlySavings: calc.monthlySavings,
        payback: calc.paybackPeriodYears,
      }).catch(err => console.error('email error', err));
    }

    /* notify admin (dev console in local) */
    sendEmail(process.env.RESEND_FROM_EMAIL || 'admin@bhasko.in', 'admin-lead-notification', {
      name: data.name, city: data.city, bill: data.monthlyBill, capacity: calc.recommendedCapacity, source: data.source,
    }).catch(() => {});

    return apiOk({ leadId: (lead._id as any).toString(), calculation: calc });
  } catch (e: any) {
    console.error(e);
    if (e?.name === 'ZodError') return apiError('Validation failed', 422, e.issues);
    return apiError('Failed to create lead', 500);
  }
}
