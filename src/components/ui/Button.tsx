import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-primary text-black hover:bg-brand-primary/90 glow',
      secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
      ghost: 'bg-transparent text-white hover:bg-white/5',
      outline: 'bg-transparent border border-brand-primary/50 text-brand-primary hover:bg-brand-primary/10',
      danger: 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3 text-base font-medium',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
