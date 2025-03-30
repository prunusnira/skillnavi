import { Session } from 'next-auth';
import { sha256 } from 'js-sha256';

export const getTokenFromSession = (session: Session | null) => {
    const email = session?.user?.email;
    if (!email) {
        return undefined;
    }
    const id = email.split('@')[0];
    return sha256(id);
};
