"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

interface CodeEditorProps {
  initialValue?: string;
  language?: string;
  onChange: (value: string | undefined) => void;
}

export default function CodeEditor({
  initialValue = "// Start coding...",
  language = "typescript",
  onChange,
}: CodeEditorProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-2xl">
      <Editor
        height="400px"
        defaultLanguage={language}
        defaultValue={initialValue}
        theme="vs-dark" // You can also use 'light'
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          fontFamily: "'JetBrains Mono', monospace", // Perfect for Arch users
        }}
      />
    </div>
  );
}
