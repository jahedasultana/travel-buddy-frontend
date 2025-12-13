"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import UserDashboard from "@/app/components/UserDashboard";
import AdminDashboard from "@/app/components/AdminDashboard";
import DashboardSkeleton from "@/app/components/DashboardSkeleton";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/app/utils/api";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user?.id) {
            // Fetch full profile to get role if not in session (though session usually has it)
            // But let's fetch profile to be sure and get latest data
            const fetchProfile = async () => {
                try {
                    // Fetch profile and potential user dashboard data in parallel
                    // We optimistically fetch user dashboard data. If user is ADMIN, we just ignore it.
                    // If fetching dashboard data fails (e.g. 403), we ignore it here and let UserDashboard handle or retry (or just have null)

                    const [profile, dashDataResult] = await Promise.all([
                        apiClient.get('/users/profile'),
                        Promise.all([
                            apiClient.get('/travel-plans/my').catch(() => []),
                            apiClient.get('/join-requests/for-my-plans').catch(() => []),
                            apiClient.get('/join-requests/my').catch(() => [])
                        ]).then(([plans, requests, mySentRequests]) => ({ plans, requests, mySentRequests }))
                            .catch(err => {
                                console.warn("Optimistic fetch failed", err);
                                return { plans: [], requests: [], mySentRequests: [] };
                            })
                    ]);

                    setUserProfile(profile);
                    setDashboardData(dashDataResult);
                } catch (error) {
                    console.error("Failed to fetch profile", error);
                } finally {
                    setIsLoadingProfile(false);
                }
            };
            fetchProfile();
        }
    }, [user, loading, router]);

    if (loading || isLoadingProfile) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-grow container mt-16 mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <DashboardSkeleton />
                </main>
                <Footer />
            </div>
        );
    }

    if (!user || !userProfile) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow container mt-16 mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {userProfile.role === 'ADMIN' ? (
                    <AdminDashboard />
                ) : (
                    <UserDashboard user={userProfile} initialData={dashboardData} />
                )}
            </main>
            <Footer />
        </div>
    );
}
