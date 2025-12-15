import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ChevronLeft, Info, Armchair, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { movieAPI, Theatre } from '../services/movieAPI';
export function TheatersPage() {
  const {
    id
  } = useParams();
  const [theaters, setTheaters] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchTheaters() {
      try {
        setLoading(true);
        const data = await movieAPI.getTheatres();
        setTheaters(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load theaters');
        console.error('Error fetching theaters:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTheaters();
  }, []);
  return <div className="min-h-screen bg-luxury-black pt-24 pb-20 px-6">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div>
            <span className="text-luxury-gold text-xs font-bold tracking-widest uppercase block mb-1">
              Step 1 of 4
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Select Theater
            </h1>
          </div>
        </div>

        {loading && <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
          </div>}

        {error && <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>}

        {/* Theaters List */}
        {!loading && !error && <div className="space-y-6">
            {theaters.map((theater, index) => <motion.div key={theater.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} className="group relative overflow-hidden rounded-sm bg-luxury-soft border border-white/5 hover:border-luxury-gold/30 transition-all duration-500">
                <div className="grid md:grid-cols-[240px_1fr] gap-6">
                  {/* Image */}
                  <div className="relative h-48 md:h-auto overflow-hidden">
                    <img src={theater.image_url} alt={theater.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:pl-0 flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-luxury-gold transition-colors">
                          {theater.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-luxury-gold" />
                            <span>{theater.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-sm border border-white/5">
                        <Star className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
                        <span className="text-white font-bold">
                          {theater.rating}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['IMAX', 'Dolby Atmos', '4K Laser'].map(feature => <span key={feature} className="px-2 py-1 text-[10px] uppercase tracking-wider font-medium text-gray-300 bg-white/5 border border-white/5 rounded-sm">
                          {feature}
                        </span>)}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Info className="w-4 h-4" />
                        <span>Multiple showtimes available</span>
                      </div>

                      <Link to={`/movie/${id}`}>
                        <Button className="gap-2 group-hover:bg-luxury-gold group-hover:text-luxury-black">
                          Select Theater
                          <Armchair className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>)}
          </div>}
      </div>
    </div>;
}