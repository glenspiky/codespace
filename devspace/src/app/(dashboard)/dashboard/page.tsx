import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { Code2, Plus, Terminal, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { StatCard } from "@/components/layout/dashboard/StatCard";
import { ActivityItem } from "@/components/layout/dashboard/ActivityItem";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch Real Data from MongoDB
  const [snippetCount, projectCount, recentSnippets] = await Promise.all([
    prisma.snippet.count({ where: { userId: session.user.id } }),
    prisma.project.count({ where: { userId: session.user.id } }),
    prisma.snippet.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            System Overview
          </h1>
          <p className="text-zinc-400 mt-1">
            Welcome back,{" "}
            <span className="text-indigo-400 font-medium">
              {session.user.name}
            </span>
            .
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/snippets/new">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/20">
              <Plus className="mr-2 h-4 w-4" /> New Snippet
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Snippets"
          value={snippetCount.toString()}
          icon={Code2}
          trend="Live"
        />
        <StatCard
          title="Active Projects"
          value={projectCount.toString()}
          icon={Zap}
          trend="Steady"
        />
        <StatCard
          title="System Health"
          value="Stable"
          icon={Terminal}
          trend="100%"
        />
        <StatCard
          title="Security Score"
          value="98"
          icon={Clock}
          trend="Optimal"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Recent Snippets
            </h2>
            <Link
              href="/snippets"
              className="text-sm text-indigo-400 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {recentSnippets.length > 0 ? (
              recentSnippets.map((snippet) => (
                <ActivityItem
                  key={snippet.id}
                  title={snippet.title}
                  lang={snippet.language}
                  time={
                    formatDistanceToNow(new Date(snippet.createdAt)) + " ago"
                  }
                />
              ))
            ) : (
              <p className="text-zinc-500 text-sm py-4">
                No snippets found. Create your first one!
              </p>
            )}
          </div>
        </div>

        <div className="md:col-span-3 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Active Projects
          </h2>
          <div className="flex flex-col gap-4 text-zinc-500 text-sm">
            {projectCount === 0
              ? "No projects active."
              : `${projectCount} Projects identified.`}
          </div>
        </div>
      </div>
    </div>
  );
}
