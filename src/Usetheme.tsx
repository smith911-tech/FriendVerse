import { useState, useEffect } from 'react';
export function UseTheme() {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('ThemeMode');
        return storedTheme === 'true';
    });

    const handleChangeTheme = () => {
        setTheme((prevTheme) => !prevTheme);
    };

    useEffect(() => {
        localStorage.setItem('ThemeMode', String(theme));
    }, [theme]);

    return { theme, handleChangeTheme };
};