import { useStorageState } from "@/hooks/useStorageState";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance, useColorScheme } from "react-native";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  currentTheme: "light" | "dark";
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  currentTheme: "dark",
  setTheme: () => null,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme() as "light" | "dark";
  const [[, storedTheme], setStoredTheme] = useStorageState("theme");

  const [theme, setThemeState] = useState<ThemeType>(
    (storedTheme as ThemeType) || "system"
  );
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    systemColorScheme || "dark"
  );

  // Handle Appearance change (for system mode)
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === "system") {
        setCurrentTheme((colorScheme as "light" | "dark") || "dark");
      }
    });

    return () => subscription.remove();
  }, [theme]);

  // Update currentTheme based on theme selection
  useEffect(() => {
    if (theme === "light" || theme === "dark") {
      setCurrentTheme(theme);
    } else {
      setCurrentTheme(systemColorScheme || "dark");
    }
  }, [theme, systemColorScheme]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
