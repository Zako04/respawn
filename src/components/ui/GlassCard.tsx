import { HTMLAttributes } from 'react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function GlassCard({ className, children, hover = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { translateY: -4, backgroundColor: 'rgba(255, 255, 255, 0.08)' } : {}}
      className={cn(
        'glass rounded-2xl overflow-hidden',
        hover && 'transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
