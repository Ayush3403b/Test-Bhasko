import mongoose, { Schema, Document, Model } from 'mongoose';

/* ---------- Types ---------- */
export type PropertyType = 'residential' | 'commercial' | 'industrial' | 'institutional' | 'apartment';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'site-survey' | 'proposal-sent' | 'negotiation' | 'won' | 'lost' | 'converted';
export type LeadSource = 'calculator' | 'homepage' | 'contact-form' | 'report-request' | 'survey' | 'commercial' | 'society' | 'partner' | 'whatsapp' | 'blog' | 'referral' | 'other';
export type ProjectStatus = 'order-confirmed' | 'site-survey' | 'system-design' | 'discom-application' | 'installation' | 'inspection' | 'net-meter' | 'subsidy-processing' | 'subsidy-credited' | 'live';
export type RoofType = 'rcc' | 'metal-sheet' | 'tiled' | 'other';
export type SystemType = 'on-grid' | 'hybrid' | 'off-grid';
export type ServiceStatus = 'open' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
export type ContentStatus = 'draft' | 'published' | 'archived';

/* ---------- Reusable sub-docs ---------- */
const SolarCalculationSchema = new Schema({
  monthlyBill: { type: Number, required: true, min: 0 },
  monthlyUnits: { type: Number, min: 0 },
  city: { type: String, required: true },
  propertyType: { type: String, enum: ['residential', 'commercial', 'industrial', 'institutional', 'apartment'] },
  roofArea: { type: Number, min: 0 },
  roofType: { type: String, enum: ['rcc', 'metal-sheet', 'tiled', 'other'] },
  systemType: { type: String, enum: ['on-grid', 'hybrid', 'off-grid'], default: 'on-grid' },
  evRequirement: { type: Boolean, default: false },
  batteryRequirement: { type: Boolean, default: false },
  tariff: { type: Number },
  solarYield: { type: Number },
  recommendedCapacity: { type: Number },
  estimatedAnnualGeneration: { type: Number },
  monthlySavings: { type: Number },
  annualSavings: { type: Number },
  subsidyAmount: { type: Number },
  grossCost: { type: Number },
  netCost: { type: Number },
  paybackPeriodYears: { type: Number },
  twentyFiveYearSavings: { type: Number },
  co2ReductionTons: { type: Number },
}, { _id: false });

/* ---------- Models ---------- */

export interface ILead extends Document {
  name: string;
  phone: string;
  email?: string;
  city: string;
  state?: string;
  propertyType: PropertyType;
  monthlyBill?: number;
  recommendedCapacity?: number;
  systemType?: SystemType;
  source: LeadSource;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status: LeadStatus;
  notes?: string;
  calculation?: typeof SolarCalculationSchema;
  assignedTo?: mongoose.Types.ObjectId;
  followUpAt?: Date;
  customerId?: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
}

const LeadSchema = new Schema<ILead>({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, index: true },
  email: { type: String, trim: true, lowercase: true },
  city: { type: String, required: true },
  state: String,
  propertyType: { type: String, enum: ['residential', 'commercial', 'industrial', 'institutional', 'apartment'], default: 'residential' },
  monthlyBill: { type: Number, min: 0 },
  recommendedCapacity: { type: Number, min: 0 },
  systemType: { type: String, enum: ['on-grid', 'hybrid', 'off-grid'] },
  source: { type: String, enum: ['calculator', 'homepage', 'contact-form', 'report-request', 'survey', 'commercial', 'society', 'partner', 'whatsapp', 'blog', 'referral', 'other'], default: 'other', index: true },
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'site-survey', 'proposal-sent', 'negotiation', 'won', 'lost', 'converted'], default: 'new', index: true },
  notes: String,
  calculation: SolarCalculationSchema,
  assignedTo: { type: Schema.Types.ObjectId, ref: 'AdminUser' },
  followUpAt: Date,
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
}, { timestamps: true });

export interface ICustomer extends Document {
  userId?: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
}
const CustomerSchema = new Schema<ICustomer>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  phone: { type: String, required: true, index: true },
  email: { type: String, lowercase: true },
  city: { type: String, required: true },
  address: String,
}, { timestamps: true });

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: 'customer' | 'admin';
  emailVerified?: Date;
  image?: string;
}
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: String,
  phone: String,
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  emailVerified: Date,
  image: String,
}, { timestamps: true });

export interface ISolarReport extends Document {
  leadId?: mongoose.Types.ObjectId;
  customerId?: mongoose.Types.ObjectId;
  customerName: string;
  email?: string;
  phone?: string;
  city: string;
  calculation: typeof SolarCalculationSchema;
  equipment: { panels?: string; inverter?: string; mounting?: string; cables?: string; };
  reportUrl?: string;
  emailedAt?: Date;
}
const SolarReportSchema = new Schema<ISolarReport>({
  leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  customerName: { type: String, required: true },
  email: String,
  phone: String,
  city: { type: String, required: true },
  calculation: { type: SolarCalculationSchema, required: true },
  equipment: {
    panels: String,
    inverter: String,
    mounting: String,
    cables: String,
  },
  reportUrl: String,
  emailedAt: Date,
}, { timestamps: true });

export interface ISolarAssessment extends Document {
  leadId?: mongoose.Types.ObjectId;
  city: string;
  roofArea: number;
  roofType: RoofType;
  buildingType: PropertyType;
  orientation?: string;
  shading?: 'low' | 'medium' | 'high';
  hasRoofPhoto: boolean;
  suitabilityScore: number;
  usableArea?: number;
  estimatedCapacity?: number;
}
const SolarAssessmentSchema = new Schema<ISolarAssessment>({
  leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
  city: { type: String, required: true },
  roofArea: { type: Number, required: true, min: 50 },
  roofType: { type: String, enum: ['rcc', 'metal-sheet', 'tiled', 'other'], required: true },
  buildingType: { type: String, enum: ['residential', 'commercial', 'industrial', 'institutional', 'apartment'] },
  orientation: String,
  shading: { type: String, enum: ['low', 'medium', 'high'] },
  hasRoofPhoto: { type: Boolean, default: false },
  suitabilityScore: { type: Number, required: true, min: 0, max: 100 },
  usableArea: Number,
  estimatedCapacity: Number,
}, { timestamps: true });

export interface IElectricityBill extends Document {
  leadId?: mongoose.Types.ObjectId;
  consumerNumber?: string;
  billFileUrl?: string;
  monthlyUnits?: number;
  billingPeriod?: string;
  tariff?: number;
  totalAmount?: number;
  averageConsumption?: number;
  discom?: string;
  parsed: boolean;
}
const ElectricityBillSchema = new Schema<IElectricityBill>({
  leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
  consumerNumber: String,
  billFileUrl: String,
  monthlyUnits: Number,
  billingPeriod: String,
  tariff: Number,
  totalAmount: Number,
  averageConsumption: Number,
  discom: String,
  parsed: { type: Boolean, default: false },
}, { timestamps: true });

export interface IProject extends Document {
  customerId: mongoose.Types.ObjectId;
  leadId?: mongoose.Types.ObjectId;
  systemCapacityKw: number;
  systemType: SystemType;
  propertyType: PropertyType;
  city: string;
  status: ProjectStatus;
  cost: number;
  subsidy?: number;
  timeline: { stage: ProjectStatus; date?: Date; notes?: string; }[];
  installationDate?: Date;
}
const ProjectSchema = new Schema<IProject>({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
  systemCapacityKw: { type: Number, required: true, min: 0.5 },
  systemType: { type: String, enum: ['on-grid', 'hybrid', 'off-grid'], default: 'on-grid' },
  propertyType: { type: String, enum: ['residential', 'commercial', 'industrial', 'institutional', 'apartment'] },
  city: { type: String, required: true },
  status: { type: String, enum: ['order-confirmed', 'site-survey', 'system-design', 'discom-application', 'installation', 'inspection', 'net-meter', 'subsidy-processing', 'subsidy-credited', 'live'], default: 'order-confirmed', index: true },
  cost: { type: Number, required: true },
  subsidy: Number,
  timeline: [{
    stage: { type: String, enum: ['order-confirmed', 'site-survey', 'system-design', 'discom-application', 'installation', 'inspection', 'net-meter', 'subsidy-processing', 'subsidy-credited', 'live'] },
    date: Date,
    notes: String,
  }],
  installationDate: Date,
}, { timestamps: true });

export interface ICustomerSystem extends Document {
  customerId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  capacityKw: number;
  panelBrand?: string;
  inverterBrand?: string;
  installationDate: Date;
  healthScore: number;
  nextCleaningDue?: Date;
  amcPlan?: 'basic' | 'smart' | 'premium';
}
const CustomerSystemSchema = new Schema<ICustomerSystem>({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  capacityKw: { type: Number, required: true },
  panelBrand: String,
  inverterBrand: String,
  installationDate: { type: Date, required: true },
  healthScore: { type: Number, default: 95, min: 0, max: 100 },
  nextCleaningDue: Date,
  amcPlan: { type: String, enum: ['basic', 'smart', 'premium'] },
}, { timestamps: true });

export interface IGenerationRecord extends Document {
  customerSystemId: mongoose.Types.ObjectId;
  date: Date;
  generationKwh: number;
  consumptionKwh?: number;
  exportKwh?: number;
  importKwh?: number;
  savings: number;
  co2SavedKg: number;
}
const GenerationRecordSchema = new Schema<IGenerationRecord>({
  customerSystemId: { type: Schema.Types.ObjectId, ref: 'CustomerSystem', required: true, index: true },
  date: { type: Date, required: true, index: true },
  generationKwh: { type: Number, required: true },
  consumptionKwh: Number,
  exportKwh: Number,
  importKwh: Number,
  savings: { type: Number, default: 0 },
  co2SavedKg: { type: Number, default: 0 },
}, { timestamps: true });
GenerationRecordSchema.index({ customerSystemId: 1, date: 1 }, { unique: true });

export interface IServiceRequest extends Document {
  customerId: mongoose.Types.ObjectId;
  customerSystemId?: mongoose.Types.ObjectId;
  type: 'maintenance' | 'cleaning' | 'repair' | 'monitoring' | 'complaint' | 'other';
  description: string;
  status: ServiceStatus;
  scheduledDate?: Date;
  resolvedAt?: Date;
  notes?: string;
}
const ServiceRequestSchema = new Schema<IServiceRequest>({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  customerSystemId: { type: Schema.Types.ObjectId, ref: 'CustomerSystem' },
  type: { type: String, enum: ['maintenance', 'cleaning', 'repair', 'monitoring', 'complaint', 'other'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'assigned', 'in-progress', 'resolved', 'closed'], default: 'open', index: true },
  scheduledDate: Date,
  resolvedAt: Date,
  notes: String,
}, { timestamps: true });

export interface ISolarPackage extends Document {
  name: 'Essential' | 'Smart' | 'Premium';
  tagline: string;
  description: string;
  pricePerKw: number;
  features: string[];
  recommended?: boolean;
  warranty: string;
  monitoring: string;
  status: ContentStatus;
}
const SolarPackageSchema = new Schema<ISolarPackage>({
  name: { type: String, enum: ['Essential', 'Smart', 'Premium'], required: true, unique: true },
  tagline: { type: String, required: true },
  description: String,
  pricePerKw: { type: Number, required: true },
  features: [String],
  recommended: { type: Boolean, default: false },
  warranty: String,
  monitoring: String,
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
}, { timestamps: true });

export interface IProductBrand extends Document { name: string; slug: string; logo?: string; }
const ProductBrandSchema = new Schema<IProductBrand>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logo: String,
}, { timestamps: true });

export interface IProduct extends Document {
  name: string;
  category: 'solar-panels' | 'inverters' | 'batteries' | 'ev-chargers' | 'accessories';
  brand: mongoose.Types.ObjectId;
  efficiency?: number;
  warranty?: string;
  technology?: string;
  performance?: string;
  priceCategory?: 'economy' | 'mid-range' | 'premium';
  idealUse?: string;
  imageUrl?: string;
  status: ContentStatus;
}
const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, enum: ['solar-panels', 'inverters', 'batteries', 'ev-chargers', 'accessories'], required: true, index: true },
  brand: { type: Schema.Types.ObjectId, ref: 'ProductBrand' },
  efficiency: Number,
  warranty: String,
  technology: String,
  performance: String,
  priceCategory: { type: String, enum: ['economy', 'mid-range', 'premium'] },
  idealUse: String,
  imageUrl: String,
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
}, { timestamps: true });

export interface ICaseStudy extends Document {
  title: string;
  slug: string;
  category: 'residential' | 'commercial' | 'industrial';
  city: string;
  state?: string;
  systemCapacityKw: number;
  systemType: SystemType;
  beforeBill: number;
  investment: number;
  subsidy?: number;
  monthlySavings: number;
  images: string[];
  customerName?: string;
  testimonial?: string;
  completionDate: Date;
  status: ContentStatus;
}
const CaseStudySchema = new Schema<ICaseStudy>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, enum: ['residential', 'commercial', 'industrial'], required: true, index: true },
  city: { type: String, required: true },
  state: String,
  systemCapacityKw: { type: Number, required: true },
  systemType: { type: String, enum: ['on-grid', 'hybrid', 'off-grid'], default: 'on-grid' },
  beforeBill: Number,
  investment: Number,
  subsidy: Number,
  monthlySavings: Number,
  images: [String],
  customerName: String,
  testimonial: String,
  completionDate: { type: Date, required: true },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
}, { timestamps: true });

export interface ITestimonial extends Document {
  name: string;
  city: string;
  systemCapacityKw?: number;
  quote: string;
  savings?: number;
  avatarUrl?: string;
  rating: number;
  verified: boolean;
  status: ContentStatus;
}
const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  city: { type: String, required: true },
  systemCapacityKw: Number,
  quote: { type: String, required: true },
  savings: Number,
  avatarUrl: String,
  rating: { type: Number, default: 5, min: 1, max: 5 },
  verified: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
}, { timestamps: true });

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: string;
  category?: string;
  coverImage?: string;
  publishedAt?: Date;
  status: ContentStatus;
}
const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  category: String,
  coverImage: String,
  publishedAt: Date,
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, { timestamps: true });

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category?: string;
  order: number;
  status: ContentStatus;
}
const FAQSchema = new Schema<IFAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: String,
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
}, { timestamps: true });

export interface ISubsidyInformation extends Document {
  title: string;
  state?: string;
  capacityKw: number;
  subsidyAmount: number;
  subsidyPct?: number;
  eligibility: string[];
  documents: string[];
  active: boolean;
  effectiveFrom?: Date;
  effectiveUntil?: Date;
}
const SubsidyInformationSchema = new Schema<ISubsidyInformation>({
  title: { type: String, required: true },
  state: String,
  capacityKw: { type: Number, required: true },
  subsidyAmount: { type: Number, required: true },
  subsidyPct: Number,
  eligibility: [String],
  documents: [String],
  active: { type: Boolean, default: true },
  effectiveFrom: Date,
  effectiveUntil: Date,
}, { timestamps: true });

export interface IFinancingOption extends Document {
  name: string;
  provider: string;
  type: 'loan' | 'emi' | 'lease' | 'ppa';
  interestRate?: number;
  tenureMonths?: number;
  minLoanAmount?: number;
  maxLoanAmount?: number;
  downPaymentPct?: number;
  description?: string;
  status: ContentStatus;
}
const FinancingOptionSchema = new Schema<IFinancingOption>({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  type: { type: String, enum: ['loan', 'emi', 'lease', 'ppa'], required: true },
  interestRate: Number,
  tenureMonths: Number,
  minLoanAmount: Number,
  maxLoanAmount: Number,
  downPaymentPct: Number,
  description: String,
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
}, { timestamps: true });

export interface IAMCPlan extends Document {
  name: 'Basic' | 'Smart' | 'Premium';
  pricePerKwPerYear: number;
  features: string[];
  visitsPerYear: number;
  cleaningIncluded: boolean;
  monitoringIncluded: boolean;
  status: ContentStatus;
}
const AMCPlanSchema = new Schema<IAMCPlan>({
  name: { type: String, enum: ['Basic', 'Smart', 'Premium'], required: true, unique: true },
  pricePerKwPerYear: { type: Number, required: true },
  features: [String],
  visitsPerYear: { type: Number, required: true },
  cleaningIncluded: { type: Boolean, default: false },
  monitoringIncluded: { type: Boolean, default: true },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
}, { timestamps: true });

export interface ICity extends Document {
  name: string;
  slug: string;
  state: string;
  solarYieldKwhPerKwPerDay: number;
  avgTariff: number;
  discom: string;
  subsidyApplicable: boolean;
  latitude?: number;
  longitude?: number;
  metaTitle?: string;
  metaDescription?: string;
  content?: string;
}
const CitySchema = new Schema<ICity>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  state: { type: String, required: true },
  solarYieldKwhPerKwPerDay: { type: Number, required: true, min: 2, max: 7 },
  avgTariff: { type: Number, required: true, min: 1 },
  discom: String,
  subsidyApplicable: { type: Boolean, default: true },
  latitude: Number,
  longitude: Number,
  metaTitle: String,
  metaDescription: String,
  content: String,
}, { timestamps: true });

export interface INotification extends Document {
  userId?: mongoose.Types.ObjectId;
  customerId?: mongoose.Types.ObjectId;
  title: string;
  body: string;
  type: 'lead' | 'project' | 'service' | 'report' | 'system';
  read: boolean;
  link?: string;
}
const NotificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  title: { type: String, required: true },
  body: String,
  type: { type: String, enum: ['lead', 'project', 'service', 'report', 'system'], default: 'system' },
  read: { type: Boolean, default: false },
  link: String,
}, { timestamps: true });

export interface IPartner extends Document {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  type: 'contractor' | 'dealer' | 'architect' | 'builder' | 'developer' | 'electrician' | 'other';
  city: string;
  experience?: number;
  status: 'pending' | 'approved' | 'rejected' | 'active';
}
const PartnerSchema = new Schema<IPartner>({
  name: { type: String, required: true },
  company: String,
  phone: { type: String, required: true },
  email: String,
  type: { type: String, enum: ['contractor', 'dealer', 'architect', 'builder', 'developer', 'electrician', 'other'], required: true },
  city: { type: String, required: true },
  experience: Number,
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'active'], default: 'pending' },
}, { timestamps: true });

export interface IContactSubmission extends Document {
  name: string;
  phone: string;
  email?: string;
  city: string;
  monthlyBill?: number;
  segment: 'residential' | 'commercial';
  message?: string;
  status: 'new' | 'contacted' | 'closed';
}
const ContactSubmissionSchema = new Schema<IContactSubmission>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  city: { type: String, required: true },
  monthlyBill: Number,
  segment: { type: String, enum: ['residential', 'commercial'], default: 'residential' },
  message: String,
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });

export interface IJobOpening extends Document {
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  description: string;
  requirements: string[];
  status: ContentStatus;
}
const JobOpeningSchema = new Schema<IJobOpening>({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['full-time', 'part-time', 'internship', 'contract'], default: 'full-time' },
  description: { type: String, required: true },
  requirements: [String],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
}, { timestamps: true });

export interface IJobApplication extends Document {
  jobId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: 'new' | 'reviewed' | 'interview' | 'hired' | 'rejected';
}
const JobApplicationSchema = new Schema<IJobApplication>({
  jobId: { type: Schema.Types.ObjectId, ref: 'JobOpening' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resumeUrl: String,
  coverLetter: String,
  status: { type: String, enum: ['new', 'reviewed', 'interview', 'hired', 'rejected'], default: 'new' },
}, { timestamps: true });

export interface IAdminUser extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  role: 'super-admin' | 'sales' | 'ops' | 'support';
  permissions: string[];
}
const AdminUserSchema = new Schema<IAdminUser>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['super-admin', 'sales', 'ops', 'support'], default: 'sales' },
  permissions: [String],
}, { timestamps: true });

/* ---------- Export models (safe for HMR) ---------- */
export const Lead = (mongoose.models.Lead as Model<ILead>) || mongoose.model<ILead>('Lead', LeadSchema);
export const Customer = (mongoose.models.Customer as Model<ICustomer>) || mongoose.model<ICustomer>('Customer', CustomerSchema);
export const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
export const SolarReport = (mongoose.models.SolarReport as Model<ISolarReport>) || mongoose.model<ISolarReport>('SolarReport', SolarReportSchema);
export const SolarAssessment = (mongoose.models.SolarAssessment as Model<ISolarAssessment>) || mongoose.model<ISolarAssessment>('SolarAssessment', SolarAssessmentSchema);
export const ElectricityBill = (mongoose.models.ElectricityBill as Model<IElectricityBill>) || mongoose.model<IElectricityBill>('ElectricityBill', ElectricityBillSchema);
export const Project = (mongoose.models.Project as Model<IProject>) || mongoose.model<IProject>('Project', ProjectSchema);
export const CustomerSystem = (mongoose.models.CustomerSystem as Model<ICustomerSystem>) || mongoose.model<ICustomerSystem>('CustomerSystem', CustomerSystemSchema);
export const GenerationRecord = (mongoose.models.GenerationRecord as Model<IGenerationRecord>) || mongoose.model<IGenerationRecord>('GenerationRecord', GenerationRecordSchema);
export const ServiceRequest = (mongoose.models.ServiceRequest as Model<IServiceRequest>) || mongoose.model<IServiceRequest>('ServiceRequest', ServiceRequestSchema);
export const SolarPackage = (mongoose.models.SolarPackage as Model<ISolarPackage>) || mongoose.model<ISolarPackage>('SolarPackage', SolarPackageSchema);
export const ProductBrand = (mongoose.models.ProductBrand as Model<IProductBrand>) || mongoose.model<IProductBrand>('ProductBrand', ProductBrandSchema);
export const Product = (mongoose.models.Product as Model<IProduct>) || mongoose.model<IProduct>('Product', ProductSchema);
export const CaseStudy = (mongoose.models.CaseStudy as Model<ICaseStudy>) || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
export const Testimonial = (mongoose.models.Testimonial as Model<ITestimonial>) || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
export const BlogPost = (mongoose.models.BlogPost as Model<IBlogPost>) || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
export const FAQ = (mongoose.models.FAQ as Model<IFAQ>) || mongoose.model<IFAQ>('FAQ', FAQSchema);
export const SubsidyInformation = (mongoose.models.SubsidyInformation as Model<ISubsidyInformation>) || mongoose.model<ISubsidyInformation>('SubsidyInformation', SubsidyInformationSchema);
export const FinancingOption = (mongoose.models.FinancingOption as Model<IFinancingOption>) || mongoose.model<IFinancingOption>('FinancingOption', FinancingOptionSchema);
export const AMCPlan = (mongoose.models.AMCPlan as Model<IAMCPlan>) || mongoose.model<IAMCPlan>('AMCPlan', AMCPlanSchema);
export const City = (mongoose.models.City as Model<ICity>) || mongoose.model<ICity>('City', CitySchema);
export const Notification = (mongoose.models.Notification as Model<INotification>) || mongoose.model<INotification>('Notification', NotificationSchema);
export const Partner = (mongoose.models.Partner as Model<IPartner>) || mongoose.model<IPartner>('Partner', PartnerSchema);
export const ContactSubmission = (mongoose.models.ContactSubmission as Model<IContactSubmission>) || mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);
export const JobOpening = (mongoose.models.JobOpening as Model<IJobOpening>) || mongoose.model<IJobOpening>('JobOpening', JobOpeningSchema);
export const JobApplication = (mongoose.models.JobApplication as Model<IJobApplication>) || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
export const AdminUser = (mongoose.models.AdminUser as Model<IAdminUser>) || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
