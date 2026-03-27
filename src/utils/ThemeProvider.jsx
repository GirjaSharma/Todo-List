import { createContext, useState, useContext,useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevMode)=> prevMode === 'light' ? 'dark' : 'light');
    };

    useEffect(() =>{
document.documentElement.setAttribute('data-theme', theme);
localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};


