import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  genre: string;
  rating: number;
  duration: string;
  showtimes: number;
  index: number;
}
export function MovieCard({
  id,
  title,
  image,
  genre,
  rating,
  duration,
  showtimes,
  index
}: MovieCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 50
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: index * 0.1
  }}>
      <Link to={`/movie/${id}/select-theater`} className="group block relative w-full aspect-[2.39/3.5] overflow-hidden rounded-sm bg-luxury-soft shadow-2xl">
        {/* Image */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="space-y-2">
            <span className="inline-block px-2 py-1 text-[10px] font-bold tracking-widest uppercase text-luxury-gold border border-luxury-gold/30 bg-luxury-black/50 backdrop-blur-sm rounded-sm">
              {genre}
            </span>

            <h3 className="text-2xl font-serif font-bold text-white leading-tight group-hover:text-luxury-gold transition-colors">
              {title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                <span>{rating}/10</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-luxury-gold" />
                <span>{duration}</span>
              </div>
            </div>

            <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              <button className="w-full flex items-center justify-center gap-2 bg-luxury-gold text-luxury-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                <Ticket className="w-4 h-4" />
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Hover Border */}
        <div className="absolute inset-0 border-2 border-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Link>
    </motion.div>;
}