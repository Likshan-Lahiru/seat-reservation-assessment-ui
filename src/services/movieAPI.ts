import { apiRequest } from './baseAPI'

export interface Show {
    id: string
    theatre_id: string
    start_time: string
    end_time: string
}

export interface Movie {
    id: string
    title: string
    image_url: string
    created_at: string
    shows: Show[]
}

export interface Theatre {
    id: string
    name: string
    image_url: string
    rating: string
    location: string
    created_at: string
}

export interface Seat {
    id: string
    theatre_id: string
    label: string
    created_at: string
    reservationStatus: boolean
}

export interface ReservationRequest {
    showId: string
    seatIds: string[]
    user: {
        name: string
        email: string
        nic: string
    }
}

export interface ReservationResponse {
    id: string
    showId: string
    seatIds: string[]
    user: {
        name: string
        email: string
        nic: string
    }
    createdAt: string
}

export const movieAPI = {
    async getMovies(): Promise<Movie[]> {
        return apiRequest<Movie[]>('/movies')
    },

    async getMovieById(id: string): Promise<Movie> {
        const movies = await this.getMovies()
        const movie = movies.find((m) => m.id === id)
        if (!movie) {
            throw new Error(`Movie with id ${id} not found`)
        }
        return movie
    },

    async getTheatres(): Promise<Theatre[]> {
        return apiRequest<Theatre[]>('/theatres')
    },

    async getSeatsByShow(showId: string): Promise<Seat[]> {
        return apiRequest<Seat[]>(`/seats/by-show/${showId}`)
    },

    async createReservation(
        data: ReservationRequest,
    ): Promise<ReservationResponse> {
        return apiRequest<ReservationResponse>('/reservations', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    },
}
