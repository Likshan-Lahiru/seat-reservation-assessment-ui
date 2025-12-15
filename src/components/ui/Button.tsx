import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-2 focus:ring-offset-luxury-black disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider';
  const variants = {
    primary: 'bg-luxury-gold text-luxury-black hover:bg-white hover:shadow-glow-gold font-bold',
    secondary: 'bg-luxury-soft text-white hover:bg-luxury-gold hover:text-luxury-black border border-white/10',
    outline: 'border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black',
    ghost: 'text-gray-400 hover:text-luxury-gold hover:bg-white/5'
  };
  const sizes = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base'
  };
  return <motion.button whileHover={{
    y: -2
  }} whileTap={{
    scale: 0.98
  }} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </motion.button>;
}