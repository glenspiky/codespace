"use client";

import { useState } from "react";
import { createProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { Layers, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewProjectPage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    try {
      await createProject({ name });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto pt-10">
      <Link
        href="/projects"
        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-medium">Back to Projects</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/10 bg-[#0a0a0f] p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center">
            <Layers className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Initialize Project
            </h1>
            <p className="text-zinc-500 text-sm">
              Create a dedicated workspace for your snippets.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
              Project Name
            </label>
            <input
              autoFocus
              type="text"
              placeholder="e.g., Nexora Security Audit"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-zinc-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
              Description (Optional)
            </label>
            <textarea
              placeholder="Define the scope of this workspace..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-zinc-700 resize-none"
            />
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Button
              type="submit"
              disabled={loading || !name}
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white h-14 rounded-2xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles size={18} />
                  Deploy Workspace
                </span>
              )}
            </Button>
            <Link href="/projects" className="flex-1">
              <Button
                type="button"
                variant="outline"
                className="w-full h-14 border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white rounded-2xl"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </motion.div>

      {/* Deployment Note */}
      <p className="text-center text-zinc-600 text-[11px] mt-6 font-mono uppercase tracking-tighter">
        Provisioning local MongoDB instance... Ready for deployment.
      </p>
    </div>
  );
}
