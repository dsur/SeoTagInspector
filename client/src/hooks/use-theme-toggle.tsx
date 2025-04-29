import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return the theme value only after mounted to avoid hydration mismatch
  return { 
    theme: mounted ? (theme === 'system' ? resolvedTheme : theme) : undefined,
    setTheme
  };
}
