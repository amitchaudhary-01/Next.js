'use client';

import React, { useState } from 'react';
import { 
  Save, 
  Shield, 
  Bell, 
  Globe, 
  CheckCircle2
} from 'lucide-react';

const SettingsPage = (): React.JSX.Element => {
  const [saved, setSaved] = useState<boolean>(false);
  const [settings, setSettings] = useState({
    siteName: 'Veedoo Admin',
    adminEmail: 'admin@veedoo.com',
    maintenanceMode: false,
    emailAlerts: true,
    twoFactorAuth: true,
    sessionTimeout: '30',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 text-slate-100 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage system preferences, security controls, and application settings.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl font-medium transition shadow-lg shadow-orange-900/20 cursor-pointer"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      {/* Success Notification Banner */}
      {saved && (
        <div className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl">
          <CheckCircle2 size={20} />
          <span className="text-sm font-medium">Settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-2 bg-orange-600/10 text-orange-500 rounded-lg">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">General Configuration</h2>
              <p className="text-xs text-slate-400">Basic details about your Veedoo platform instance.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Administrator Email
              </label>
              <input
                type="email"
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/60">
            <div>
              <span className="text-sm font-medium text-white block">Maintenance Mode</span>
              <span className="text-xs text-slate-400">Temporarily disable public access for system upgrades.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>

        {/* Security & Access Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-2 bg-orange-600/10 text-orange-500 rounded-lg">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Security & Access</h2>
              <p className="text-xs text-slate-400">Manage guard policies, authentication, and security parameters.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-white block">Two-Factor Authentication (2FA)</span>
                <span className="text-xs text-slate-400">Require an extra security layer for administrator logins.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-sm font-medium text-white block">Session Timeout (Minutes)</span>
                <span className="text-xs text-slate-400">Automatic logout duration for inactive admin sessions.</span>
              </div>
              <select
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleChange}
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-orange-500 transition w-full md:w-48 cursor-pointer"
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
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-2 bg-orange-600/10 text-orange-500 rounded-lg">
              <Bell size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">System Notifications</h2>
              <p className="text-xs text-slate-400">Configure real-time alerts and trigger emails.</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-white block">Email Alerts for New Registrations</span>
              <span className="text-xs text-slate-400">Receive an email notification whenever a new user registers.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="emailAlerts"
                checked={settings.emailAlerts}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;