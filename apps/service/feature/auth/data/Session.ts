export interface GoogleToken {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    id_token: string;
    expiry_date: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}
