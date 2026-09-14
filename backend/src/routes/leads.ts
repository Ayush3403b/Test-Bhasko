import { Router, Request, Response } from 'express';
import { z } from 'zod';
import connectDB from '../database/connection';
import { Lead, City } from '../database/models';
import { calculate, type EngineInput } from '../calculators/solarEngine';
import { sendEmail } from '../services/email';

const router = Router();

const LeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  city: z.string().min(1),
  state: z.string().optional(),
  propertyType: z.enum(['residential', 'commercial', 'industrial', 'institutional', 'apartment']).default('residential'),
  monthlyBill: z.coerce.number().min(0).optional(),
  monthlyUnits: z.coerce.number().min(0).optional(),
  roofArea: z.coerce.number().min(0).optional(),
  roofType: z.enum(['rcc', 'metal-sheet', 'tiled', 'other']).default('rcc'),
  systemType: z.enum(['on-grid', 'hybrid', 'off-grid']).default('on-grid'),
  evRequirement: z.boolean().default(false),
  batteryRequirement: z.boolean().default(false),
  source: z.enum(['calculator', 'homepage', 'contact-form', 'report-request', 'survey', 'commercial', 'society', 'partner', 'whatsapp', 'blog', 'referral', 'other']).default('calculator'),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  sendConfirmation: z.boolean().default(true),
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const data = LeadSchema.parse(req.body);

    await connectDB();
    const cityDoc = await City.findOne({ name: new RegExp(`^${data.city}$`, 'i') }).lean() ||
                    await City.findOne({ slug: data.city.toLowerCase() }).lean();

    const engineInput: EngineInput = { ...data, cityData: (cityDoc as any) || undefined };
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

    /* notify admin */
    sendEmail(process.env.RESEND_FROM_EMAIL || 'admin@bhasko.in', 'admin-lead-notification', {
      name: data.name, city: data.city, bill: data.monthlyBill, capacity: calc.recommendedCapacity, source: data.source,
    }).catch(() => {});

    res.json({ ok: true, data: { leadId: (lead._id as any).toString(), calculation: calc } });
  } catch (e: any) {
    console.error('Lead creation error:', e);
    if (e?.name === 'ZodError') {
      res.status(422).json({ error: 'Validation failed', details: e.issues });
      return;
    }
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

export default router;
