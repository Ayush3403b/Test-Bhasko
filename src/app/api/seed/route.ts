import { seedDatabase } from '@/lib/seeds';
import { apiOk, apiError } from '@/lib/api';

export async function POST() {
  try {
    const result = await seedDatabase();
    return apiOk(result);
  } catch (e) {
    console.error(e);
    return apiError('Seed failed', 500);
  }
}

export async function GET() {
  try {
    const result = await seedDatabase();
    return apiOk(result);
  } catch (e) {
    console.error(e);
    return apiError('Seed failed', 500);
  }
}
