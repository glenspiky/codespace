"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import Image from "next/image";
import background from "../../../../public/images/background.png"
import Navbar from "@/components/layout/navbar/Navbar";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
    setIsLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 font-sans overflow-hidden">
      <Navbar></Navbar>
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={background}
          alt="Background"
          fill
          className="object-cover transition-opacity duration-1000"
          priority
        />
        {/* Dark Overlay to ensure readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Background Radial Glow (Kept for extra depth) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Auth Card */}
      <div className="relative z-20 w-full max-w-[420px] rounded-[32px] border border-white/10 bg-zinc-900/40 p-10 backdrop-blur-2xl shadow-2xl">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(79,70,229,0.4)]">
            <span className="text-3xl font-bold text-white">D</span>
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            DevSpace AI
          </h1>
          <p className="text-zinc-300 mt-2 text-sm text-center font-light leading-relaxed">
            Your secure gateway to <br /> Next-Gen Development
          </p>
        </div>

        {/* GitHub Primary Button */}
        <div className="space-y-6">
          <button
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="group relative flex w-full items-center justify-center gap-3 px-4 py-4 text-sm font-bold text-white transition-all bg-white/10 hover:bg-white/20 active:scale-[0.98] disabled:opacity-50 border border-white/10 rounded-xl"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {isLoading ? "Authenticating..." : "Continue with GitHub"}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-25 border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
              <span className="bg-transparent px-4 text-zinc-400 font-medium">
                OAuth 2.0 Secure
              </span>
              <div className="absolute inset-y-0 right-0 flex items-center ">
                <div className="w-25 border-t border-white/10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-[11px] text-zinc-400/80 leading-relaxed">
            By signing in, you grant access to your public profile <br />
            and email address.
          </p>
        </div>
      </div>
    </div>
  );
}
