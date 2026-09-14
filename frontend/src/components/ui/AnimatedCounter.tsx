'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Props {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  format?: 'number' | 'currency' | 'percent';
}

export default function AnimatedCounter({ value, duration = 1500, prefix = '', suffix = '', decimals = 0, className, format = 'number' }: Props) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    if (reduce) { setDisplay(value); return; }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(value * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, duration, reduce]);

  let formatted = '';
  if (format === 'currency') {
    formatted = `${prefix}${Math.round(display).toLocaleString('en-IN')}${suffix}`;
  } else if (format === 'percent') {
    formatted = `${display.toFixed(decimals)}${suffix || '%'}`;
  } else {
    const fixed = display.toFixed(decimals);
    formatted = `${prefix}${Number(fixed).toLocaleString('en-IN')}${suffix}`;
  }

  return <span ref={ref} className={className}>{formatted}</span>;
}
