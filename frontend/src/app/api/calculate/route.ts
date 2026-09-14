import { NextRequest } from 'next/server';
import { z } from 'zod';
import { calculate, type EngineInput } from '@/calculators/solarEngine';
import connectDB from '@/server/database/connection';
import { City } from '@/server/database/models';
import { apiOk, apiError } from '@/lib/api';

const CalcSchema = z.object({
  monthlyBill: z.coerce.number().min(0).optional(),
  monthlyUnits: z.coerce.number().min(0).optional(),
  city: z.string().min(1).optional(),
  propertyType: z.enum(['residential','commercial','industrial','institutional','apartment']).default('residential'),
  roofArea: z.coerce.number().min(0).optional(),
  roofType: z.enum(['rcc','metal-sheet','tiled','other']).default('rcc'),
  systemType: z.enum(['on-grid','hybrid','off-grid']).default('on-grid'),
  evRequirement: z.coerce.boolean().default(false),
  batteryRequirement: z.coerce.boolean().default(false),
  tariff: z.coerce.number().min(0).optional(),
  evDailyKm: z.coerce.number().min(0).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const input = CalcSchema.parse(json);

    await connectDB();
    let cityData;
    if (input.city) {
      cityData = await City.findOne({ slug: input.city.toLowerCase() }).lean();
      if (!cityData) {
        // by name
        cityData = await City.findOne({ name: new RegExp(`^${input.city}$`, 'i') }).lean();
      }
    }

    const engineInput: EngineInput = {
      ...input,
      cityData: cityData || undefined,
    };
    const result = calculate(engineInput);
    return apiOk({ result, city: cityData || null });
  } catch (e: any) {
    if (e?.name === 'ZodError') return apiError('Invalid input', 400, e?.issues);
    console.error(e);
    return apiError('Calculation failed', 500);
  }
}
