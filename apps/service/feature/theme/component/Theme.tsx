'use client';

import useTheme from '@/feature/header/option/useTheme';
import { useEffect } from 'react';

const Theme = () => {
    const { loadTheme } = useTheme();
    useEffect(() => {
        loadTheme();
    }, []);
    return null;
};

export default Theme;