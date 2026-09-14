import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, prefix = '₹'): string {
  if (amount >= 10000000) return `${prefix}${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `${prefix}${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `${prefix}${(amount / 1000).toFixed(1)}k`;
  return `${prefix}${Math.round(amount).toLocaleString('en-IN')}`;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(Math.round(num));
}

export function formatKwh(kwh: number): string {
  if (kwh >= 1000) return `${(kwh / 1000).toFixed(1)}k`;
  return `${Math.round(kwh)}`;
}

export function formatPercent(n: number): string {
  return `${Math.round(n)}%`;
}

export function yearsToMonths(years: number): number {
  return years * 12;
}

export function calculateEMI(principal: number, annualRatePct: number = 9.5, tenureMonths: number = 84): { emi: number; totalInterest: number; totalRepayment: number } {
  if (principal <= 0) return { emi: 0, totalInterest: 0, totalRepayment: 0 };
  const r = annualRatePct / 12 / 100;
  let emi: number;
  if (r === 0) emi = principal / tenureMonths;
  else emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  const totalRepayment = emi * tenureMonths;
  return { emi, totalInterest: totalRepayment - principal, totalRepayment };
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
