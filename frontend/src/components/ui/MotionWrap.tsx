'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface Props extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
}

export function FadeUp({ children, delay = 0, y = 24, once = true, ...props }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div {...(props as any)}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, ...props }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div {...(props as any)}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, stagger = 0.1, delay = 0, className }: { children: ReactNode; stagger?: number; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {reduce ? <div className={className}>{children}</div> : children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
    >
      {children}
    </motion.div>
  );
}
