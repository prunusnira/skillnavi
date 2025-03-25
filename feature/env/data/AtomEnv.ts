import { Language } from '@/feature/env/data/Language';
import { Theme } from '@/feature/env/data/Theme';
import { atom } from 'jotai/index';

interface AtomEnv {
    theme: Theme;
    language: keyof typeof Language;
    transparency: boolean;
    menu: boolean;
    currentVersion?: number;
}

export const atomEnvData = atom<AtomEnv>({
    theme: 'light',
    language: Language.en,
    transparency: false,
    menu: false,
    currentVersion: undefined,
});

export const atomEnv = atom(
    (get) => get(atomEnvData),
    (get, set, params: Partial<AtomEnv>) => {
        const prev = get(atomEnvData);
        const next = { ...prev, ...params };
        set(atomEnvData, next);
    },
);
