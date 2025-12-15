import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { SeatGrid } from '../components/SeatGrid'
import { movieAPI, Seat } from '../services/movieAPI'
export function SeatSelectionPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const showId = searchParams.get('showId')
    const [seats, setSeats] = useState<Seat[]>([])
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        async function fetchSeats() {
            if (!showId) {
                setError('No show selected')
                setLoading(false)
                return
            }
            try {
                setLoading(true)
                const data = await movieAPI.getSeatsByShow(showId)
                setSeats(data)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load seats')
                console.error('Error fetching seats:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchSeats()
    }, [showId])
    const handleSeatSelect = (seatId: string) => {
        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((id) => id !== seatId)
                : [...prev, seatId],
        )
    }
    const calculateTotal = () => {
        return selectedSeats.reduce((total, seatId) => {
            const seat = seats.find((s) => s.id === seatId)
            if (!seat) return total
            const seatNum = parseInt(seat.label.slice(1))
            const price = seatNum >= 5 && seatNum <= 8 ? 25 : 15
            return total + price
        }, 0)
    }
    const getSelectedSeatLabels = () => {
        return selectedSeats
            .map((id) => seats.find((s) => s.id === id)?.label)
            .filter(Boolean)
            .join(', ')
    }
    if (loading) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-luxury-gold animate-spin" />
            </div>
        )
    }
    if (error || !showId) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error || 'Invalid show'}</p>
                    <Link to="/">
                        <Button>Back to Home</Button>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-luxury-black pt-20 pb-32">
            <div className="fixed top-0 left-0 right-0 bg-luxury-black/90 backdrop-blur-md z-40 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-lg font-serif font-bold text-white">
                                Select Your Seats
                            </h1>
                            <p className="text-xs text-gray-400">
                                Choose your preferred seating
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <SeatGrid
                    seats={seats}
                    selectedSeats={selectedSeats}
                    onSeatSelect={handleSeatSelect}
                />
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-luxury-soft border-t border-luxury-gold/20 p-6 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Total Price
            </span>
                        <div className="flex items-baseline gap-1">
              <span className="text-2xl font-serif font-bold text-luxury-gold">
                ${calculateTotal()}
              </span>
                            <span className="text-sm text-gray-500">
                ({selectedSeats.length} seats)
              </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-2 text-sm text-gray-400">
                            <span>{getSelectedSeatLabels() || 'No seats selected'}</span>
                        </div>
                        <Button
                            size="lg"
                            disabled={selectedSeats.length === 0}
                            onClick={() => {
                                const params = new URLSearchParams({
                                    showId: showId!,
                                    seatIds: selectedSeats.join(','),
                                })
                                navigate(`/checkout?${params.toString()}`)
                            }}
                            className="min-w-[200px]"
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
