import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MovieCard } from '../components/MovieCard';
import { movieAPI, Movie } from '../services/movieAPI';

const FEATURED_MOVIE = {
    id: 'Avatar',
    title: 'Avatar: Fire and Ash',
    description:
        'In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and Neytiri face a new threat on Pandora',
    image: '/avatar-fires-and-ash.jpg',
    rating: '9.2',
    duration: '3h 00m',
    genre: 'Science Fiction, Adventure, Fantasy',
};

export function HomePage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const TRAILER_URL = 'https://www.youtube.com/watch?v=Ma1x7ikpid8';

    function getYouTubeEmbedUrl(url: string) {
        try {
            const u = new URL(url);
            const id =
                u.searchParams.get('v') ||
                (u.hostname.includes('youtu.be') ? u.pathname.slice(1) : null);

            return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : '';
        } catch {
            return '';
        }
    }

    const trailerEmbedUrl = getYouTubeEmbedUrl(TRAILER_URL);

    useEffect(() => {
        async function fetchMovies() {
            try {
                setLoading(true);
                const data = await movieAPI.getMovies();
                setMovies(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load movies');
                console.error('Error fetching movies:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);

    return (
        <div className="min-h-screen bg-luxury-black pb-20">
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={FEATURED_MOVIE.image}
                        alt={FEATURED_MOVIE.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent" />
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                        }}
                        className="max-w-2xl space-y-6"
                    >
            <span className="text-luxury-gold font-bold tracking-[0.2em] uppercase text-sm">
              Now Showing
            </span>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white leading-none">
                            {FEATURED_MOVIE.title}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-300 text-sm">
              <span className="px-2 py-1 border border-white/20 rounded-sm">
                IMAX
              </span>
                            <span>{FEATURED_MOVIE.genre}</span>
                            <span>•</span>
                            <span>{FEATURED_MOVIE.duration}</span>
                            <span>•</span>
                            <span className="text-luxury-gold">★ {FEATURED_MOVIE.rating}</span>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                            {FEATURED_MOVIE.description}
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            {/* ✅ Watch Trailer opens modal (changed) */}
                            <Button
                                size="lg"
                                className="gap-2"
                                onClick={() => setIsTrailerOpen(true)}
                            >
                                <Play className="w-4 h-4 fill-current" />
                                Watch Trailer
                            </Button>

                            <Button variant="secondary" size="lg" className="gap-2">
                                <Info className="w-4 h-4" />
                                More Details
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Movie Grid */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                            Now Showing
                        </h2>
                        <div className="h-1 w-20 bg-luxury-gold" />
                    </div>
                    <div className="hidden md:flex gap-4">
                        {['All', 'Action', 'Drama', 'Sci-Fi'].map((filter, i) => (
                            <button
                                key={filter}
                                className={`text-sm uppercase tracking-wider transition-colors ${
                                    i === 0
                                        ? 'text-luxury-gold font-bold'
                                        : 'text-gray-500 hover:text-white'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
                    </div>
                )}

                {error && (
                    <div className="text-center py-20">
                        <p className="text-red-400 mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()}>Try Again</Button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {movies.map((movie, index) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                image={movie.image_url}
                                genre="Drama"
                                rating={8.5}
                                duration="2h 30m"
                                showtimes={movie.shows.length}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Newsletter / Promo */}
            <section className="max-w-7xl mx-auto px-6 mb-20">
                <div className="relative overflow-hidden rounded-sm bg-luxury-soft border border-white/5 p-12 md:p-24 text-center">
                    <div className="absolute inset-0 bg-gradient-radial from-luxury-gold/10 to-transparent opacity-50" />
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
                            The Ultimate <span className="text-luxury-gold">IMAX</span>{' '}
                            Experience
                        </h2>
                        <p className="text-gray-400">
                            Join our exclusive membership program for early access to tickets,
                            premium lounge access, and special events.
                        </p>
                        <div className="pt-4">
                            <Button variant="outline" size="lg">
                                Join the Club
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ Trailer Modal (added) */}
            {isTrailerOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsTrailerOpen(false)}
                >
                    {/* backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    {/* modal */}
                    <motion.div
                        className="relative w-full max-w-4xl overflow-hidden rounded-sm border border-white/10 bg-black"
                        initial={{ scale: 0.96, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                            <p className="text-white font-semibold">Trailer</p>
                            <button
                                onClick={() => setIsTrailerOpen(false)}
                                className="text-gray-300 hover:text-white transition"
                                aria-label="Close trailer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full"
                                src={trailerEmbedUrl}
                                title="Movie Trailer"
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
