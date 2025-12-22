"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '@/app/utils/auth-client';

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

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            if (authClient.getAccessToken()) {
                const userData = await authClient.getMe();
                setUser(userData);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const result = await authClient.login({ email, password });
        setUser(result.user);
    };

    const register = async (name: string, email: string, password: string) => {
        const result = await authClient.register({ name, email, password });
        setUser(result.user);
    };

    const logout = async () => {
        await authClient.logout();
        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const userData = await authClient.getMe();
            setUser(userData);
        } catch (error) {
            console.error('Failed to refresh user:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}