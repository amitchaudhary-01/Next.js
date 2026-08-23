'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Shield, 
  Bell, 
  Globe, 
  Loader2,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SettingsState {
  siteName: string;
  adminEmail: string;
  maintenanceMode: boolean;
  emailAlerts: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: string;
}

const SettingsPage = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingsState>({
    siteName: '',
    adminEmail: '',
    maintenanceMode: false,
    emailAlerts: true,
    twoFactorAuth: true,
    sessionTimeout: '30',
  });

  // Fetch settings from the backend when component mounts
  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch settings");
      }

      // Assuming your API returns the settings object inside data.settings or data
      if (data.settings || data.data) {
        setSettings(data.settings || data.data);
      }
    } catch (error) {
      console.error("Fetch settings error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Submit/Save settings to the backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, {
        method: "PUT", // or "PATCH" depending on your backend API route
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(settings),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Failed to update settings");
      }

      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error("Save settings error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-orange-600" />
          <p className="text-sm text-slate-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-4 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage system preferences, security controls, and application settings.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {isSaving ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl shrink-0">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">General Configuration</h2>
              <p className="text-xs text-slate-500">Basic details about your Veedoo platform instance.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Administrator Email
              </label>
              <input
                type="email"
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-5 border-t border-slate-100 gap-4">
            <div className="pr-4">
              <span className="text-sm font-semibold text-slate-900 block">Maintenance Mode</span>
              <span className="text-xs text-slate-500">Temporarily disable public access for system upgrades.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>

        {/* Security & Access Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">Security & Access</h2>
              <p className="text-xs text-slate-500">Manage guard policies, authentication, and security parameters.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="pr-4">
                <span className="text-sm font-semibold text-slate-900 block">Two-Factor Authentication (2FA)</span>
                <span className="text-xs text-slate-500">Require an extra security layer for administrator logins.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="pt-5 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-sm font-semibold text-slate-900 block">Session Timeout (Minutes)</span>
                <span className="text-xs text-slate-500">Automatic logout duration for inactive admin sessions.</span>
              </div>
              <select
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleChange}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition w-full md:w-48 cursor-pointer"
              >
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour</option>
                <option value="120">2 Hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl shrink-0">
              <Bell size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">System Notifications</h2>
              <p className="text-xs text-slate-500">Configure real-time alerts and trigger emails.</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="pr-4">
              <span className="text-sm font-semibold text-slate-900 block">Email Alerts for New Registrations</span>
              <span className="text-xs text-slate-500">Receive an email notification whenever a new user registers.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                name="emailAlerts"
                checked={settings.emailAlerts}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;