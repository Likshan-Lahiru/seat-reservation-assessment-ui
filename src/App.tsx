import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { FilmGrain } from './components/FilmGrain';
import { HomePage } from './pages/HomePage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { TheatersPage } from './pages/TheatersPage';
function ScrollToTop() {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
export function App() {
  return <Router>
      <div className="min-h-screen bg-luxury-black text-white selection:bg-luxury-gold selection:text-luxury-black">
        <ScrollToTop />
        <FilmGrain />
        <Navigation />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id/select-theater" element={<TheatersPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/seats" element={<SeatSelectionPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />

            {/* Fallback routes */}
            <Route path="/movies" element={<HomePage />} />
            <Route path="/theaters" element={<HomePage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>;
}