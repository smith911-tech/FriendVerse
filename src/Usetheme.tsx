// themeStore.js
import create from 'zustand';

const UseThemeStore = create((set) => ({
    theme: localStorage.getItem('themeMode') === 'true' || false,
    toggleTheme: () => set((state : any) => {
        const newTheme = !state.theme;
        localStorage.setItem('thememode', newTheme.toString());
        return { theme: newTheme };
    }),
}));

export default UseThemeStore;
