// useTheme.js
import { useState, useEffect } from 'react';

export function UseTheme() {
    const [theme, setTheme] = useState<boolean>(() => localStorage.getItem('ThemeMode') === 'true');

    const handleChangeTheme = () => {
        setTheme((prevTheme) => !prevTheme);
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'ThemeMode') {
                setTheme(event.newValue === 'true');
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('ThemeMode', String(theme));
    }, [theme]);

    return { theme, handleChangeTheme };
};

