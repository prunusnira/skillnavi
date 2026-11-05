import { API_USER_JOIN } from '@/url/api';

export const createAccount = async () => {
    const response = await fetch(API_USER_JOIN, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to create the user account');
    }

    return response.json();
};
