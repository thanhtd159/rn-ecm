import * as React from "react";
import { useColorScheme } from "react-native";
import { useMMKVString } from "react-native-mmkv";

import { storage } from "@/lib/storage/local-storage";

const SELECTED_THEME = "SELECTED_THEME";

export type ColorSchemeType = "light" | "dark" | "system";

/**
 * Hook quản lý theme (persist + runtime)
 */
export function useSelectedTheme() {
  const systemTheme = useColorScheme(); // 'light' | 'dark'
  const [theme, setTheme] = useMMKVString(SELECTED_THEME, storage);

  const setSelectedTheme = React.useCallback(
    (t: ColorSchemeType) => {
      setTheme(t);
    },
    [setTheme],
  );

  const selectedTheme = (theme ?? "system") as ColorSchemeType;

  // 👉 resolve theme thực tế
  const resolvedTheme =
    selectedTheme === "system" ? (systemTheme ?? "light") : selectedTheme;

  return {
    selectedTheme,
    resolvedTheme, // dùng để apply UI nếu cần
    setSelectedTheme,
  } as const;
}

/**
 * Load theme khi app start
 * (optional – nếu bạn cần init global state)
 */
export function loadSelectedTheme() {
  const theme = storage.getString(SELECTED_THEME);

  return (theme ?? "system") as ColorSchemeType;
}
