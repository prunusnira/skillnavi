import { API_AUTH_LOGOUT } from '@/url/api';

export const logout = async () => {
    const response = await fetch(API_AUTH_LOGOUT, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to log out');
    }
};
