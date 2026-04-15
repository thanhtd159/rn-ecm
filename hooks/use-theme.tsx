/** @format */

import React, { createContext, ReactNode, useContext, useState } from "react";

export const themes = {
  default: {
    colors: {
      primary: "#1CB5B4",
      lineColor: "#f9f9f9",
      background: "#ffffff",
      accent: "yellow",
      text: "#000000",
    },
    dark: false,
  },
  dark: {
    colors: {
      text: "rgba(255, 255, 255, 0.9)",
      primary: "#1CB5B4",
      accent: "yellow",
      lineColor: "#383A46",
      background: "#222229",
    },
    dark: true,
  },
};

type Theme = typeof themes.default;

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(themes.default);

  const toggleTheme = () => {
    setTheme((prev) => (prev.dark ? themes.default : themes.dark));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

// cach dung
// const { theme } = useTheme();
// const { text, background } = theme.colors;
