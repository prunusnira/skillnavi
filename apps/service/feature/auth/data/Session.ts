import type { Profile } from '@/feature/profile/data/Profile';

export interface AuthSession {
    authenticated: boolean;
    profile: Pick<Profile, 'id'> | null;
}
