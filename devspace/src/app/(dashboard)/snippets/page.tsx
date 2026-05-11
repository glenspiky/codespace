import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Plus, Search, Code2, MoreVertical, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function SnippetsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch all snippets for the logged-in user
  const snippets = await prisma.snippet.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section with Search and Create */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Code Library
          </h1>
          <p className="text-zinc-500 mt-1">
            Manage and deploy your optimized snippets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="Search library..."
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 w-64 transition-all"
            />
          </div>
          <Link href="/snippets/new">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/20">
              <Plus className="mr-2 h-4 w-4" /> New Snippet
            </Button>
          </Link>
        </div>
      </div>

      {/* Snippet Grid */}
      {snippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 rounded-3xl border border-dashed border-white/10 bg-white/[0.02]">
          <div className="h-16 w-16 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 mb-4">
            <Terminal className="h-8 w-8 text-zinc-600" />
          </div>
          <h3 className="text-lg font-medium text-white">No snippets yet</h3>
          <p className="text-zinc-500 text-sm mb-6">
            Your collection is empty. Start by adding your first script.
          </p>
          <Link href="/snippets/new">
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 rounded-xl"
            >
              Create Snippet
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// --- Sub-component for the Individual Cards ---

function SnippetCard({ snippet }: { snippet: any }) {
  return (
    <div className="group relative flex flex-col justify-between p-6 rounded-3xl border border-white/5 bg-[#0a0a0f] hover:bg-[#0d0d14] hover:border-indigo-500/30 transition-all duration-300 shadow-xl overflow-hidden">
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute -top-24 -right-24 h-48 w-48 bg-indigo-600/5 blur-[80px] group-hover:bg-indigo-600/10 transition-all" />

      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Code2 className="h-6 w-6 text-indigo-400" />
          </div>
          <button className="text-zinc-600 hover:text-white transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
          {snippet.title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            {snippet.language}
          </span>
          <span className="text-[11px] text-zinc-600">
            {formatDistanceToNow(new Date(snippet.createdAt))} ago
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link
          href={`/snippets/${snippet.id}`}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          Open Editor
        </Link>
        <div className="h-1 w-1 rounded-full bg-zinc-800" />
        <span className="text-[10px] text-zinc-700 font-mono">
          ID: {snippet.id.slice(-6)}
        </span>
      </div>
    </div>
  );
}
