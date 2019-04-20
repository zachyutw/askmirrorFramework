import React, { createContext, useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import chroma from 'chroma-js';
const ThemeContext = createContext({});

export const ThemeProvider = (props) => {
    const cssDark = window.getComputedStyle(document.documentElement).getPropertyValue('--dark');
    const cssLight = window.getComputedStyle(document.documentElement).getPropertyValue('--light');

    const [ theme, setTheme ] = useState({ dark: cssDark, light: cssLight });
    const [ themeColors, setThemeColor ] = useState([]);

    const setCSSTheme = useCallback((colors) => {
        document.documentElement.style.setProperty('--dark', _.head(colors));
        document.documentElement.style.setProperty('--light', _.last(colors));
        colors.map((color, index) => document.documentElement.style.setProperty('--color-' + index, color));
    }, []);

    useEffect(
        () => {
            const colors = chroma
                .scale([ theme.light.replace(/[#\s]/g, ''), theme.dark.replace(/[#\s]/g, '') ])
                .colors(5);
            setCSSTheme(colors);
            setThemeColor(colors);
        },
        [ theme ]
    );

    return <ThemeContext.Provider value={{ themeColors, setTheme }}>{props.children}</ThemeContext.Provider>;
};

export const withTheme = (Componet) => (props) => {
    return (
        <ThemeProvider>
            <Componet {...props} />
        </ThemeProvider>
    );
};

export default ThemeContext;
