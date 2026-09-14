import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#183A2A] text-[#EAF3E1] pt-20 pb-28 lg:pb-12 mt-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <circle cx="20" cy="20" r="8" fill="#F4B942" />
                <g stroke="#EAF3E1" strokeWidth="1.8" strokeLinecap="round">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const a = (i * Math.PI) / 4;
                    const x1 = Math.round((20 + Math.cos(a) * 12) * 100) / 100;
                    const y1 = Math.round((20 + Math.sin(a) * 12) * 100) / 100;
                    const x2 = Math.round((20 + Math.cos(a) * 16) * 100) / 100;
                    const y2 = Math.round((20 + Math.sin(a) * 16) * 100) / 100;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                  })}
                </g>
              </svg>
              <div>
                <div className="text-xl font-bold tracking-[0.18em]">BHASKO</div>
                <div className="text-[10px] tracking-[0.3em] text-[#A8D66D]">SOLAR · CALCULATED</div>
              </div>
            </div>
            <p className="text-sm text-[#EAF3E1]/70 mb-4 max-w-xs leading-relaxed">
              Premium rooftop solar for homes and businesses across India. Calculated, engineered and delivered end-to-end.
            </p>
            <div className="flex gap-3 mb-6">
              {[1,2,3,4].map((i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-[#EAF3E1]/20 flex items-center justify-center hover:bg-[#A8D66D]/20 hover:border-[#A8D66D] transition-colors">
                  <Globe size={16} />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-[#EAF3E1]/80"><Phone size={16} className="mt-0.5 flex-shrink-0" /> [WHATSAPP] / [PHONE]</div>
              <div className="flex items-start gap-2 text-[#EAF3E1]/80"><Mail size={16} className="mt-0.5 flex-shrink-0" /> [EMAIL]</div>
              <div className="flex items-start gap-2 text-[#EAF3E1]/80"><MapPin size={16} className="mt-0.5 flex-shrink-0" /> [OFFICE ADDRESS]</div>
            </div>
          </div>

          <FooterCol title="Solar For">
            <FooterLink href="/solar-home">Solar for Home</FooterLink>
            <FooterLink href="/solar-business">Solar for Business</FooterLink>
            <FooterLink href="/solar-solutions/apartment">Apartment Society</FooterLink>
            <FooterLink href="/solar/1kw">1 kW Solar</FooterLink>
            <FooterLink href="/solar/3kw">3 kW Solar</FooterLink>
            <FooterLink href="/solar/5kw">5 kW Solar</FooterLink>
          </FooterCol>

          <FooterCol title="Solutions">
            <FooterLink href="/solar-solutions/on-grid">On-Grid Solar</FooterLink>
            <FooterLink href="/solar-solutions/hybrid">Hybrid Solar</FooterLink>
            <FooterLink href="/solar-solutions/off-grid">Off-Grid Solar</FooterLink>
            <FooterLink href="/solar-solutions/battery">Solar + Battery</FooterLink>
            <FooterLink href="/solar-solutions/ev">Solar + EV Charging</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink href="/about">About Bhasko</FooterLink>
            <FooterLink href="/projects">Projects</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/partner-with-us">Partner With Us</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/my-solar">Customer Login</FooterLink>
          </FooterCol>

          <FooterCol title="Resources">
            <FooterLink href="/solar-intelligence/calculator">Savings Calculator</FooterLink>
            <FooterLink href="/pm-surya-ghar">PM Surya Ghar</FooterLink>
            <FooterLink href="/financing">Solar Financing</FooterLink>
            <FooterLink href="/resources/blog">Blog</FooterLink>
            <FooterLink href="/resources#faqs">FAQs</FooterLink>
            <FooterLink href="/solar/patna">Solar in Patna</FooterLink>
          </FooterCol>
        </div>

        <div className="border-t border-[#EAF3E1]/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs text-[#EAF3E1]/60">© {new Date().getFullYear()} Bhasko Solar. All rights reserved. We don't sell you a solar system — we calculate the one that makes sense for you.</div>
          <div className="flex gap-4 text-xs text-[#EAF3E1]/60">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm font-semibold mb-4 text-white tracking-wide">{title}</div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-[#EAF3E1]/70 hover:text-[#A8D66D] transition-colors inline-flex items-center gap-1 group">
      <span>{children}</span>
      <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </Link>
  );
}
