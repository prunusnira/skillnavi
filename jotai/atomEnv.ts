import {atom} from "jotai";
import {IAtomEnv, TLang, TTheme} from "@/data/env/IAtomEnv";

export const atomEnvData = atom<IAtomEnv>({
    theme: 'light',
    language: 'en',
});

export const atomEnv = atom(
    (get) => get(atomEnvData),
    (get, set, params: {type: keyof IAtomEnv; data: TLang | TTheme}) => {
        const prev = get(atomEnvData);
        const next = {...prev};
        const {type, data} = params;

        if(data in next && typeof next[type] === typeof data) {
            (next[type] satisfies IAtomEnv[typeof type]) = data;
        }
    }
)