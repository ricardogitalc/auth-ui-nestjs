"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { PiMonitorDuotone, PiSunDuotone, PiMoonDuotone } from "react-icons/pi";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [position, setPosition] = useState("left");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "light") setPosition("left");
    if (theme === "dark") setPosition("center");
    if (theme === "system") setPosition("right");
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-between w-[6.4rem] h-[2.4rem] rounded-full bg-muted p-1 backdrop-blur-sm overflow-hidden">
      {/* Background animado */}
      <div
        className={`absolute w-8 h-8 rounded-full bg-card transition-transform duration-100 ease-out shadow-sm ${
          position === "left" ? "translate-x-0" : ""
        } ${position === "center" ? "translate-x-[1.95rem]" : ""} ${
          position === "right" ? "translate-x-[3.9rem]" : ""
        }`}
      ></div>

      {/* Botões */}
      <button
        onClick={() => setTheme("light")}
        aria-label="Light mode"
        className={`w-8 h-8 flex items-center justify-center relative z-10 hover:text-foreground ${
          theme === "light" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <PiSunDuotone className="h-[1.2rem] w-[1.2rem]" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        aria-label="Dark mode"
        className={`w-8 h-8 flex items-center justify-center relative z-10 hover:text-foreground ${
          theme === "dark" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <PiMoonDuotone className="h-[1.2rem] w-[1.2rem]" />
      </button>

      <button
        onClick={() => setTheme("system")}
        aria-label="System theme"
        className={`w-8 h-8 flex items-center justify-center relative z-10 hover:text-foreground ${
          theme === "system" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <PiMonitorDuotone className="h-[1.2rem] w-[1.2rem]" />
      </button>
    </div>
  );
}
