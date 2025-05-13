"use client";

import { useSettingsStore } from "@/lib/SettingsStore";
import { useEffect } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isLightMode } = useSettingsStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !isLightMode);
    document.documentElement.classList.toggle("light", isLightMode);
  }, [isLightMode]);

  return <>{children}</>;
}
