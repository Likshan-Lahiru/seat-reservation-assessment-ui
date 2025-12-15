import React, { Component } from 'react'
import { motion } from 'framer-motion'
import { Seat } from '../services/movieAPI'
interface SeatProps {
    seat: Seat
    isSelected: boolean
    onSelect: (seatId: string) => void
}
const SeatComponent = ({ seat, isSelected, onSelect }: SeatProps) => {
    const isAvailable = !seat.reservationStatus
    const isOccupied = seat.reservationStatus
    return (
        <motion.button
            whileHover={
                isAvailable
                    ? {
                        scale: 1.1,
                        zIndex: 10,
                    }
                    : {}
            }
            whileTap={
                isAvailable
                    ? {
                        scale: 0.95,
                    }
                    : {}
            }
            onClick={() => (isAvailable || isSelected ? onSelect(seat.id) : null)}
            className={`
        relative w-8 h-8 md:w-10 md:h-10 rounded-t-lg rounded-b-sm flex items-center justify-center text-[10px] font-medium transition-all duration-300
        ${isOccupied ? 'bg-red-900/20 text-red-700 cursor-not-allowed border border-red-900/30' : ''}
        ${isAvailable && !isSelected ? 'bg-leather text-gray-400 border border-white/5 hover:border-luxury-gold/50 hover:text-white hover:shadow-glow-gold' : ''}
        ${isSelected ? 'bg-luxury-gold text-luxury-black border border-luxury-gold shadow-glow-gold font-bold' : ''}
      `}
            disabled={isOccupied}
            aria-label={`Seat ${seat.label} ${isSelected ? 'selected' : isOccupied ? 'occupied' : 'available'}`}
        >
            {/* Armrests */}
            <div
                className={`absolute -left-1 bottom-0 w-1 h-2/3 rounded-l-sm ${isSelected ? 'bg-luxury-gold-dark' : 'bg-luxury-soft'}`}
            />
            <div
                className={`absolute -right-1 bottom-0 w-1 h-2/3 rounded-r-sm ${isSelected ? 'bg-luxury-gold-dark' : 'bg-luxury-soft'}`}
            />

            {/* Seat Label */}
            <span
                className={`${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            >
        {seat.label}
      </span>
        </motion.button>
    )
}
interface SeatGridProps {
    seats: Seat[]
    selectedSeats: string[]
    onSeatSelect: (seatId: string) => void
}
export function SeatGrid({
                             seats,
                             selectedSeats,
                             onSeatSelect,
                         }: SeatGridProps) {
    // Group seats by row (first letter of label)
    const seatsByRow = seats.reduce(
        (acc, seat) => {
            const row = seat.label.charAt(0)
            if (!acc[row]) {
                acc[row] = []
            }
            acc[row].push(seat)
            return acc
        },
        {} as Record<string, Seat[]>,
    )
    // Sort rows alphabetically
    const rows = Object.keys(seatsByRow).sort()
    // Sort seats within each row by number
    rows.forEach((row) => {
        seatsByRow[row].sort((a, b) => {
            const numA = parseInt(a.label.slice(1))
            const numB = parseInt(b.label.slice(1))
            return numA - numB
        })
    })
    return (
        <div className="w-full max-w-4xl mx-auto perspective-1000">
            {/* Screen */}
            <div className="mb-16 relative">
                <div className="h-16 w-full bg-gradient-to-b from-white/20 to-transparent rounded-[50%] transform rotate-x-12 scale-x-110 blur-sm" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-gray-500 text-xs tracking-[0.5em] uppercase font-light">
                    Screen
                </div>
            </div>

            {/* Grid */}
            <div className="space-y-3">
                {rows.map((row, rowIndex) => {
                    const rowSeats = seatsByRow[row]
                    const seatsPerSection = Math.ceil(rowSeats.length / 3)
                    return (
                        <div
                            key={row}
                            className="flex justify-center items-center gap-2 md:gap-4"
                        >
              <span className="w-6 text-xs text-gray-600 font-medium text-right mr-2">
                {row}
              </span>
                            {/* Left Section */}
                            <div className="flex gap-1 md:gap-2">
                                {rowSeats.slice(0, seatsPerSection).map((seat) => (
                                    <SeatComponent
                                        key={seat.id}
                                        seat={seat}
                                        isSelected={selectedSeats.includes(seat.id)}
                                        onSelect={onSeatSelect}
                                    />
                                ))}
                            </div>
                            <div className="w-4 md:w-8" /> {/* Aisle */}
                            {/* Center Section */}
                            <div className="flex gap-1 md:gap-2">
                                {rowSeats
                                    .slice(seatsPerSection, seatsPerSection * 2)
                                    .map((seat) => (
                                        <SeatComponent
                                            key={seat.id}
                                            seat={seat}
                                            isSelected={selectedSeats.includes(seat.id)}
                                            onSelect={onSeatSelect}
                                        />
                                    ))}
                            </div>
                            <div className="w-4 md:w-8" /> {/* Aisle */}
                            {/* Right Section */}
                            <div className="flex gap-1 md:gap-2">
                                {rowSeats.slice(seatsPerSection * 2).map((seat) => (
                                    <SeatComponent
                                        key={seat.id}
                                        seat={seat}
                                        isSelected={selectedSeats.includes(seat.id)}
                                        onSelect={onSeatSelect}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Legend */}
            <div className="mt-12 flex justify-center gap-8 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-leather border border-white/10" />
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-luxury-gold shadow-glow-gold" />
                    <span className="text-luxury-gold">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-900/20 border border-red-900/30" />
                    <span>Occupied</span>
                </div>
            </div>
        </div>
    )
}
