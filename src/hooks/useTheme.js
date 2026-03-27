import {useContext} from 'react';
import {ThemeContext} from '../utils/ThemeProvider.jsx';

export const useTheme = () => useContext(ThemeContext);