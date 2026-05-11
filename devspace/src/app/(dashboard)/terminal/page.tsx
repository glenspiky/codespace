import TerminalEmulator from "@/components/shared/TerminalEmulator";
import { Terminal as TerminalIcon, ShieldCheck, Activity } from "lucide-react";

export default function TerminalPage() {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <TerminalIcon size={20} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              System Terminal
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono">
              Session: 192.168.1.104 • Connected
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-right hidden md:block">
            <p className="text-zinc-500 text-[10px] uppercase font-bold">
              Latency
            </p>
            <p className="text-emerald-400 text-xs font-mono">12ms</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-zinc-500 text-[10px] uppercase font-bold">
              Encryption
            </p>
            <p className="text-indigo-400 text-xs font-mono">AES-256</p>
          </div>
        </div>
      </div>

      {/* The Actual Terminal */}
      <div className="flex-1 min-h-0">
        <TerminalEmulator />
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border border-white/5 rounded-xl">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-[10px] text-zinc-500">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            KERNEL STABLE
          </span>
          <span className="text-[10px] text-zinc-600 font-mono">UTF-8</span>
        </div>
        <Activity size={14} className="text-zinc-700" />
      </div>
    </div>
  );
}
