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
        getProfile: () => apiClient.get('/users/profile'),
        getById: (id: string) => apiClient.get(`/users/${id}`),
        getAll: () => apiClient.get('/users'),
        update: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
        delete: (id: string) => apiClient.delete(`/users/${id}`),
        updateProfile: (data: any) => apiClient.put('/users/profile', data),
        uploadImage: async (file: File) => {
            const formData = new FormData();
            formData.append('image', file);
            const token = authClient.getAccessToken();
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/upload-image`, {
                method: 'POST',
                body: formData,
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                credentials: 'include'
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Upload failed');
            }
            
            return response.json();
        },
        search: (query: string, interests: string[]) => {
            const params = new URLSearchParams();
            if (query) params.append('q', query);
            if (interests.length > 0) params.append('interests', interests.join(','));
            return apiClient.get(`/users/search?${params.toString()}`);
        }
    },
    travelPlans: {
        getMyPlans: () => apiClient.get('/travel-plans/my'),
        getById: (id: string) => apiClient.get(`/travel-plans/${id}`),
        update: (id: string, data: any) => apiClient.put(`/travel-plans/${id}`, data),
        delete: (id: string) => apiClient.delete(`/travel-plans/${id}`),
        create: async (data: FormData) => {
            const token = authClient.getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travel-plans`, {
                method: 'POST',
                body: data,
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                credentials: 'include'
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Create travel plan failed');
            }
            
            return response.json();
        },
        complete: (id: string) => apiClient.put(`/travel-plans/${id}/complete`, {}),
        getAll: () => apiClient.get('/travel-plans'),
        search: (query: string) => apiClient.get(`/travel-plans/search?${query}`)
    },
    joinRequests: {
        getRequestsForUserPlans: () => apiClient.get('/join-requests/for-my-plans'),
        getMyRequests: () => apiClient.get('/join-requests/my'),
        getPlanRequests: (planId: string) => apiClient.get(`/join-requests/plan/${planId}`),
        create: (data: any) => apiClient.post('/join-requests', data),
        update: (id: string, data: any) => apiClient.put(`/join-requests/${id}`, data),
        delete: (id: string) => apiClient.delete(`/join-requests/${id}`),
        respond: (id: string, status: string) => apiClient.put(`/join-requests/${id}/respond`, { status })
    },
    reviews: {
        getUserReviews: (userId: string) => apiClient.get(`/reviews/user/${userId}`),
        delete: (reviewId: string) => apiClient.delete(`/reviews/${reviewId}`),
        getAll: () => apiClient.get('/reviews'),
        create: (data: any) => apiClient.post('/reviews', data),
        update: (id: string, data: any) => apiClient.put(`/reviews/${id}`, data)
    },
    payments: {
        createCheckoutSession: (plan: 'monthly' | 'yearly') => apiClient.post('/payments/create-checkout-session', { plan }),
        verifySession: (sessionId: string) => apiClient.post('/payments/verify-session', { sessionId })
    },
    requests: {
        getAll: () => apiClient.get('/join-requests'),
        delete: (id: string) => apiClient.delete(`/join-requests/${id}`)
    }
};