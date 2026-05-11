"use client";

import { Monitor, Moon, Sun, Type, Terminal as TerminalIcon } from "lucide-react";

export function AppearanceSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="p-6 rounded-3xl bg-[#0a0a0f] border border-white/5 space-y-8 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-tighter">
          Theme & Interface
        </h3>

        {/* Theme Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex flex-col items-center gap-2 group">
            <Moon
              size={20}
              className="text-indigo-400 group-hover:scale-110 transition-transform"
            />
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              Dark (Arch)
            </span>
          </button>
          <button className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-2 group hover:bg-white/[0.05] transition-colors">
            <Sun size={20} className="text-zinc-600" />
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              Light
            </span>
          </button>
          <button className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-2 group hover:bg-white/[0.05] transition-colors">
            <Monitor size={20} className="text-zinc-600" />
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              System
            </span>
          </button>
        </div>

        {/* Editor Preferences */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
            Editor Preferences
          </h4>

          <div className="space-y-2">
            {/* Font Toggle */}
            <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                  <Type size={14} className="text-zinc-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Font Ligatures</p>
                  <p className="text-[10px] text-zinc-600 font-mono">
                    {"=> -> != ==="}
                  </p>
                </div>
              </div>
              <div className="h-5 w-9 bg-indigo-600 rounded-full flex items-center px-1">
                <div className="h-3 w-3 bg-white rounded-full translate-x-4" />
              </div>
            </div>

            {/* Terminal Style */}
            <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                  <TerminalIcon size={14} className="text-zinc-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    Transparent Terminal
                  </p>
                  <p className="text-[10px] text-zinc-600 font-mono">
                    Enable glassmorphism effect
                  </p>
                </div>
              </div>
              <div className="h-5 w-9 bg-zinc-800 rounded-full flex items-center px-1">
                <div className="h-3 w-3 bg-zinc-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}