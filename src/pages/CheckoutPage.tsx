import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, User, Mail, CreditCard, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { movieAPI } from '../services/movieAPI'
export function CheckoutPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const showId = searchParams.get('showId')
    const seatIds = searchParams.get('seatIds')?.split(',') || []
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        nic: '',
    })
    useEffect(() => {
        if (!showId || seatIds.length === 0) {
            navigate('/seats')
        }
    }, [showId, seatIds, navigate])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)
        setError(null)
        try {
            const reservationData = {
                showId: showId!,
                seatIds,
                user: {
                    name: formData.name,
                    email: formData.email,
                    nic: formData.nic,
                },
            }
            console.log('Sending reservation request:', reservationData)
            const reservation = await movieAPI.createReservation(reservationData)
            console.log('Received reservation response:', reservation)
            // Navigate to confirmation with reservation data
            navigate('/confirmation', {
                state: {
                    reservation: {
                        id: reservation.id || 'N/A',
                        showId: reservation.showId || showId,
                        seatIds: reservation.seatIds || seatIds,
                        user: reservation.user || formData,
                        createdAt: reservation.createdAt || new Date().toISOString(),
                    },
                },
            })
        } catch (err) {
            console.error('Reservation error:', err)
            setError(
                err instanceof Error ? err.message : 'Failed to create reservation',
            )
        } finally {
            setIsProcessing(false)
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <div className="min-h-screen bg-luxury-black pt-20 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-8">
                    <Link
                        to={`/seats?showId=${showId}`}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Seats
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
                        Checkout
                    </h1>
                </div>

                <div className="grid lg:grid-cols-[1fr_400px] gap-12">
                    <div className="space-y-8">
                        <div className="bg-luxury-soft border border-white/5 p-8 rounded-sm">
                            <h2 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                                <User className="w-5 h-5 text-luxury-gold" />
                                Your Details
                            </h2>

                            {error && (
                                <div className="mb-6 p-4 bg-red-900/20 border border-red-900/30 rounded-sm text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-gray-400">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className="w-full bg-luxury-black border border-white/10 rounded-sm px-4 py-3 text-white focus:border-luxury-gold focus:outline-none transition-colors pl-12"
                                            required
                                        />
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-gray-400">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-luxury-black border border-white/10 rounded-sm px-4 py-3 text-white focus:border-luxury-gold focus:outline-none transition-colors pl-12"
                                            required
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-gray-400">
                                        NIC Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="nic"
                                            value={formData.nic}
                                            onChange={handleInputChange}
                                            placeholder="200012345678"
                                            className="w-full bg-luxury-black border border-white/10 rounded-sm px-4 py-3 text-white focus:border-luxury-gold focus:outline-none transition-colors pl-12"
                                            required
                                        />
                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        isLoading={isProcessing}
                                    >
                                        {isProcessing ? 'Processing...' : 'Complete Reservation'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-sm p-6">
                            <h3 className="text-lg font-serif font-bold text-white mb-6">
                                Booking Summary
                            </h3>

                            <div className="flex gap-4 mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop"
                                    alt="Movie"
                                    className="w-20 h-28 object-cover rounded-sm"
                                />
                                <div>
                                    <h4 className="font-bold text-white">MOVIE</h4>
                                    <p className="text-sm text-gray-400 mt-1">IMAX 2D</p>
                                    <p className="text-sm text-luxury-gold mt-2">Theater</p>
                                </div>
                            </div>

                            <div className="space-y-3 border-t border-white/10 pt-4 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Selected Seats</span>
                                    <span className="text-white">{seatIds.length} seats</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4 mt-4">
                                <div className="flex justify-between items-end">
                  <span className="text-sm text-gray-400 uppercase tracking-wider">
                    Total Seats
                  </span>
                                    <span className="text-3xl font-serif font-bold text-luxury-gold">
                    {seatIds.length}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
