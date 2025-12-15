import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
interface CalendarModalProps {
    isOpen: boolean
    onClose: () => void
    availableDates: string[]
    selectedDate: string | null
    onSelectDate: (date: string) => void
}
export function CalendarModal({
                                  isOpen,
                                  onClose,
                                  availableDates,
                                  selectedDate,
                                  onSelectDate,
                              }: CalendarModalProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDayOfWeek = firstDay.getDay()
        return {
            daysInMonth,
            startingDayOfWeek,
        }
    }
    const isDateAvailable = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0]
        return availableDates.includes(dateStr)
    }
    const isDateSelected = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0]
        return dateStr === selectedDate
    }
    const handleDateClick = (day: number) => {
        const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day,
        )
        if (isDateAvailable(date)) {
            const dateStr = date.toISOString().split('T')[0]
            onSelectDate(dateStr)
            onClose()
        }
    }
    const goToPreviousMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
        )
    }
    const goToNextMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
        )
    }
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)
    const days = Array.from(
        {
            length: daysInMonth,
        },
        (_, i) => i + 1,
    )
    const emptyDays = Array.from(
        {
            length: startingDayOfWeek,
        },
        (_, i) => i,
    )
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            transition={{
                                type: 'spring',
                                duration: 0.5,
                            }}
                            className="bg-luxury-soft border border-luxury-gold/20 rounded-sm shadow-2xl w-full max-w-md overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <div>
                                    <h2 className="text-xl font-serif font-bold text-white">
                                        Select Date
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Choose from available showtimes
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Calendar */}
                            <div className="p-6">
                                {/* Month Navigation */}
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={goToPreviousMonth}
                                        className="p-2 text-gray-400 hover:text-luxury-gold hover:bg-white/5 rounded transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <h3 className="text-lg font-serif font-bold text-white">
                                        {monthNames[currentMonth.getMonth()]}{' '}
                                        {currentMonth.getFullYear()}
                                    </h3>
                                    <button
                                        onClick={goToNextMonth}
                                        className="p-2 text-gray-400 hover:text-luxury-gold hover:bg-white/5 rounded transition-all"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Day Labels */}
                                <div className="grid grid-cols-7 gap-2 mb-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                                        (day) => (
                                            <div
                                                key={day}
                                                className="text-center text-xs text-gray-500 font-medium py-2"
                                            >
                                                {day}
                                            </div>
                                        ),
                                    )}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-2">
                                    {emptyDays.map((_, i) => (
                                        <div key={`empty-${i}`} />
                                    ))}
                                    {days.map((day) => {
                                        const date = new Date(
                                            currentMonth.getFullYear(),
                                            currentMonth.getMonth(),
                                            day,
                                        )
                                        const available = isDateAvailable(date)
                                        const selected = isDateSelected(date)
                                        return (
                                            <motion.button
                                                key={day}
                                                whileHover={
                                                    available
                                                        ? {
                                                            scale: 1.05,
                                                        }
                                                        : {}
                                                }
                                                whileTap={
                                                    available
                                                        ? {
                                                            scale: 0.95,
                                                        }
                                                        : {}
                                                }
                                                onClick={() => handleDateClick(day)}
                                                disabled={!available}
                                                className={`
                          aspect-square rounded-sm flex items-center justify-center text-sm font-medium transition-all
                          ${selected ? 'bg-luxury-gold text-luxury-black shadow-glow-gold font-bold' : available ? 'bg-luxury-black text-white hover:bg-luxury-gold hover:text-luxury-black border border-white/10 hover:border-luxury-gold' : 'bg-transparent text-gray-700 cursor-not-allowed'}
                        `}
                                            >
                                                {day}
                                            </motion.button>
                                        )
                                    })}
                                </div>

                                {/* Legend */}
                                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded bg-luxury-gold" />
                                        <span>Selected</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded bg-luxury-black border border-white/10" />
                                        <span>Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded bg-transparent border border-gray-700" />
                                        <span>Unavailable</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
