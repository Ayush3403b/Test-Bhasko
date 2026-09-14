/**
 * Centralized Solar Calculation Engine.
 * All calculators (homepage, full, AI Advisor, Bill Analyzer, Business, Society, EV)
 * MUST route through this module. No UI component should re-derive these formulas.
 */

export interface EngineInput {
  monthlyBill?: number;
  monthlyUnits?: number;
  city?: string;
  cityData?: CityYield;
  propertyType?: 'residential' | 'commercial' | 'industrial' | 'institutional' | 'apartment';
  roofArea?: number;
  roofType?: 'rcc' | 'metal-sheet' | 'tiled' | 'other';
  systemType?: 'on-grid' | 'hybrid' | 'off-grid';
  evRequirement?: boolean;
  batteryRequirement?: boolean;
  tariff?: number;
  solarYield?: number;
  panelEfficiency?: number;
  evDailyKm?: number;
  evEfficiencyKmpkwh?: number;
  evChargingFrequency?: number;
}

export interface CityYield {
  name: string;
  state: string;
  solarYieldKwhPerKwPerDay: number;
  avgTariff: number;
  discom?: string;
  subsidyApplicable: boolean;
}

export interface EngineResult {
  recommendedCapacity: number;
  estimatedAnnualGeneration: number;
  estimatedDailyGeneration: number;
  monthlySavings: number;
  annualSavings: number;
  subsidy: number;
  grossCost: number;
  netCost: number;
  paybackPeriodYears: number;
  twentyFiveYearSavings: number;
  co2ReductionTonsPerYear: number;
  co2ReductionTons25y: number;
  tariffUsed: number;
  yieldUsed: number;
  systemType: 'on-grid' | 'hybrid' | 'off-grid';
  evChargingLoadKwh?: number;
  roofAreaRequired: number;
  notes: string[];
}

/* ---------- Defaults ---------- */
const DEFAULTS = {
  tariff: 7.5,
  yieldKwhPerKwPerDay: 4.5,
  panelWattPerSqm: 180,
  costPerKwOnGrid: 55000,
  costPerKwHybrid: 90000,
  costPerKwOffGrid: 110000,
  degradationPctPerYear: 0.7,
  oAndMPerKwPerYear: 1000,
  escalationPct: 4,
  co2KgPerKwh: 0.82,
};

/* ---------- Subsidy table (PM Surya Ghar, residential, indicative) ---------- */
/* NOTE: These are placeholders to be replaced with DB-driven values at runtime. */
const PM_SURYA_GHAR_SUBSIDY: Record<number, number> = {
  1: 30000,
  2: 60000,
  3: 78000,
  4: 78000,
  5: 78000,
};

function subsidyFor(capacityKw: number, propertyType?: string): number {
  if (propertyType && propertyType !== 'residential') return 0;
  const capped = Math.min(Math.ceil(capacityKw), 5);
  if (capped <= 0) return 0;
  if (capped <= 3) return capped * 30000;
  return 78000;
}

function roofAreaForCapacity(kw: number, roofType?: string): number {
  /* Approx 100 sq ft per kW for RCC; ~85 for metal sheet */
  const sqftPerKw = roofType === 'metal-sheet' ? 85 : 100;
  return kw * sqftPerKw;
}

function pickCapacityFromUnits(monthlyUnits: number, systemType: 'on-grid' | 'hybrid' | 'off-grid', yieldPerKwDay: number, evKwh?: number): number {
  const dailyConsumption = monthlyUnits / 30;
  const evDaily = evKwh || 0;
  const totalDaily = dailyConsumption + evDaily;
  let kw = totalDaily / (yieldPerKwDay * 0.85);
  if (systemType === 'off-grid') kw *= 1.3;
  if (systemType === 'hybrid') kw *= 1.1;
  return Math.max(1, Math.round(kw * 2) / 2);
}

function pickCapacityFromBill(monthlyBill: number, tariff: number, yieldPerKwDay: number, evKwh?: number, systemType: 'on-grid' | 'hybrid' | 'off-grid' = 'on-grid'): number {
  const monthlyUnits = monthlyBill / tariff;
  return pickCapacityFromUnits(monthlyUnits, systemType, yieldPerKwDay, evKwh);
}

export function calculate(input: EngineInput): EngineResult {
  const notes: string[] = [];
  const systemType = input.systemType || 'on-grid';
  const tariff = input.tariff || input.cityData?.avgTariff || DEFAULTS.tariff;
  const yieldPerKwDay = input.solarYield || input.cityData?.solarYieldKwhPerKwPerDay || DEFAULTS.yieldKwhPerKwPerDay;

  let evDailyKwh = 0;
  if (input.evRequirement && input.evDailyKm) {
    const kmpkwh = input.evEfficiencyKmpkwh || 8;
    evDailyKwh = input.evDailyKm / kmpkwh;
  }

  /* Derive recommended capacity */
  let recommendedCapacity: number;
  if (input.monthlyUnits && input.monthlyUnits > 0) {
    recommendedCapacity = pickCapacityFromUnits(input.monthlyUnits, systemType, yieldPerKwDay, evDailyKwh);
  } else if (input.monthlyBill && input.monthlyBill > 0) {
    recommendedCapacity = pickCapacityFromBill(input.monthlyBill, tariff, yieldPerKwDay, evDailyKwh, systemType);
  } else if (input.roofArea && input.roofArea > 0) {
    const sqftPerKw = input.roofType === 'metal-sheet' ? 85 : 100;
    recommendedCapacity = Math.floor(input.roofArea / sqftPerKw);
    notes.push('Capacity estimated from provided roof area. Add your electricity bill for a precise recommendation.');
  } else {
    recommendedCapacity = 3;
    notes.push('Default 3 kW estimate. Share your bill or units for an accurate figure.');
  }

  /* Cap to available roof area if provided */
  if (input.roofArea && input.roofArea > 0) {
    const sqftPerKw = input.roofType === 'metal-sheet' ? 85 : 100;
    const maxRoofCapacity = input.roofArea / sqftPerKw;
    if (recommendedCapacity > maxRoofCapacity) {
      recommendedCapacity = Math.floor(maxRoofCapacity * 2) / 2;
      notes.push('Recommended capacity reduced to match available roof area.');
    }
  }

  recommendedCapacity = Math.max(1, Math.round(recommendedCapacity * 2) / 2);

  /* Generation */
  const estimatedAnnualGeneration = recommendedCapacity * yieldPerKwDay * 365 * 0.8;
  const estimatedDailyGeneration = estimatedAnnualGeneration / 365;
  const monthlyUnitsGenerated = estimatedAnnualGeneration / 12;

  /* Savings — assume 90% self-consumption for residential, 95% for commercial */
  const selfConsumptionPct = input.propertyType === 'commercial' || input.propertyType === 'industrial' ? 0.95 : 0.9;
  const annualSavings = monthlyUnitsGenerated * 12 * tariff * selfConsumptionPct / 12 * (1 + 0.05);
  /* simpler formula */
  const monthlySavings = (estimatedAnnualGeneration / 12) * tariff * selfConsumptionPct;
  const annualSavingsFinal = monthlySavings * 12;

  /* Cost */
  const costPerKw = systemType === 'hybrid' ? DEFAULTS.costPerKwHybrid : systemType === 'off-grid' ? DEFAULTS.costPerKwOffGrid : DEFAULTS.costPerKwOnGrid;
  let grossCost = recommendedCapacity * costPerKw;

  /* Add battery cost ~₹45k per kWh, assume 3kWh per kW for hybrid/0 for off-grid sizing */
  if (input.batteryRequirement || systemType !== 'on-grid') {
    const batteryKwh = Math.ceil(recommendedCapacity * 2);
    grossCost += batteryKwh * 15000;
  }

  const subsidy = input.cityData?.subsidyApplicable === false ? 0 : subsidyFor(recommendedCapacity, input.propertyType);
  const netCost = Math.max(0, grossCost - subsidy);

  const paybackPeriodYears = annualSavingsFinal > 0 ? netCost / annualSavingsFinal : 99;

  /* 25-year LCOE with degradation + escalation */
  let totalSavings25y = 0;
  let annualGen = estimatedAnnualGeneration;
  let annualTariff = tariff;
  const omAnnual = recommendedCapacity * DEFAULTS.oAndMPerKwPerYear;
  for (let y = 0; y < 25; y++) {
    totalSavings25y += annualGen * annualTariff * selfConsumptionPct - omAnnual * Math.pow(1.05, y);
    annualGen *= (1 - DEFAULTS.degradationPctPerYear / 100);
    annualTariff *= (1 + DEFAULTS.escalationPct / 100);
  }

  const co2Annual = (estimatedAnnualGeneration * DEFAULTS.co2KgPerKwh) / 1000;
  const co225 = co2Annual * 22;

  return {
    recommendedCapacity,
    estimatedAnnualGeneration,
    estimatedDailyGeneration,
    monthlySavings,
    annualSavings: annualSavingsFinal,
    subsidy,
    grossCost,
    netCost,
    paybackPeriodYears: Math.round(paybackPeriodYears * 10) / 10,
    twentyFiveYearSavings: Math.max(0, totalSavings25y),
    co2ReductionTonsPerYear: co2Annual,
    co2ReductionTons25y: co225,
    tariffUsed: tariff,
    yieldUsed: yieldPerKwDay,
    systemType,
    evChargingLoadKwh: evDailyKwh || undefined,
    roofAreaRequired: roofAreaForCapacity(recommendedCapacity, input.roofType),
    notes,
  };
}

export function calculateEMI(principal: number, annualRatePct = 9.5, tenureMonths = 84) {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return { emi: principal / tenureMonths, totalInterest: 0, totalRepayment: principal };
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  const totalRepayment = emi * tenureMonths;
  return { emi, totalInterest: totalRepayment - principal, totalRepayment };
}

export function calculateRoofSuitability(input: {
  roofArea: number;
  roofType: 'rcc' | 'metal-sheet' | 'tiled' | 'other';
  shading: 'low' | 'medium' | 'high';
  orientation?: string;
  buildingType?: string;
}): { score: number; breakdown: { label: string; score: number; max: number }[]; usableArea: number; estimatedCapacity: number } {
  let score = 100;
  const breakdown: { label: string; score: number; max: number }[] = [];

  let areaScore = 30;
  if (input.roofArea < 100) areaScore = 10;
  else if (input.roofArea < 200) areaScore = 20;
  else if (input.roofArea < 300) areaScore = 26;
  breakdown.push({ label: 'Roof Area', score: areaScore, max: 30 });

  let typeScore = 20;
  if (input.roofType === 'rcc') typeScore = 20;
  else if (input.roofType === 'metal-sheet') typeScore = 16;
  else if (input.roofType === 'tiled') typeScore = 12;
  else typeScore = 10;
  breakdown.push({ label: 'Roof Type', score: typeScore, max: 20 });

  let shadeScore = 30;
  if (input.shading === 'low') shadeScore = 30;
  else if (input.shading === 'medium') shadeScore = 20;
  else shadeScore = 8;
  breakdown.push({ label: 'Shading', score: shadeScore, max: 30 });

  let orientScore = 20;
  const orient = (input.orientation || 'south').toLowerCase();
  if (orient.includes('south')) orientScore = 20;
  else if (orient.includes('west') || orient.includes('east')) orientScore = 16;
  else orientScore = 12;
  breakdown.push({ label: 'Orientation', score: orientScore, max: 20 });

  const total = areaScore + typeScore + shadeScore + orientScore;

  const sqftPerKw = input.roofType === 'metal-sheet' ? 85 : 100;
  const usableFactor = (areaScore / 30) * (shadeScore / 30) * 0.9;
  const usableArea = input.roofArea * usableFactor;
  const estimatedCapacity = Math.floor((usableArea / sqftPerKw) * 2) / 2;

  return { score: total, breakdown, usableArea: Math.round(usableArea), estimatedCapacity: Math.max(1, estimatedCapacity) };
}
