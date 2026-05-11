import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Code2, CheckCircle2, Settings, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ActivityItem } from "@/components/layout/dashboard/ActivityItem";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  // 1. Await params to get the ID (Required in Next.js 15+)
  const { id } = await params;

  // 2. Fetch project with its snippets and tasks using the awaited ID
  const project = await prisma.project.findUnique({
    where: { id: id },
    include: {
      snippets: true,
      tasks: true,
    },
  });

  if (!project) notFound();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">Back to Workspaces</span>
        </Link>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg border border-white/5 bg-white/5 text-zinc-400 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Project Banner - Upgraded with Glassmorphism */}
      <div className="relative overflow-hidden p-10 rounded-3xl border border-white/10 bg-[#0a0a0f]">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/10 blur-[100px]" />

        <div className="relative">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            {project.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
              System Operational
            </span>
            <span className="text-zinc-500 text-[11px] font-mono uppercase bg-white/5 px-2 py-1 rounded border border-white/5">
              UID: {project.id}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Snippets Column (Left) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="text-indigo-400 h-5 w-5" /> Attached Snippets
            </h2>
            <Link href={`/snippets/new?projectId=${project.id}`}>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                <Plus size={14} /> Add Code
              </button>
            </Link>
          </div>

          <div className="grid gap-4">
            {project.snippets.length > 0 ? (
              project.snippets.map((snippet) => (
                <ActivityItem
                  key={snippet.id}
                  title={snippet.title}
                  lang={snippet.language}
                  time="Synchronized"
                />
              ))
            ) : (
              <div className="p-20 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
                <p className="text-zinc-600 text-sm italic">
                  No snippets indexed for this project yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tasks Column (Right) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 px-2">
            <CheckCircle2 className="text-indigo-400 h-5 w-5" /> Task Manifest
          </h2>
          <div className="rounded-3xl border border-white/10 bg-[#0a0a0f] p-6 space-y-4 shadow-xl">
            {project.tasks.length > 0 ? (
              project.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 group border-b border-white/5 pb-3 last:border-0 last:pb-0"
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-indigo-600 focus:ring-indigo-600/20 transition-all cursor-pointer"
                  />
                  <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors cursor-default">
                    {task.content}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-zinc-600 text-xs py-4 text-center italic">
                No tasks active.
              </p>
            )}
            <button className="w-full py-3 rounded-xl border border-dashed border-white/10 text-zinc-500 text-[11px] font-bold uppercase tracking-tighter hover:border-indigo-500/50 hover:text-indigo-400 transition-all bg-white/5">
              + Append Task Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
