import connectDB from '@/server/database/connection';
import {
  City, SolarPackage, ProductBrand, Product, FAQ, FinancingOption,
  SubsidyInformation, AMCPlan, Testimonial, CaseStudy, BlogPost, JobOpening
} from '@/server/database/models';

export async function seedDatabase() {
  await connectDB();

  /* ---------- Cities ---------- */
  const cities = [
    { name: 'Patna', slug: 'patna', state: 'Bihar', solarYieldKwhPerKwPerDay: 4.6, avgTariff: 7.0, discom: 'SBPDCL / NBPDCL', subsidyApplicable: true,
      metaTitle: 'Solar Panels in Patna | Rooftop Solar Installation in Patna - Bhasko',
      metaDescription: 'Calculate your solar savings for Patna. Premium rooftop solar installation in Patna with PM Surya Ghar subsidy. Rated [CUSTOMER COUNT]+ homes.',
      content: 'Patna receives strong solar irradiance year-round, averaging 4.6 kWh per kW per day — ideal for rooftop solar.' },
    { name: 'Bihar', slug: 'bihar', state: 'Bihar', solarYieldKwhPerKwPerDay: 4.5, avgTariff: 7.0, discom: 'Bihar DISCOMs', subsidyApplicable: true,
      metaTitle: 'Solar Panels in Bihar | Rooftop Solar Bihar - Bhasko',
      metaDescription: 'Rooftop solar across Bihar with PM Surya Ghar subsidy. Patna, Muzaffarpur, Gaya, Bhagalpur and beyond.',
      content: 'Bihar is one of India\'s fastest-growing solar markets, with strong subsidy support under PM Surya Ghar Yojana.' },
    { name: 'Delhi', slug: 'delhi', state: 'Delhi', solarYieldKwhPerKwPerDay: 4.7, avgTariff: 8.0, discom: 'BSES / TPDDL', subsidyApplicable: true },
    { name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra', solarYieldKwhPerKwPerDay: 4.8, avgTariff: 8.5, discom: 'MSEDCL / BEST', subsidyApplicable: true },
    { name: 'Bengaluru', slug: 'bengaluru', state: 'Karnataka', solarYieldKwhPerKwPerDay: 5.0, avgTariff: 7.8, discom: 'BESCOM', subsidyApplicable: true },
    { name: 'Lucknow', slug: 'lucknow', state: 'Uttar Pradesh', solarYieldKwhPerKwPerDay: 4.8, avgTariff: 7.0, discom: 'UPPCL', subsidyApplicable: true },
    { name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan', solarYieldKwhPerKwPerDay: 5.4, avgTariff: 7.5, discom: 'JVVNL', subsidyApplicable: true },
    { name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat', solarYieldKwhPerKwPerDay: 5.2, avgTariff: 6.8, discom: 'MGVCL / DGVCL', subsidyApplicable: true },
  ];
  for (const c of cities) {
    await City.findOneAndUpdate({ slug: c.slug }, c, { upsert: true });
  }

  /* ---------- Packages ---------- */
  const packages = [
    {
      name: 'Essential' as const,
      tagline: 'Smart start to solar',
      description: 'Reliable grid-tied solar at an accessible price. Best for budget-conscious homes starting their solar journey.',
      pricePerKw: 52000,
      features: [
        'Tier-1 Poly/Mono PERC Panels',
        'String Inverter with 5-year warranty',
        'Galvanized Iron Mounting Structure',
        'Standard AC/DC Cables & Protection',
        'Basic Net Metering Support',
        '2 years Comprehensive Maintenance',
        'Online Monitoring (Mobile App)',
      ],
      warranty: '5 years system, 10 years panels performance',
      monitoring: 'Basic app monitoring',
    },
    {
      name: 'Smart' as const,
      tagline: 'Most popular — balance of performance and price',
      description: 'Our most recommended package. Premium mono-facial modules with smart monitoring and extended warranty.',
      pricePerKw: 60000,
      recommended: true,
      features: [
        'Tier-1 Mono PERC Half-Cut Panels (>21% efficiency)',
        'Premium String Inverter with 10-year warranty',
        'Aluminium / GI Mounting Structure',
        'DC & AC Protection (MC4, ACDB, DCDB, Earthing)',
        'End-to-end Net Metering & DISCOM Liaison',
        'Lightning Arrester',
        '5 years Comprehensive AMC Included',
        'AI-Powered Monitoring App',
        'Panel Cleaning (2 visits in year 1)',
      ],
      warranty: '10 years inverter, 25 years panels linear performance',
      monitoring: 'Advanced AI monitoring with alerts',
    },
    {
      name: 'Premium' as const,
      tagline: 'Top-of-the-line, future-ready',
      description: 'Bifacial modules, optimizers or microinverters, battery-ready design. Built for maximum generation and longevity.',
      pricePerKw: 72000,
      features: [
        'Bifacial TopCon Panels (>22.5% efficiency)',
        '3-phase Inverter or Microinverters (25-year warranty)',
        'Premium Aluminium Rail Structure',
        'Full DC/AC Balance of System with Optimizers',
        'White-glove Net Metering & Subsidy Processing',
        'Battery-ready Wiring (future expansion)',
        '10 years Comprehensive AMC Included',
        'Dedicated Relationship Manager',
        'Quarterly Panel Cleaning (4 visits/year)',
        'Priority Service (24h response)',
      ],
      warranty: '12–25 years inverter, 30 years panels performance',
      monitoring: 'Premium real-time AI monitoring per-panel',
    },
  ];
  for (const p of packages) await SolarPackage.findOneAndUpdate({ name: p.name }, p, { upsert: true });

  /* ---------- Brands ---------- */
  const brandNames = ['Tata Power Solar', 'Adani Solar', 'Waaree', 'Vikram Solar', 'LONGi', 'Jinko', 'Growatt', 'Sungrow', 'Solis', 'GoodWe', 'Havells', 'Delta'];
  for (const b of brandNames) {
    const slug = b.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await ProductBrand.findOneAndUpdate({ slug }, { name: b, slug }, { upsert: true });
  }

  /* ---------- FAQs ---------- */
  const faqs = [
    { category: 'General', order: 1, question: 'How much does a rooftop solar system cost in 2025?', answer: 'Costs vary by capacity, equipment and package. Typical on-grid residential systems range from approximately ₹52,000–₹72,000 per kW (indicative, pre-subsidy). Bhasko\'s calculator will provide a precise, personalized estimate based on your bill and location.' },
    { category: 'General', order: 2, question: 'How much subsidy can I get under PM Surya Ghar Yojana?', answer: 'PM Surya Ghar Yojana provides a central financial assistance (CFA) for residential rooftop solar: ₹30,000 per kW up to 2 kW, and ₹[SUBSIDY AMOUNT] above 2 kW up to 3 kW (capped at ₹78,000 for 3 kW and above for typical installations). Exact subsidy depends on your DISCOM and system size.' },
    { category: 'Technical', order: 3, question: 'How much roof area is required for solar?', answer: 'As a rule of thumb, 1 kW requires about 85–100 sq ft of shade-free roof area. A 3 kW system needs roughly 300 sq ft, and a 5 kW system around 500 sq ft. Bhasko\'s free Roof Assessment gives you a digital estimate in minutes.' },
    { category: 'Financial', order: 4, question: 'What is the typical payback period for rooftop solar in India?', answer: 'Most on-grid residential systems pay back in 3.5 to 5 years through electricity bill savings plus applicable subsidies, and continue generating savings for 25+ years.' },
    { category: 'Process', order: 5, question: 'How long does installation take?', answer: 'After site survey and design, physical installation typically takes 2–5 days depending on system size. DISCOM approvals and net metering can take 2–6 weeks, which Bhasko handles end-to-end for you.' },
    { category: 'Support', order: 6, question: 'What happens after installation if something breaks?', answer: 'All Bhasko systems include warranty and an optional AMC plan. You can raise service tickets 24/7 through the My Solar customer portal. Premium customers get same-day/next-day response.' },
  ];
  for (const f of faqs) await FAQ.findOneAndUpdate({ question: f.question }, f, { upsert: true });

  /* ---------- Financing ---------- */
  const fin = [
    { name: 'Solar Easy EMI', provider: 'Partner Banks & NBFCs', type: 'emi' as const, interestRate: 9.5, tenureMonths: 84, minLoanAmount: 50000, maxLoanAmount: 2000000, downPaymentPct: 20, description: 'EMI starting at ~₹1,500 per kW. Most customers find the EMI is lower than their current monthly bill savings.' },
    { name: 'Zero-down Solar Loan', provider: 'Select Partner Banks', type: 'loan' as const, interestRate: 10.5, tenureMonths: 120, minLoanAmount: 100000, maxLoanAmount: 5000000, downPaymentPct: 0, description: 'Finance up to 100% of your system cost with no upfront payment.' },
    { name: 'Lease / PPA', provider: 'Bhasko Capital Partners', type: 'ppa' as const, description: 'Pay per unit generated at a rate lower than your grid tariff. Zero upfront investment. Available for 5 kW+ systems.' },
  ];
  for (const f of fin) await FinancingOption.findOneAndUpdate({ name: f.name }, f, { upsert: true });

  /* ---------- Subsidy info ---------- */
  const subs = [
    { title: 'PM Surya Ghar — up to 2 kW', capacityKw: 2, subsidyAmount: 60000, eligibility: ['Residential households', 'Rooftop on-grid/hybrid systems', 'Installed by empaneled vendors'], documents: ['Aadhaar', 'Latest Electricity Bill', 'Property Tax Receipt / Ownership Proof', 'Bank Account Details', 'Passport-size Photo'], active: true },
    { title: 'PM Surya Ghar — 3 kW and above', capacityKw: 3, subsidyAmount: 78000, eligibility: ['Residential households', '3 kW to 10 kW systems', 'Installed by empaneled vendors'], documents: ['Aadhaar', 'Latest Electricity Bill', 'Property Tax Receipt / Ownership Proof', 'Bank Account Details', 'Passport-size Photo'], active: true },
  ];
  for (const s of subs) await SubsidyInformation.findOneAndUpdate({ title: s.title }, s, { upsert: true });

  /* ---------- AMC ---------- */
  const amcs = [
    { name: 'Basic' as const, pricePerKwPerYear: 600, visitsPerYear: 1, cleaningIncluded: false, monitoringIncluded: true, features: ['Annual maintenance visit', 'Remote monitoring', 'Fault diagnosis', 'Discounted spare parts'] },
    { name: 'Smart' as const, pricePerKwPerYear: 1200, visitsPerYear: 2, cleaningIncluded: true, monitoringIncluded: true, features: ['Two maintenance visits', 'Two panel cleaning visits', 'Priority remote support', 'Free firmware updates', 'Inverter health checks'] },
    { name: 'Premium' as const, pricePerKwPerYear: 2000, visitsPerYear: 4, cleaningIncluded: true, monitoringIncluded: true, features: ['Quarterly visits', 'Quarterly cleaning', '24-hour response SLA', 'All spare parts included', 'Dedicated RM', 'Performance guarantee review'] },
  ];
  for (const a of amcs) await AMCPlan.findOneAndUpdate({ name: a.name }, a, { upsert: true });

  /* ---------- Testimonials (placeholders — never fabricate real customer details) ---------- */
  // Intentionally left empty so real testimonials can be added via admin.

  /* ---------- Case studies placeholder ---------- */
  // Intentionally left empty so real projects can be added via admin.

  /* ---------- Seed blog posts ---------- */
  const blogs = [
    { title: 'How much roof area is required for a 5 kW solar system in India?', slug: 'roof-area-for-5kw-solar', excerpt: 'A practical guide to roof area, orientation, shading and setbacks for 5 kW rooftop solar installations.', author: 'Bhasko Engineering', category: 'Guides', publishedAt: new Date(), status: 'published' as const, content: 'A 5 kW rooftop solar system typically requires 450–550 sq ft of shade-free roof area depending on panel wattage and mounting structure. RCC flat roofs generally need ~100 sq ft per kW, while metal sheds can get away with slightly less at ~85 sq ft per kW due to tilt optimization.' },
    { title: 'PM Surya Ghar Yojana subsidy: a homeowner\'s guide', slug: 'pm-surya-ghar-subsidy-guide', excerpt: 'Eligibility, subsidy slabs, documents and the step-by-step application process for PM Surya Ghar.', author: 'Bhasko Policy Desk', category: 'Policy', publishedAt: new Date(), status: 'published' as const, content: 'PM Surya Ghar Yojana is the Government of India\'s flagship scheme for residential rooftop solar. It provides a central financial assistance directly to the homeowner\'s bank account after installation and inspection.' },
    { title: '3 kW vs 5 kW solar: which size is right for your home?', slug: '3kw-vs-5kw-solar', excerpt: 'Compare monthly bill coverage, cost, subsidy, roof area and payback for 3 kW and 5 kW rooftop solar systems.', author: 'Bhasko', category: 'Guides', publishedAt: new Date(), status: 'published' as const, content: 'The right size depends on your monthly consumption, future needs (EV, AC, battery), and roof area. As a starting point, a 3 kW system suits homes with monthly bills around ₹2,500–₹3,500, while 5 kW works well for ₹4,000–₹6,000 bills.' },
    { title: 'Is rooftop solar worth it in Patna?', slug: 'is-solar-worth-it-patna', excerpt: 'Solar irradiance, tariffs, subsidies, and payback economics for Patna and Bihar homeowners.', author: 'Bhasko Bihar Team', category: 'Local', publishedAt: new Date(), status: 'published' as const, content: 'Patna receives ~4.6 kWh/m²/day of solar irradiance annually, making it an excellent location for rooftop solar. Combined with Bihar\'s residential tariffs and PM Surya Ghar subsidy, most Patna homes see payback periods of 4–5 years.' },
  ];
  for (const b of blogs) await BlogPost.findOneAndUpdate({ slug: b.slug }, b, { upsert: true });

  /* ---------- Jobs ---------- */
  const jobs = [
    { title: 'Senior Solar Design Engineer', department: 'Engineering', location: 'Patna, Bihar', type: 'full-time' as const, description: 'Design and engineer residential and commercial rooftop solar systems, perform yield analysis, and coordinate with the installation team.', requirements: ['3+ years in solar design', 'Proficiency in PVsyst / Helioscope', 'Knowledge of DISCOM regulations'] },
    { title: 'Solar Sales Consultant', department: 'Sales', location: 'Patna / Muzaffarpur', type: 'full-time' as const, description: 'Consult with homeowners and businesses on solar solutions, walk customers through the Bhasko calculator and report, and manage leads end-to-end.', requirements: ['1+ years in field sales', 'Excellent communication in Hindi & English', 'Interest in clean energy'] },
    { title: 'Installation Technician', department: 'Operations', location: 'Bihar (multiple)', type: 'full-time' as const, description: 'Install rooftop solar systems including panels, inverters, structures and electrical BoS to Bhasko quality standards.', requirements: ['ITI / Diploma in Electrical', 'Willingness to travel', 'Safety-first mindset'] },
  ];
  for (const j of jobs) await JobOpening.findOneAndUpdate({ title: j.title, location: j.location }, j, { upsert: true });

  return { ok: true };
}
