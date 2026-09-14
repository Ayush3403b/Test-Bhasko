import { Router, Request, Response } from 'express';
import { seedDatabase } from '../database/seeds';

const router = Router();

router.all('/', async (req: Request, res: Response) => {
  try {
    const result = await seedDatabase();
    res.json(result);
  } catch (e: any) {
    console.error('Seed error:', e);
    res.status(500).json({ error: 'Seed failed', details: e?.message });
  }
});

export default router;
