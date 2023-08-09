// themeStore.js
import {create} from 'zustand';

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  return storedTheme === 'dark';
};

const useThemeStore = create((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () => set((state: any) => {
    const newTheme = !state.theme;
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    return { theme: newTheme };
  }),
}));
export {useThemeStore}
