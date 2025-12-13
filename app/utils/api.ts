import { authClient } from './auth-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiClient {
    private async request(endpoint: string, options: RequestInit = {}) {
        const url = `${API_URL}${endpoint}`;
        const token = authClient.getAccessToken();
        
        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            credentials: 'include',
        };

        const response = await fetch(url, config);
        
        if (response.status === 401 && token) {
            try {
                await authClient.refreshToken();
                const newToken = authClient.getAccessToken();
                if (newToken) {
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${newToken}`,
                    };
                    return fetch(url, config);
                }
            } catch (error) {
                console.error('Token refresh failed:', error);
            }
        }

        return response;
    }

    async get(endpoint: string) {
        const response = await this.request(endpoint);
        if (!response.ok) {
            throw new Error(`GET ${endpoint} failed`);
        }
        return response.json();
    }

    async post(endpoint: string, data: any) {
        const response = await this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `POST ${endpoint} failed`);
        }
        return response.json();
    }

    async put(endpoint: string, data: any) {
        const response = await this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `PUT ${endpoint} failed`);
        }
        return response.json();
    }

    async delete(endpoint: string) {
        const response = await this.request(endpoint, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`DELETE ${endpoint} failed`);
        }
        return response.json();
    }
}

export const apiClient = new ApiClient();

// Legacy export for compatibility
export const api = {
    users: {
        getMatches: () => apiClient.get('/users/matches'),
        getProfile: () => apiClient.get('/users/profile')
    },
    travelPlans: {
        getMyPlans: () => apiClient.get('/travel-plans/my')
    },
    joinRequests: {
        getRequestsForUserPlans: () => apiClient.get('/join-requests/for-my-plans'),
        getMyRequests: () => apiClient.get('/join-requests/my')
    },
    payments: {
        createCheckoutSession: (plan: 'monthly' | 'yearly') => apiClient.post('/payments/create-checkout-session', { plan })
    }
};