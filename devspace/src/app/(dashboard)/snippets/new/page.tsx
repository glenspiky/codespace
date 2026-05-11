"use client";

import { useState } from "react";
import { createSnippet } from "@/app/actions/snippets";
import CodeEditor from "@/components/shared/CodeEditor";
import LanguageSelector from "@/components/shared/LanguageSelector";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NewSnippetPage() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [isPending, setIsPending] = useState(false);

  async function handleSave() {
    if (!title || !code) return alert("Please fill in all fields");

    setIsPending(true);
    try {
      await createSnippet({ title, code, language });
    } catch (error) {
      console.error(error);
      setIsPending(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          New Snippet
        </h1>
        <Button
          onClick={handleSave}
          disabled={isPending}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 rounded-xl shadow-lg shadow-indigo-600/20"
        >
          {isPending ? "Creating..." : "Deploy Snippet"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Snippet Title..."
          className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl text-white outline-none focus:border-indigo-500/50 transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <span className="text-zinc-500 text-sm font-mono">
            Environment: Production
          </span>
          <LanguageSelector value={language} onChange={setLanguage} />
        </div>

        <CodeEditor
          onChange={(val) => setCode(val || "")}
          language={language}
        />
      </div>
    </motion.div>
  );
}
