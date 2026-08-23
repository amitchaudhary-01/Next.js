'use client';

import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, UserCheck, Mail, RefreshCw, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Pagination from '@/component/pagination';

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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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
        setUsersList((prev) => {
          const updated = prev.filter((user) => user._id !== userId);
          // Adjust page if the current page becomes out of bounds
          const totalPages = Math.ceil(updated.length / itemsPerPage);
          if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
          }
          return updated;
        });
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

  // Pagination Calculations
  const totalPages = Math.ceil(usersList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = usersList.slice(startIndex, startIndex + itemsPerPage);

  const handleItemsPerPageChange = (newSize: number) => {
    setItemsPerPage(newSize);
    setCurrentPage(1); // Reset to page 1 when limit changes
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-3 sm:p-6">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white border border-slate-200 p-4 sm:p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">System Overview</h2>
          <p className="text-xs sm:text-sm text-slate-500">Monitor active users and database records.</p>
        </div>
        <button 
          onClick={fetchUsers}
          disabled={fetchingUsers}
          className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${fetchingUsers ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 p-4 sm:p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs sm:text-sm font-medium">Total Registered Users</span>
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">{usersList.length}</p>
          <span className="text-xs text-emerald-600 font-light mt-2 inline-block">Active database records</span>
        </div>

        <div className="bg-white border border-slate-200 p-4 sm:p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs sm:text-sm font-medium">Security Status</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-xl sm:text-2xl font-sans text-emerald-600 mt-3">Protected</p>
          <span className="text-xs text-slate-500 font-medium mt-2 inline-block">Middleware guard active</span>
        </div>
      </div>

      {/* User List Container */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-6 pb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">User Directory</h3>
        </div>

        {usersList.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            No users found
          </div>
        ) : (
          <>
            {/* MOBILE VIEW: Stacked Cards (< md screens) */}
            <div className="grid grid-cols-1 gap-3 p-4 md:hidden">
              {currentUsers.map((usr, i) => (
                <div key={usr._id || i} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                        <UserCheck className="w-4 h-4 text-orange-600 shrink-0" />
                        <span className="break-all">{usr.name || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="break-all">{usr.email}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full shrink-0 ${
                      usr.role === 'admin' 
                        ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {usr.role}
                    </span>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-slate-200">
                    <button
                      onClick={() => handleDeleteUser(usr._id)}
                      disabled={actionLoadingId === usr._id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 rounded-lg text-xs font-medium transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {actionLoadingId === usr._id ? (
                        <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Delete User
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW: Standard Table (md+ screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Name</th>
                    <th className="px-6 py-3 font-semibold">Email</th>
                    <th className="px-6 py-3 font-semibold">Role</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentUsers.map((usr, i) => (
                    <tr key={usr._id || i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-3 font-medium text-slate-900">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-orange-600 shrink-0" />
                          <span>{usr.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{usr.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full inline-block ${
                          usr.role === 'admin' 
                            ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {usr.role}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button
                          onClick={() => handleDeleteUser(usr._id)}
                          disabled={actionLoadingId === usr._id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 rounded-lg text-xs font-medium transition-all disabled:opacity-50 cursor-pointer"
                          title="Delete User"
                        >
                          {actionLoadingId === usr._id ? (
                            <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
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

            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              startIndex={startIndex}
              endIndex={startIndex + itemsPerPage}
              totalItems={usersList.length}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        )}
      </div>

    </div>
  );
}