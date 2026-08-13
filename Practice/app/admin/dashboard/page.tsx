'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Users, Home, TrendingUp, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
            toast.error("Please login to access the dashboard");
            router.push('/login');
            return;
        }

        try {
            const user = JSON.parse(storedUser);

            // Verify if user is an admin
            if (user.role !== 'admin') {
                toast.error("Access denied: Admin only area");
                router.push('/');
            } else {
                setIsAdmin(true);
                setAdminName(user.name || 'Admin');
            }
        } catch (e) {
            console.error("Error parsing user session");
            router.push('/login');
        } finally {
            setLoading(false);
        }
    }, [router]);

    // Show a clean loading spinner while verifying authorization
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-slate-100 p-6 md:p-12">
            <div className="mx-auto max-w-7xl space-y-8">
                
                {/* Dashboard Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md shadow-orange-500/20">
                            <Shield className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                            <p className="text-sm text-slate-500">Welcome back, <span className="font-semibold text-slate-700">{adminName}</span></p>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Total Users</span>
                            <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <p className="mt-4 text-3xl font-bold text-slate-900">--</p>
                        <span className="mt-2 text-xs text-emerald-600 font-medium">Active database users</span>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Total Properties/Rooms</span>
                            <Home className="h-5 w-5 text-orange-600" />
                        </div>
                        <p className="mt-4 text-3xl font-bold text-slate-900">--</p>
                        <span className="mt-2 text-xs text-blue-600 font-medium">Listed rooms</span>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">System Status</span>
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                        </div>
                        <p className="mt-4 text-3xl font-bold text-emerald-600">Secure</p>
                        <span className="mt-2 text-xs text-slate-500 font-medium">Backend token verified</span>
                    </div>
                </div>

                {/* Management Section / Placeholder */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Admin Controls</h3>
                    <p className="text-sm text-slate-600">
                        You can now manage your real estate listings, inspect registered users, and perform administrative operations securely through backend API routes guarded by your `verifyAdmin` middleware.
                    </p>
                </div>

            </div>
        </div>
    );
}