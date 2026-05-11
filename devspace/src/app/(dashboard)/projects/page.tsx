import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  FolderPlus,
  Layers,
  ArrowRight,
  MoreHorizontal,
  Calendar,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProjectsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch projects and include the count of snippets in each
  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    include: {
      _count: {
        select: { snippets: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-zinc-500 mt-1">
            Organize your code into logical workspace units.
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/20">
          <FolderPlus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-white/5 bg-white/[0.01]">
          <div className="h-20 w-20 rounded-full bg-indigo-600/10 flex items-center justify-center mb-6">
            <Layers className="h-10 w-10 text-indigo-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            No active projects
          </h2>
          <p className="text-zinc-500 mt-2 mb-8 text-center max-w-sm">
            Group your security scripts and frontend components into dedicated
            project folders.
          </p>
          <Button
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5"
          >
            Initialize First Project
          </Button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0f] p-1 transition-all duration-500 hover:border-indigo-500/50 hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.3)]">
      {/* Background Decorative Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-600/10 blur-3xl group-hover:bg-indigo-600/20 transition-all duration-500" />

      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[#0a0a0f] p-7">
        <div className="flex items-start justify-between">
          <div className="space-y-5">
            {/* Project Icon & Name */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-500">
                <Layers className="h-6 w-6 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                    Active Workspace
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="line-clamp-2 max-w-md text-sm leading-relaxed text-zinc-400">
              {project.description ||
                "No project manifest provided. Documentation pending..."}
            </p>

            {/* Meta Stats */}
            <div className="flex items-center gap-5 pt-2">
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 border border-white/5">
                <Code2 className="h-3.5 w-3.5 text-indigo-400" />
                <span className="font-mono text-[11px] text-zinc-300">
                  {project._count.snippets} Snippets
                </span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <Calendar size={13} />
                <span className="text-[11px] font-medium">
                  {new Date(project.updatedAt).toLocaleDateString("en-KE", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <button className="rounded-lg p-2 text-zinc-600 hover:bg-white/5 hover:text-white transition-all">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Footer Action */}
        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
          <Link
            href={`/projects/${project.id}`}
            className="group/link flex items-center gap-2 text-sm font-bold text-white transition-all"
          >
            <span>Open Project</span>
            <ArrowRight
              size={16}
              className="text-indigo-500 transition-transform group-hover/link:translate-x-1"
            />
          </Link>
          <div className="rounded bg-zinc-900 px-2 py-1 font-mono text-[9px] font-bold tracking-tighter text-zinc-600 border border-white/5">
            UID:{project.id.slice(-8).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}