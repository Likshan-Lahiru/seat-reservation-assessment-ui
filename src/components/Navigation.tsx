import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, User, ShoppingBag, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
export function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Movies',
    path: '/movies'
  }, {
    name: 'Theaters',
    path: '/theaters'
  }, {
    name: 'Experiences',
    path: '/experiences'
  }];
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-luxury-black/90 backdrop-blur-md border-b border-luxury-gold/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{
          rotate: 180
        }} transition={{
          duration: 0.5
        }}>
            <Film className="w-8 h-8 text-luxury-gold" />
          </motion.div>
          <span className="text-2xl font-serif font-bold tracking-widest text-white group-hover:text-gold-gradient transition-all">
            BOOKMY<span className="text-luxury-gold">TICKET</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <Link key={link.name} to={link.path} className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-luxury-gold ${location.pathname === link.path ? 'text-luxury-gold' : 'text-gray-400'}`}>
              {link.name}
            </Link>)}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-luxury-gold transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button className="relative text-gray-400 hover:text-luxury-gold transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-luxury-gold text-luxury-black text-[10px] font-bold flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>;
}