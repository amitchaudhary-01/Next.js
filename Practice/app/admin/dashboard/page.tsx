'use client';

import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, UserCheck, Mail, RefreshCw, Trash2, ShieldAlert, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  _id?: string;
  name?: string;
  email: string;
  role: string;
}

export default function AdminDashboardPage() {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setFetchingUsers(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setUsersList(data.data || data.users || []);
      } else {
        toast.error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setFetchingUsers(false);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId?: string) => {
    if (!userId) return;
    
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setActionLoadingId(userId);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && (data.success !== false)) {
        toast.success("User deleted successfully");
        // Remove user instantly from state list
        setUsersList((prev) => prev.filter((user) => user._id !== userId));
      } else {
        toast.error(data.message || "Failed to delete user");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setActionLoadingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-800/50 border border-gray-700/60 p-6 rounded-2xl">
        <div>
          <h2 className="text-2xl font-bold text-white">System Overview</h2>
          <p className="text-sm text-gray-400">Monitor active users and database records.</p>
        </div>
        <button 
          onClick={fetchUsers}
          disabled={fetchingUsers}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${fetchingUsers ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700/60 p-6 rounded-2xl">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-sm font-medium">Total Registered Users</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white mt-4">{usersList.length}</p>
          <span className="text-xs text-emerald-400 font-medium mt-2 inline-block">Active database records</span>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/60 p-6 rounded-2xl">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-sm font-medium">Security Status</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-emerald-400 mt-4">Protected</p>
          <span className="text-xs text-gray-400 font-medium mt-2 inline-block">Middleware guard active</span>
        </div>
      </div>

      {/* User Table Grid */}
      <div className="bg-gray-800/50 border border-gray-700/60 rounded-2xl p-6 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-4">User Directory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-900/60 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/60">
              {usersList.map((usr, i) => (
                <tr key={usr._id || i} className="hover:bg-gray-750/30">
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-orange-500 shrink-0" />
                    {usr.name || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      {usr.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      usr.role === 'admin' 
                        ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' 
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {usr.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDeleteUser(usr._id)}
                      disabled={actionLoadingId === usr._id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
                      title="Delete User"
                    >
                      {actionLoadingId === usr._id ? (
                        <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Delete
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}