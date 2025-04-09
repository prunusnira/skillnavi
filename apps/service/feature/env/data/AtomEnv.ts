import { atom } from 'jotai/index';

interface AtomEnv {
    transparency: boolean;
    menu: boolean;
    option: boolean;
    currentVersion?: number;
    theme: 'light' | 'dark';
}

export const atomEnvData = atom<AtomEnv>({
    transparency: false,
    menu: false,
    option: false,
    currentVersion: undefined,
    theme: 'light',
});

export const atomEnv = atom(
    (get) => get(atomEnvData),
    (get, set, params: Partial<AtomEnv>) => {
        const prev = get(atomEnvData);
        const next = { ...prev, ...params };
        set(atomEnvData, next);
    },
);
