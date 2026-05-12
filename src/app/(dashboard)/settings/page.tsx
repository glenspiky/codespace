"use client";

import { useState } from "react";
import { User, Shield, Monitor, Key } from "lucide-react";


import { ProfileSettings } from "@/components/settings/profileSettings";

import { SecuritySettings } from "@/components/settings/securitySettings";
import { ApiSettings } from "@/components/settings/ApiSettings";
import { AppearanceSettings } from '../../../components/settings/AppearanceSettings';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Monitor },
    { id: "security", label: "Security", icon: Shield },
    { id: "api", label: "API Keys", icon: Key },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <header>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          System Settings
        </h1>
        <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest font-mono">
          Kernel v1.0.4-stable
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                  : "text-zinc-500 hover:text-zinc-300 border border-transparent"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Dynamic Component Area */}
        <main className="flex-1 min-h-[500px]">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "api" && <ApiSettings />}
        </main>
      </div>
    </div>
  );
}
