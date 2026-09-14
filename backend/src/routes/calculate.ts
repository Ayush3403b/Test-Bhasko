import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { calculate, type EngineInput } from '../calculators/solarEngine';
import connectDB from '../database/connection';
import { City } from '../database/models';

const router = Router();

const CalcSchema = z.object({
  monthlyBill: z.coerce.number().min(0).optional(),
  monthlyUnits: z.coerce.number().min(0).optional(),
  city: z.string().min(1).optional(),
  propertyType: z.enum(['residential', 'commercial', 'industrial', 'institutional', 'apartment']).default('residential'),
  roofArea: z.coerce.number().min(0).optional(),
  roofType: z.enum(['rcc', 'metal-sheet', 'tiled', 'other']).default('rcc'),
  systemType: z.enum(['on-grid', 'hybrid', 'off-grid']).default('on-grid'),
  evRequirement: z.coerce.boolean().default(false),
  batteryRequirement: z.coerce.boolean().default(false),
  tariff: z.coerce.number().min(0).optional(),
  evDailyKm: z.coerce.number().min(0).optional(),
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const input = CalcSchema.parse(req.body);

    await connectDB();
    let cityData;
    if (input.city) {
      cityData = await City.findOne({ slug: input.city.toLowerCase() }).lean();
      if (!cityData) {
        cityData = await City.findOne({ name: new RegExp(`^${input.city}$`, 'i') }).lean();
      }
    }

    const engineInput: EngineInput = {
      ...input,
      cityData: (cityData as any) || undefined,
    };
    const result = calculate(engineInput);
    res.json({ ok: true, data: { result, city: cityData || null } });
  } catch (e: any) {
    if (e?.name === 'ZodError') {
      res.status(400).json({ error: 'Invalid input', details: e?.issues });
      return;
    }
    console.error('Calculation error:', e);
    res.status(500).json({ error: 'Calculation failed' });
  }
});

export default router;
