import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Star,
    Clock,
    Calendar,
    ChevronLeft,
    Loader2,
    ChevronDown,
} from 'lucide-react'
import { Button } from '../components/ui/Button'

import { movieAPI, Movie, Show } from '../services/movieAPI'
import {CalendarModal} from "../components/CalendarModalProps.tsx";
interface ShowsByDate {
    date: string
    dateLabel: string
    shows: Show[]
}
function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    today.setHours(0, 0, 0, 0)
    tomorrow.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)
    if (date.getTime() === today.getTime()) {
        return 'Today'
    } else if (date.getTime() === tomorrow.getTime()) {
        return 'Tomorrow'
    } else {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return `${days[date.getDay()]} ${date.getDate()}`
    }
}
function formatTime(isoString: string): string {
    const date = new Date(isoString)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`
}
function groupShowsByDate(shows: Show[]): ShowsByDate[] {
    const grouped = new Map<string, Show[]>()
    shows.forEach((show) => {
        const date = show.start_time.split('T')[0]
        if (!grouped.has(date)) {
            grouped.set(date, [])
        }
        grouped.get(date)!.push(show)
    })
    return Array.from(grouped.entries())
        .map(([date, shows]) => ({
            date,
            dateLabel: formatDate(date),
            shows: shows.sort(
                (a, b) =>
                    new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
            ),
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
}
export function MovieDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState<Movie | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedDateIndex, setSelectedDateIndex] = useState(0)
    const [selectedShowId, setSelectedShowId] = useState<string | null>(null)
    const [showsByDate, setShowsByDate] = useState<ShowsByDate[]>([])
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    useEffect(() => {
        async function fetchMovie() {
            if (!id) return
            try {
                setLoading(true)
                const data = await movieAPI.getMovieById(id)
                setMovie(data)
                const grouped = groupShowsByDate(data.shows)
                setShowsByDate(grouped)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load movie')
                console.error('Error fetching movie:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchMovie()
    }, [id])
    const displayedDates = showsByDate.slice(0, 7)
    const selectedDateShows = showsByDate[selectedDateIndex]?.shows || []
    const selectedShow = selectedShowId
        ? selectedDateShows.find((s) => s.id === selectedShowId)
        : null
    const availableDates = showsByDate.map((d) => d.date)
    const selectedDate = showsByDate[selectedDateIndex]?.date || null
    const handleCalendarDateSelect = (date: string) => {
        const index = showsByDate.findIndex((d) => d.date === date)
        if (index !== -1) {
            setSelectedDateIndex(index)
            setSelectedShowId(null)
        }
    }
    if (loading) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
            </div>
        )
    }
    if (error || !movie) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error || 'Movie not found'}</p>
                    <Link to="/">
                        <Button>Back to Home</Button>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <>
            <CalendarModal
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                availableDates={availableDates}
                selectedDate={selectedDate}
                onSelectDate={handleCalendarDateSelect}
            />

            <div className="fixed top-24 left-6 z-40">
                <Link to={`/movie/${id}/select-theater`}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 bg-black/50 backdrop-blur-md"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </Button>
                </Link>
            </div>

            <div className="min-h-screen bg-luxury-black pt-20 relative">
                <div className="relative min-h-[60vh] w-full">
                    <div className="absolute inset-0">
                        <img
                            src={movie.image_url}
                            alt={movie.title}
                            className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/80 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/60 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 md:pt-32 pb-12">
                        <div className="grid md:grid-cols-[300px_1fr] gap-12 items-end">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.6,
                                }}
                                className="hidden md:block rounded-sm overflow-hidden shadow-2xl border border-white/10"
                            >
                                <img
                                    src={movie.image_url}
                                    alt={movie.title}
                                    className="w-full aspect-[2/3] object-cover"
                                />
                            </motion.div>

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: 50,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2,
                                }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                  <span className="text-luxury-gold font-bold tracking-widest uppercase text-sm">
                    Now Showing
                  </span>
                                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-none">
                                        {movie.title.toUpperCase()}
                                    </h1>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
                                        <span className="text-white font-bold">8.5</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-luxury-gold" />
                                        <span>2h 30m</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 border border-white/20 rounded text-xs">
                      PG-13
                    </span>
                                    </div>
                                    <span>Sci-Fi, Drama</span>
                                </div>

                                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                                    Experience an unforgettable cinematic journey. Book your
                                    tickets now for the ultimate movie experience.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 1,
                        duration: 0.8,
                    }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
                >
          <span className="text-luxury-gold text-sm font-medium tracking-widest uppercase">
            Book Your Ticket
          </span>
                    <div className="flex flex-col items-center">
                        <motion.div
                            animate={{
                                y: [0, 8, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <ChevronDown className="w-6 h-6 text-luxury-gold" />
                        </motion.div>
                        <motion.div
                            animate={{
                                y: [0, 8, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.2,
                            }}
                            className="-mt-3"
                        >
                            <ChevronDown className="w-6 h-6 text-luxury-gold opacity-60" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-[1fr_400px] gap-12">
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                                <Calendar className="w-6 h-6 text-luxury-gold" />
                                Select Date
                            </h3>
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {displayedDates.map((dateGroup, i) => {
                                    const date = new Date(dateGroup.date)
                                    return (
                                        <button
                                            key={dateGroup.date}
                                            onClick={() => {
                                                setSelectedDateIndex(i)
                                                setSelectedShowId(null)
                                            }}
                                            className={`
                        flex-shrink-0 w-24 h-24 rounded-sm flex flex-col items-center justify-center gap-2 border transition-all duration-300
                        ${selectedDateIndex === i ? 'bg-luxury-gold text-luxury-black border-luxury-gold shadow-glow-gold' : 'bg-luxury-soft text-gray-400 border-white/5 hover:border-luxury-gold/50 hover:text-white'}
                      `}
                                        >
                      <span className="text-xs uppercase tracking-wider">
                        {dateGroup.dateLabel.split(' ')[0]}
                      </span>
                                            <span className="text-2xl font-bold">
                        {dateGroup.dateLabel.includes(' ')
                            ? dateGroup.dateLabel.split(' ')[1]
                            : date.getDate()}
                      </span>
                                        </button>
                                    )
                                })}

                                {showsByDate.length > 7 && (
                                    <button
                                        onClick={() => setIsCalendarOpen(true)}
                                        className="flex-shrink-0 w-24 h-24 rounded-sm flex flex-col items-center justify-center gap-2 border border-luxury-gold/30 bg-luxury-soft text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
                                    >
                                        <Calendar className="w-6 h-6" />
                                        <span className="text-xs uppercase tracking-wider font-medium">
                      More
                    </span>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                                <Clock className="w-6 h-6 text-luxury-gold" />
                                Select Time
                            </h3>
                            {selectedDateShows.length > 0 ? (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                    {selectedDateShows.map((show) => (
                                        <button
                                            key={show.id}
                                            onClick={() => setSelectedShowId(show.id)}
                                            className={`
                        py-3 px-4 rounded-sm text-sm font-medium border transition-all duration-300
                        ${selectedShowId === show.id ? 'bg-luxury-soft border-luxury-gold text-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'bg-luxury-soft border-white/5 text-gray-400 hover:border-white/20 hover:text-white'}
                      `}
                                        >
                                            {formatTime(show.start_time)}
                                            <span className="block text-[10px] text-gray-500 mt-1">
                        IMAX
                      </span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    No showtimes available for this date
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-32 h-fit">
                        <div className="bg-luxury-soft border border-white/10 rounded-sm p-6 space-y-6">
                            <h3 className="text-xl font-serif font-bold text-white">
                                Booking Summary
                            </h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Movie</span>
                                    <span className="text-white">{movie.title}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Date</span>
                                    <span className="text-white">
                    {showsByDate[selectedDateIndex]?.dateLabel || '-'}
                  </span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Time</span>
                                    <span className="text-white">
                    {selectedShow ? formatTime(selectedShow.start_time) : '-'}
                  </span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <Button
                                    className="w-full"
                                    size="lg"
                                    disabled={!selectedShowId}
                                    onClick={() => {
                                        if (selectedShowId) {
                                            navigate(`/seats?showId=${selectedShowId}`)
                                        }
                                    }}
                                >
                                    Select Seats
                                </Button>
                                {!selectedShowId && (
                                    <p className="text-center text-xs text-gray-500 mt-3">
                                        Please select a showtime to proceed
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
