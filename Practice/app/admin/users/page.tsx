'use client';

import { useEffect, useState } from "react";
import { Users, Mail, Shield, RefreshCw, Trash2, Edit2, X } from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "@/component/pagination";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Edit State Modal
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.data || data.users || []);
    } catch (error) {
      console.error("Fetch users error:", error);
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle user deletion action
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
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && (data.success !== false)) {
        toast.success("User deleted successfully");
        setUsers((prev) => {
          const updated = prev.filter((user) => user._id !== userId);
          // Adjust page if deletion clears out the last item on the current page
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

  // Handle User Update Submission
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      setUpdateLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/user/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: editingUser.name,
          role: editingUser.role,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && (data.success !== false)) {
        toast.success("User updated successfully");
        setUsers((prev) =>
          prev.map((u) => (u._id === editingUser._id ? editingUser : u))
        );
        setEditingUser(null);
      } else {
        toast.error(data.message || "Failed to update user");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination Calculations
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handleItemsPerPageChange = (newSize: number) => {
    setItemsPerPage(newSize);
    setCurrentPage(1); // Reset back to page 1 when changing entries limit
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-orange-600" />
          <p className="text-sm text-slate-500">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-4 sm:m-6 rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">Failed to load users</h2>
        <p className="mt-1 text-sm text-red-600">{error}</p>
        <button
          onClick={fetchUsers}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 relative p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Manage Users</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">View and manage registered users.</p>
        </div>

        <button
          onClick={fetchUsers}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-300 cursor-pointer shadow-xs"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Total Users */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 shrink-0">
          <Users className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <p className="text-xs sm:text-sm text-slate-500">Total Users</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{users.length}</p>
        </div>
      </div>

      {/* Users Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        {users.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <h3 className="font-semibold text-slate-700">No users found</h3>
            <p className="mt-1 text-sm text-slate-400">No registered users are available.</p>
          </div>
        ) : (
          <>
            {/* MOBILE VIEW: Cards Layout (< md screens) */}
            <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
              {currentUsers.map((user) => (
                <div key={user._id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 text-xs shrink-0">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm break-all">{user.name || "N/A"}</h4>
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
                          <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="break-all">{user.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[10px] font-semibold capitalize text-orange-700 border border-orange-200 shrink-0">
                      {user.role}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium transition-all cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={actionLoadingId === user._id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-medium transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {actionLoadingId === user._id ? (
                        <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW: Table Layout (md+ screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">User</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Role</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {currentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 shrink-0">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <span className="font-medium text-slate-900">
                            {user.name || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>{user.email}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-orange-500 shrink-0" />
                          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium capitalize text-orange-700 border border-orange-200">
                            {user.role}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingUser(user)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-400 text-slate-700 hover:text-white border border-slate-200 rounded-lg text-xs font-medium transition-all cursor-pointer"
                            title="Edit User"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            disabled={actionLoadingId === user._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 rounded-lg text-xs font-medium transition-all disabled:opacity-50 cursor-pointer"
                            title="Delete User"
                          >
                            {actionLoadingId === user._id ? (
                              <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reusable Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              startIndex={startIndex}
              endIndex={startIndex + itemsPerPage}
              totalItems={users.length}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Edit User Details</h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editingUser.name || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Email (Read-only)
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white cursor-pointer"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="w-full sm:w-auto rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="w-full sm:w-auto rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {updateLoading && (
                    <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}