"use client";

import { useEffect, useState } from "react";
import { Users, Mail, Shield, RefreshCw } from "lucide-react";

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
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Users response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.data || data.users || []);
    } catch (error) {
      console.error("Fetch users error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-orange-600" />

          <p className="text-sm text-slate-500">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Failed to load users
        </h2>

        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>

        <button
          onClick={fetchUsers}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manage Users
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage registered users.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Total Users */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
          <Users className="h-6 w-6 text-orange-600" />
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Total Users
          </p>

          <p className="text-2xl font-bold text-slate-900">
            {users.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {users.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="mx-auto mb-3 h-10 w-10 text-slate-300" />

            <h3 className="font-semibold text-slate-700">
              No users found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              No registered users are available.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Role
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                          {user.name
                            ?.charAt(0)
                            .toUpperCase() || "U"}
                        </div>

                        <span className="font-medium text-slate-900">
                          {user.name || "N/A"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="h-4 w-4 text-slate-400" />
                        {user.email}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-orange-500" />

                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium capitalize text-orange-700">
                          {user.role}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}