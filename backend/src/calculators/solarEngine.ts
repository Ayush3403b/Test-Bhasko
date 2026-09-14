/**
 * Centralized Solar Calculation Engine.
 * All backend calculators (leads, calculator API) route through this module.
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

function subsidyFor(capacityKw: number, propertyType?: string): number {
  if (propertyType && propertyType !== 'residential') return 0;
  const capped = Math.min(Math.ceil(capacityKw), 5);
  if (capped <= 0) return 0;
  if (capped <= 3) return capped * 30000;
  return 78000;
}

function roofAreaForCapacity(kw: number, roofType?: string): number {
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

  /* Savings */
  const selfConsumptionPct = input.propertyType === 'commercial' || input.propertyType === 'industrial' ? 0.95 : 0.9;
  const monthlySavings = (estimatedAnnualGeneration / 12) * tariff * selfConsumptionPct;
  const annualSavingsFinal = monthlySavings * 12;

  /* Cost */
  const costPerKw = systemType === 'hybrid' ? DEFAULTS.costPerKwHybrid : systemType === 'off-grid' ? DEFAULTS.costPerKwOffGrid : DEFAULTS.costPerKwOnGrid;
  let grossCost = recommendedCapacity * costPerKw;

  if (input.batteryRequirement || systemType !== 'on-grid') {
    const batteryKwh = Math.ceil(recommendedCapacity * 2);
    grossCost += batteryKwh * 15000;
  }

  const subsidy = input.cityData?.subsidyApplicable === false ? 0 : subsidyFor(recommendedCapacity, input.propertyType);
  const netCost = Math.max(0, grossCost - subsidy);

  const paybackPeriodYears = annualSavingsFinal > 0 ? netCost / annualSavingsFinal : 99;

  /* 25-year LCOE */
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
