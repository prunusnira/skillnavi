import { atom } from 'jotai';
import { User } from '@/data/user/User';

const atomUserData = atom<User | undefined>(undefined);

export const atomUser = atom(
    (get) => get(atomUserData),
    (
        get,
        set,
        params: {
            key: keyof User;
            value: number | undefined;
        },
    ) => {
        const prev = get(atomUserData);
        const next = { ...prev };
        const { key, value } = params;

        if (key in next && typeof value === typeof next[key]) {
            (next[key] satisfies User[typeof key]) = value;
        }
    },
);
