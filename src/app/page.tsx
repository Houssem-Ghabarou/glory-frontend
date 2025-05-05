"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4 bg-theme text-theme min-h-screen transition-colors duration-500">
      <h1 className="text-3xl font-bold text-primary">Vintage {theme} mode</h1>
      <p className="mt-2">Welcome to the vintage world 🌿</p>
      <button
        className="mt-4 px-4 py-2 rounded bg-muted text-theme border"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </div>
  );
}
