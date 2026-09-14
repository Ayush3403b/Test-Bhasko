'use client';

import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  type?: 'button' | 'submit';
}

export default function MagneticButton({ children, className, onClick, strength = 0.3, as = 'button', href, type = 'button' }: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * strength, y: relY * strength });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const style = { transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)' };

  if (as === 'a') {
    return (
      <a
        ref={ref as any}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={style}
        className={cn('relative inline-flex items-center justify-center', className)}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as any}
      type={type}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      onClick={onClick}
      className={cn('relative inline-flex items-center justify-center', className)}
    >
      {children}
    </button>
  );
}
