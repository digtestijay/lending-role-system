
// Reusable API service for GET and POST methods
const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private onUnauthorized?: () => void;

  setUnauthorizedHandler(handler: () => void) {
    this.onUnauthorized = handler;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private handleResponse<T>(response: Response, data: any): ApiResponse<T> {
    if (response.status === 401) {
      // Trigger logout on 401 Unauthorized
      if (this.onUnauthorized) {
        this.onUnauthorized();
      }
      return { success: false, error: 'Session expired. Please login again.' };
    }

    if (!response.ok) {
      return { success: false, error: data.message || 'Request failed' };
    }

    return { success: true, data };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();
      return this.handleResponse<T>(response, data);
    } catch (error) {
      console.error('API GET Error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return this.handleResponse<T>(response, data);
    } catch (error) {
      console.error('API POST Error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return this.handleResponse<T>(response, data);
    } catch (error) {
      console.error('API PUT Error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();
      return this.handleResponse<T>(response, data);
    } catch (error) {
      console.error('API DELETE Error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }
}

export const apiService = new ApiService();
