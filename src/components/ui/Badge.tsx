import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'cyan' | 'green' | 'white';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantClasses = {
  blue: 'bg-blue-500/10 border-blue-500/25 text-blue-400',
  purple: 'bg-purple-500/10 border-purple-500/25 text-purple-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400',
  green: 'bg-green-500/10 border-green-500/25 text-green-400',
  white: 'bg-white/5 border-white/10 text-white/60',
};

const dotClasses = {
  blue: 'bg-blue-400',
  purple: 'bg-purple-400',
  cyan: 'bg-cyan-400',
  green: 'bg-green-400',
  white: 'bg-white/60',
};

export default function Badge({
  children,
  variant = 'blue',
  size = 'md',
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono rounded-full border tracking-widest uppercase',
        size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
        variantClasses[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotClasses[variant])} />
      )}
      {children}
    </span>
  );
}
