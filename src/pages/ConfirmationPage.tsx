import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Download, Share2, Calendar, Clock, User } from 'lucide-react'
import { Button } from '../components/ui/Button'
export function ConfirmationPage() {
    const location = useLocation()
    const reservation = location.state?.reservation
    // If no reservation data, show a fallback message
    if (!reservation) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6">
                <div className="text-center">
                    <p className="text-gray-400 mb-4">No reservation data found</p>
                    <Link to="/">
                        <Button>Return to Home</Button>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                <motion.div
                    initial={{
                        scale: 0.9,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="bg-luxury-soft rounded-sm overflow-hidden relative"
                >
                    <div className="h-1 w-full bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-dark" />

                    <div className="p-8 text-center space-y-6">
                        <div className="w-16 h-16 mx-auto bg-luxury-gold/10 rounded-full flex items-center justify-center border border-luxury-gold/20">
                            <Check className="w-8 h-8 text-luxury-gold" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-serif font-bold text-white mb-2">
                                Reservation Confirmed!
                            </h1>
                            <p className="text-gray-400 text-sm">
                                Your booking has been confirmed successfully.
                            </p>
                        </div>

                        <div className="bg-luxury-black border border-white/10 rounded-sm p-6 relative">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-luxury-soft rounded-full" />
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-luxury-soft rounded-full" />
                            <div className="absolute left-2 right-2 top-1/2 border-t border-dashed border-white/10" />

                            <div className="space-y-4 pb-6">
                                <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                                    YOUR BOOKING
                                </h2>
                                <div className="flex justify-center gap-4 text-xs text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>Confirmed</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>Check email</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 space-y-4">
                                <div className="space-y-3 text-left mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <User className="w-4 h-4 text-luxury-gold" />
                                        <span className="text-gray-400">Name:</span>
                                        <span className="text-white font-medium">
                      {reservation.user?.name || 'N/A'}
                    </span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-gray-400">Email:</span>
                                        <span className="text-white ml-2">
                      {reservation.user?.email || 'N/A'}
                    </span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-gray-400">NIC:</span>
                                        <span className="text-white ml-2">
                      {reservation.user?.nic || 'N/A'}
                    </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                    <span className="text-[10px] uppercase text-gray-500 tracking-wider">
                      Booking ID
                    </span>
                                        <p className="text-white font-bold text-xs">
                                            {reservation.id?.slice(0, 8) || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                    <span className="text-[10px] uppercase text-gray-500 tracking-wider">
                      Seats
                    </span>
                                        <p className="text-luxury-gold font-bold">
                                            {reservation.seatIds?.length || 0} seats
                                        </p>
                                    </div>
                                </div>

                                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-sm">
                                    <div className="w-full h-full bg-black flex items-center justify-center text-white text-[8px]">
                                        QR CODE
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                    Scan at entrance
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" className="flex-1 gap-2">
                                <Download className="w-4 h-4" />
                                Save
                            </Button>
                            <Button variant="outline" className="flex-1 gap-2">
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white/5 p-4 text-center">
                        <Link
                            to="/"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Return to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
