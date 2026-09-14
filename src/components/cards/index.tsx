'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

export function SoftCard({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.25 } }}
      className={cn('bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(24,58,42,0.06)] border border-[rgba(24,58,42,0.06)] transition-shadow hover:shadow-[0_16px_48px_rgba(24,58,42,0.1)]', className)}
    >
      {children}
    </motion.div>
  );
}

export function DataCard({
  label, value, suffix, prefix, micro, icon: Icon, accent = 'green', className,
}: {
  label: string; value: string | number; suffix?: string; prefix?: string; micro?: ReactNode;
  icon?: LucideIcon; accent?: 'green' | 'solar' | 'dark' | 'fresh'; className?: string;
}) {
  const accentBg = {
    green: 'bg-[#477A45]/10 text-[#477A45]',
    solar: 'bg-[#F4B942]/15 text-[#B8860B]',
    dark: 'bg-[#183A2A]/10 text-[#183A2A]',
    fresh: 'bg-[#A8D66D]/20 text-[#477A45]',
  }[accent];
  return (
    <div className={cn('bg-gradient-to-br from-[#FFFDF5] to-[#F4F8EE] rounded-2xl p-5 border border-[rgba(24,58,42,0.08)]', className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-xs font-medium text-[#66736B] uppercase tracking-wider">{label}</div>
        {Icon && <div className={cn('w-9 h-9 rounded-full flex items-center justify-center', accentBg)}><Icon size={16} /></div>}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-[#183A2A]">
        {prefix && <span className="text-[#66736B] text-xl mr-0.5">{prefix}</span>}
        {value}
        {suffix && <span className="text-[#66736B] text-lg ml-1 font-medium">{suffix}</span>}
      </div>
      {micro && <div className="mt-2 text-xs text-[#66736B]">{micro}</div>}
    </div>
  );
}

export function FeatureCard({ icon: Icon, title, description, delay = 0, accent = '#477A45', href }: { icon: LucideIcon; title: string; description: string; delay?: number; accent?: string; href?: string }) {
  const Wrapper: any = href ? Link : 'div';
  return (
    <SoftCard delay={delay} className="group relative overflow-hidden">
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${accent}15, transparent 70%)` }} />
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:-rotate-6" style={{ backgroundColor: `${accent}15`, color: accent }}>
        <Icon size={22} />
      </div>
      <h3 className="text-lg font-semibold text-[#183A2A] mb-2">{title}</h3>
      <p className="text-sm text-[#66736B] leading-relaxed">{description}</p>
      {href && (
        <div className="mt-4 text-sm font-medium text-[#477A45] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          Explore <span>→</span>
        </div>
      )}
    </SoftCard>
  );
}

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'accent' | 'solar' | 'fresh' | 'outline' }) {
  const styles = {
    default: 'bg-[#477A45]/10 text-[#477A45]',
    accent: 'bg-[#183A2A] text-white',
    solar: 'bg-[#F4B942]/20 text-[#B8860B]',
    fresh: 'bg-[#A8D66D]/30 text-[#477A45]',
    outline: 'border border-[#183A2A]/20 text-[#183A2A]',
  }[variant];
  return <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase', styles)}>{children}</span>;
}
