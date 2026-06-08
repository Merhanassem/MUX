'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'outline' | 'outline-light' | 'ghost';
}

export default function MagneticButton({
  children,
  className,
  strength = 0.4,
  onClick,
  href,
  variant = 'default',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * strength;
    const distY = (e.clientY - centerY) * strength;
    setPosition({ x: distX, y: distY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    default: 'bg-primary-text text-background px-8 py-4 rounded-full font-body font-medium',
    outline: 'border border-primary-text text-primary-text px-8 py-4 rounded-full font-body font-medium',
    'outline-light': 'border border-white/70 text-white/90 px-8 py-4 rounded-full font-body font-medium backdrop-blur-sm',
    ghost: 'text-primary-text px-4 py-2 font-body font-medium',
  };

  const content = (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center cursor-none select-none transition-colors duration-300',
        'hover:bg-pink-brand hover:text-white hover:border-pink-brand',
        variants[variant],
        className
      )}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href} className="cursor-none">{content}</a>;
  }
  return content;
}
