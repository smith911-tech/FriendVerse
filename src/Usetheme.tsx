import { useState, useEffect } from 'react';
export function UseTheme() {
    const [theme, setTheme] = useState(localStorage.getItem('ThemeMode') === 'true');
    const handleChangeTheme = () => {
        setTheme((prevTheme) => !prevTheme);
    };
    useEffect(() => {
        localStorage.setItem('ThemeMode', String(theme));
    }, [theme]);
    return { theme, handleChangeTheme };
};