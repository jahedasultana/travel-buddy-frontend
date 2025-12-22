const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    role: string;
    image?: string;
    bio?: string;
    isVerified?: boolean;
    createdAt?: string;
    subscriptionStatus?: 'ACTIVE' | 'INACTIVE' | 'PAST_DUE' | 'CANCELED';
}

interface AuthResponse {
    success: boolean;
    user: User;
    accessToken: string;
}

class AuthClient {
    private accessToken: string | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.accessToken = localStorage.getItem('accessToken');
            this.clearBetterAuthCookies(); // Clean up any Better-Auth cookies
        }
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const url = `${API_URL}${endpoint}`;
        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include',
        };

        if (this.accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${this.accessToken}`,
            };
        }

        const response = await fetch(url, config);
        return response;
    }

    async register(data: { name: string; email: string; password: string }) {
        const response = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result: AuthResponse = await response.json();
            this.setAccessToken(result.accessToken);
            return result;
        }

        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
    }

    async login(data: { email: string; password: string }) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result: AuthResponse = await response.json();
            this.setAccessToken(result.accessToken);
            return result;
        }

        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }

    async logout() {
        await this.request('/auth/logout', { method: 'POST' });
        this.clearAccessToken();
        this.clearBetterAuthCookies();
    }

    private clearBetterAuthCookies() {
        if (typeof document !== 'undefined') {
            // Clear Better-Auth cookies
            const cookiesToClear = [
                'better-auth.session_token',
                'better-auth.csrf_token',
                'better-auth.callback_url',
                'better-auth.pkce_code_verifier'
            ];
            
            cookiesToClear.forEach(cookieName => {
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.vercel.app;`;
            });
        }
    }

    async getMe(): Promise<User> {
        const response = await this.request('/auth/me');
        
        if (response.ok) {
            const result = await response.json();
            return result.user;
        }

        if (response.status === 401) {
            await this.refreshToken();
            return this.getMe();
        }

        throw new Error('Failed to get user');
    }

    async refreshToken() {
        const response = await this.request('/auth/refresh-token', { method: 'POST' });
        
        if (response.ok) {
            const result = await response.json();
            this.setAccessToken(result.accessToken);
            return result.accessToken;
        }

        this.clearAccessToken();
        throw new Error('Token refresh failed');
    }

    private setAccessToken(token: string) {
        this.accessToken = token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', token);
        }
    }

    private clearAccessToken() {
        this.accessToken = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
        }
    }

    getAccessToken() {
        return this.accessToken;
    }

    async sendVerificationOtp(data: { email: string; type: string }, callbacks?: { onSuccess?: () => void; onError?: (ctx: any) => void }) {
        try {
            const response = await this.request('/auth/send-otp', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                callbacks?.onSuccess?.();
                return await response.json();
            }

            const error = await response.json();
            callbacks?.onError?.({ error });
            throw new Error(error.message || 'Failed to send OTP');
        } catch (error: any) {
            callbacks?.onError?.({ error: { message: error.message } });
            throw error;
        }
    }

    async verifyEmail(data: { email: string; otp: string }, callbacks?: { onSuccess?: () => void; onError?: (ctx: any) => void }) {
        try {
            const response = await this.request('/auth/verify-email', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                callbacks?.onSuccess?.();
                return await response.json();
            }

            const error = await response.json();
            callbacks?.onError?.({ error });
            throw new Error(error.message || 'Email verification failed');
        } catch (error: any) {
            callbacks?.onError?.({ error: { message: error.message } });
            throw error;
        }
    }

    async resetPassword(data: { email: string; otp: string; password: string }, callbacks?: { onSuccess?: () => void; onError?: (ctx: any) => void }) {
        try {
            const response = await this.request('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                callbacks?.onSuccess?.();
                return await response.json();
            }

            const error = await response.json();
            callbacks?.onError?.({ error });
            throw new Error(error.message || 'Password reset failed');
        } catch (error: any) {
            callbacks?.onError?.({ error: { message: error.message } });
            throw error;
        }
    }

    async changePassword(data: { currentPassword: string; newPassword: string; revokeOtherSessions?: boolean }, callbacks?: { onSuccess?: () => void; onError?: (ctx: any) => void }) {
        try {
            const response = await this.request('/auth/change-password', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                callbacks?.onSuccess?.();
                return await response.json();
            }

            const error = await response.json();
            callbacks?.onError?.({ error });
            throw new Error(error.message || 'Password change failed');
        } catch (error: any) {
            callbacks?.onError?.({ error: { message: error.message } });
            throw error;
        }
    }
}

export const authClient = new AuthClient();

// Legacy exports for compatibility
export const signIn = {
    email: authClient.login.bind(authClient)
};

export const signUp = {
    email: authClient.register.bind(authClient)
};

export const signOut = authClient.logout.bind(authClient);

// Email OTP functionality
export const emailOtp = {
    sendVerificationOtp: authClient.sendVerificationOtp.bind(authClient),
    verifyEmail: authClient.verifyEmail.bind(authClient),
    resetPassword: authClient.resetPassword.bind(authClient)
};

// Hook for session (compatibility)
export const useSession = (): { data: { user: User | null } | null; isPending: boolean; error: any } => {
    // This is a placeholder - components should use useAuth() instead
    return { data: { user: null }, isPending: false, error: null };
};