import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  theme: "dark" | "light" | "system";
  fontSize: number;
  fontLigatures: boolean;
  setTheme: (theme: "dark" | "light" | "system") => void;
  toggleLigatures: () => void;
  setFontSize: (size: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "dark",
      fontSize: 14,
      fontLigatures: true,
      setTheme: (theme) => set({ theme }),
      toggleLigatures: () =>
        set((state) => ({ fontLigatures: !state.fontLigatures })),
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: "devspace-settings", // This saves it to localStorage automatically
    },
  ),
);
