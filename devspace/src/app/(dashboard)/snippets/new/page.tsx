"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createSnippet } from "@/app/actions/snippets";
import { getProjects } from "@/app/actions/projects";
import ProjectSelector from "@/components/shared/ProjectSelector";
import CodeEditor from "@/components/shared/CodeEditor";
import LanguageSelector from "@/components/shared/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // For the loading spinner

export default function NewSnippetPage() {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [projectId, setProjectId] = useState(
    searchParams.get("projectId") || "none",
  );
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [isPending, setIsPending] = useState(false); // Added loading state

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  // --- THE FIX: Create the handleSave function ---
  async function handleSave() {
    if (!title || !code) return alert("Please provide a title and code.");

    setIsPending(true);
    try {
      await createSnippet({
        title,
        code,
        language,
        // Convert "none" back to undefined so Prisma ignores it
        projectId: projectId === "none" ? undefined : projectId,
      });
      // Redirect is handled inside the server action
    } catch (error) {
      console.error("Failed to deploy:", error);
      setIsPending(false);
    }
  }

  const currentProjectName =
    projects.find((p) => p.id === projectId)?.name || "Standalone";

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between px-1">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Deploy Snippet
        </h1>
        <Button
          onClick={handleSave} // Connected the handler
          disabled={isPending} // Disable while saving
          className="bg-indigo-600 hover:bg-indigo-500 h-9 px-6 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Save Cloud"
          )}
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-row items-end gap-3 w-full">
        <div className="flex-[3] space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 ml-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Snippet name..."
            className="w-full bg-[#0a0a0f] border border-white/5 rounded-xl px-4 h-10 text-[13px] text-white outline-none focus:border-indigo-500/50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <ProjectSelector
          pname={currentProjectName}
          projects={projects}
          value={projectId}
          onChange={setProjectId}
        />

        <div className="flex-1 space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 ml-1">
            Runtime
          </label>
          <div className="   flex items-center">
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="rounded-2xl border border-white/5 bg-[#0a0a0f] overflow-hidden h-[calc(100vh-280px)] shadow-2xl">
        <CodeEditor
          onChange={(val) => setCode(val || "")}
          language={language}
        />
      </div>
    </div>
  );
}
