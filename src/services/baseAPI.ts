//const BASE_URL = 'http://localhost:4000/api';
const BASE_URL = 'https://seat-reservation-assessment-v1.onrender.com/api';
export class APIError extends Error {
  constructor(message: string, public status?: number, public data?: any) {
    super(message);
    this.name = 'APIError';
  }
}
export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      ...options
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(errorData.message || `API request failed: ${response.statusText}`, response.status, errorData);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(error instanceof Error ? error.message : 'Network request failed');
  }
}