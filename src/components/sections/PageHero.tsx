'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface Props {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  accentPhrase?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, subtitle, accentPhrase, primaryCta, secondaryCta, children }: Props) {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden gradient-sun pt-8 md:pt-12 pb-14 md:pb-20">
      <svg className="absolute -bottom-20 -left-20 w-[400px] opacity-20 pointer-events-none" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="180" fill="#A8D66D" opacity="0.3" />
      </svg>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-[rgba(24,58,42,0.08)] rounded-full px-4 py-1.5 mb-6"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#477A45]">{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#183A2A] leading-[1.05] tracking-tight max-w-4xl"
        >
          {title}
          {accentPhrase && <span className="script-accent text-[#F4B942] text-4xl md:text-6xl ml-3 align-middle block sm:inline">{accentPhrase}</span>}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg text-[#183029]/80 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex flex-col sm:flex-row items-start gap-3"
          >
            {primaryCta && (
              <Link href={primaryCta.href} className="btn-primary inline-flex items-center gap-2 group">
                {primaryCta.label} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-secondary inline-flex items-center gap-2">
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
