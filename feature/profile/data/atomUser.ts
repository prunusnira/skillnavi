import { atom } from 'jotai';
import { Profile } from '@/feature/profile/data/Profile';

const atomUserData = atom<Profile | undefined>(undefined);

export const atomUser = atom(
    (get) => get(atomUserData),
    (get, set, params: Profile) => {
        set(atomUserData, params);
    },
);
