"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSnippet } from "@/app/actions/snippets";
import { getProjects } from "@/app/actions/projects";
import LanguageSelector from "@/components/shared/LanguageSelector";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2, Terminal, ChevronDown } from "lucide-react";

const CodeEditor = dynamic(() => import("@/components/shared/CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-[#0a0a0f]">
      <Loader2 className="h-5 w-5 animate-spin text-zinc-600" />
    </div>
  ),
});
function NewSnippetPageContent() {
  const searchParams = useSearchParams();
  const initialProjectId = searchParams.get("projectId") || "none";

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [projectId, setProjectId] = useState(initialProjectId);

  const [projects, setProjects] = useState<
    { id: string; name: string }[]
  >([]);

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);

  async function handleSave() {
    if (!title || !code) return;

    setIsPending(true);

    try {
      await createSnippet({
        title,
        code,
        language,
        projectId: projectId === "none" ? undefined : projectId,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-4 pb-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Deploy Snippet
        </h1>

        <Button
          onClick={handleSave}
          disabled={isPending || !title || !code}
          className="bg-indigo-600 hover:bg-indigo-500 text-white h-9 px-5 rounded-lg text-sm shadow-lg shadow-indigo-600/10 transition-all active:scale-95"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Deploy"
          )}
        </Button>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 p-1">
        <div className="flex-[3] min-w-[200px]">
          <input
            type="text"
            placeholder="Snippet Title..."
            className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 h-10 text-sm text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-zinc-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex-[2] min-w-[150px] relative group">
          <div className="absolute left-3 top-2.5">
            <Terminal
              size={14}
              className="text-zinc-500 group-focus-within:text-indigo-400"
            />
          </div>

          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl pl-9 pr-8 h-10 text-xs text-zinc-300 outline-none appearance-none cursor-pointer focus:border-indigo-500/50 transition-all"
          >
            <option value="none">Standalone</option>

            {projects.map((p) => (
              <option
                key={p.id}
                value={p.id}
                className="bg-[#0a0a0f]"
              >
                {p.name}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-zinc-600 pointer-events-none" />
        </div>

        <div className="flex-1 min-w-[140px] h-10 bg-[#0a0a0f] border border-white/10 rounded-xl flex items-center px-2">
          <LanguageSelector
            value={language}
            onChange={setLanguage}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] overflow-hidden shadow-2xl h-[calc(100vh-280px)]">
        <CodeEditor
          onChange={(val) => setCode(val || "")}
          language={language}
        />
      </div>
    </motion.div>
  );
}

export default function NewSnippetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewSnippetPageContent />
    </Suspense>
  );
}