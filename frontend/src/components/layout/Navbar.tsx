'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle, ChevronDown, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Solar for Home', href: '/solar-home', children: [
    { label: '1 kW Solar', href: '/solar/1kw' },
    { label: '2 kW Solar', href: '/solar/2kw' },
    { label: '3 kW Solar', href: '/solar/3kw' },
    { label: '5 kW Solar', href: '/solar/5kw' },
    { label: '5 kW+ Solar', href: '/solar/5kw-plus' },
  ]},
  { label: 'Solar for Business', href: '/solar-business' },
  { label: 'Solutions', href: '/solar-solutions', children: [
    { label: 'On-Grid Solar', href: '/solar-solutions/on-grid' },
    { label: 'Hybrid Solar', href: '/solar-solutions/hybrid' },
    { label: 'Off-Grid Solar', href: '/solar-solutions/off-grid' },
    { label: 'Solar + Battery', href: '/solar-solutions/battery' },
    { label: 'Solar + EV', href: '/solar-solutions/ev' },
    { label: 'Apartment / Society', href: '/solar-solutions/apartment' },
  ]},
  { label: 'Solar Intelligence', href: '/solar-intelligence', children: [
    { label: 'Savings Calculator', href: '/solar-intelligence/calculator' },
    { label: 'AI Solar Advisor', href: '/solar-intelligence/ai-advisor' },
    { label: 'Bill Analyzer', href: '/solar-intelligence/bill-analyzer' },
    { label: 'Roof Assessment', href: '/solar-intelligence/roof-assessment' },
    { label: 'Instant Solar Report', href: '/solar-intelligence/report' },
  ]},
  { label: 'Packages', href: '/solar-packages' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resources', href: '/resources', children: [
    { label: 'Solar Guides', href: '/resources' },
    { label: 'Solar Blog', href: '/resources/blog' },
    { label: 'FAQs', href: '/resources#faqs' },
    { label: 'Solar News', href: '/resources/news' },
  ]},
  { label: 'Company', href: '/about', children: [
    { label: 'About Bhasko', href: '/about' },
    { label: 'PM Surya Ghar', href: '/pm-surya-ghar' },
    { label: 'Financing', href: '/financing' },
    { label: 'Partner With Us', href: '/partner-with-us' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ]},
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [hoverGroup, setHoverGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'glass-nav border-b border-[rgba(24,58,42,0.08)] py-3' : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex items-center justify-between gap-2 xl:gap-4 flex-nowrap">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-9 h-9 shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#F4B942]/20"></div>
              <svg viewBox="0 0 40 40" className="w-9 h-9 relative">
                <circle cx="20" cy="20" r="8" fill="#F4B942" />
                <g stroke="#183A2A" strokeWidth="1.8" strokeLinecap="round" className="animate-sun" style={{ transformOrigin: '20px 20px' }}>
                  {Array.from({ length: 8 }).map((_, i) => {
                    const a = (i * Math.PI) / 4;
                    const x1 = Math.round((20 + Math.cos(a) * 12) * 100) / 100;
                    const y1 = Math.round((20 + Math.sin(a) * 12) * 100) / 100;
                    const x2 = Math.round((20 + Math.cos(a) * 16) * 100) / 100;
                    const y2 = Math.round((20 + Math.sin(a) * 16) * 100) / 100;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                  })}
                </g>
                <circle cx="20" cy="20" r="9" fill="none" stroke="#183A2A" strokeWidth="2" />
                <path d="M 20 11 A 9 9 0 0 1 20 29" fill="#477A45" opacity="0.35" />
              </svg>
            </div>
            <div className="flex flex-col leading-none shrink-0">
              <span className="text-xl font-bold tracking-[0.18em] text-[#183A2A] whitespace-nowrap">BHASKO</span>
              <span className="text-[9px] tracking-[0.3em] text-[#477A45] font-medium whitespace-nowrap">SOLAR · CALCULATED</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-2 flex-nowrap shrink-0">
            {NAV_ITEMS.map(item => (
              <div
                key={item.href}
                className="relative shrink-0"
                onMouseEnter={() => item.children && setHoverGroup(item.href)}
                onMouseLeave={() => setHoverGroup(null)}
              >
                <Link
                  href={item.href}
                  className="px-2 xl:px-3 py-2 text-xs xl:text-[13px] 2xl:text-sm font-medium text-[#183A2A] hover:text-[#477A45] transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className="shrink-0" />}
                </Link>
                {item.children && hoverGroup === item.href && (
                  <div className="absolute top-full left-0 pt-2 min-w-[220px]">
                    <div className="bg-white rounded-xl shadow-xl border border-[rgba(24,58,42,0.08)] p-2">
                      {item.children.map(c => (
                        <Link key={c.href} href={c.href} className="block px-3 py-2 text-sm text-[#183029] hover:bg-[#EAF3E1] rounded-lg transition-colors whitespace-nowrap">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 xl:gap-3 shrink-0 flex-nowrap">
            <Link
              href="/solar-intelligence/calculator"
              className="hidden md:inline-flex items-center gap-2 bg-[#477A45] text-white px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-full text-xs xl:text-sm font-semibold hover:bg-[#3d6a3c] transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <Calculator size={16} className="shrink-0" />
              CALCULATE SAVINGS
            </Link>
            <a
              href="https://wa.me/919999999999?text=Hi%20Bhasko%2C%20I%27d%20like%20to%20know%20more%20about%20solar."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform shrink-0"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <button onClick={() => setMobileOpen(true)} className="lg:hidden w-10 h-10 inline-flex items-center justify-center text-[#183A2A] shrink-0" aria-label="Menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#183A2A]/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-[#FFFDF5] overflow-y-auto"
            >
              <div className="p-5 flex items-center justify-between border-b border-[rgba(24,58,42,0.08)]">
                <span className="font-bold tracking-[0.2em] text-[#183A2A]">MENU</span>
                <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center"><X size={22} /></button>
              </div>
              <div className="p-4 flex flex-col">
                {NAV_ITEMS.map(item => (
                  <div key={item.href} className="border-b border-[rgba(24,58,42,0.06)]">
                    {item.children ? (
                      <>
                        <button
                          className="w-full flex items-center justify-between py-3 text-left font-medium text-[#183A2A]"
                          onClick={() => setOpenMobileGroup(openMobileGroup === item.href ? null : item.href)}
                        >
                          {item.label}
                          <ChevronDown size={18} className={cn('transition-transform', openMobileGroup === item.href && 'rotate-180')} />
                        </button>
                        {openMobileGroup === item.href && (
                          <div className="pb-3 pl-3">
                            <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-[#477A45] font-medium">All {item.label}</Link>
                            {item.children.map(c => (
                              <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-[#183029]">{c.label}</Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-3 font-medium text-[#183A2A]">{item.label}</Link>
                    )}
                  </div>
                ))}
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-3 font-medium text-[#183A2A] border-b border-[rgba(24,58,42,0.06)]">Contact</Link>
                <Link href="/my-solar" onClick={() => setMobileOpen(false)} className="block py-3 font-medium text-[#183A2A]">My Solar</Link>

                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/solar-intelligence/calculator" onClick={() => setMobileOpen(false)} className="btn-primary text-center">
                    CALCULATE SAVINGS
                  </Link>
                  <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white font-medium">
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 glass-nav border-t border-[rgba(24,58,42,0.08)] p-3 flex gap-2">
        <Link href="/solar-intelligence/calculator" className="flex-1 bg-[#477A45] text-white rounded-full py-3 text-center font-semibold text-sm">
          CALCULATE SAVINGS
        </Link>
        <a href="https://wa.me/919999999999?text=Hi%20Bhasko%2C%20I%27d%20like%20to%20know%20more%20about%20solar." target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
          <MessageCircle size={20} />
        </a>
      </div>
    </>
  );
}
