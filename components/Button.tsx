import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

const Button = ({
  href,
  variant = 'primary',
  children,
  className = '',
  showArrow = false
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-8 py-3.5 font-medium text-[15px] transition-all duration-300 relative overflow-hidden group';

  const variants = {
    primary: 'text-dark',
    secondary: 'text-dark border border-gold/30',
    outline: 'text-dark border-2 border-gold'
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gold transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"></span>
      )}
      {variant === 'secondary' && (
        <span className="absolute inset-0 bg-gold/10 transition-transform duration-300 transform translate-x-full group-hover:translate-x-0"></span>
      )}
      {variant === 'outline' && (
        <span className="absolute inset-0 bg-gold transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </Link>
  );
};

export default Button;
