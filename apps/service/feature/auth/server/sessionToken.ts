export const APP_SESSION_COOKIE = 'sinid';
export const APP_SESSION_MAX_AGE = 60 * 60 * 24 * 30;

const encoder = new TextEncoder();

const getSigningKey = async () => {
    const secret = process.env.GOOGLE_SECRET;
    if (!secret) {
        throw new Error('GOOGLE_SECRET is not configured');
    }

    return globalThis.crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify'],
    );
};

const encodeBase64Url = (bytes: Uint8Array) => {
    let binary = '';
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });

    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '');
};

const decodeBase64Url = (value: string) => {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const binary = atob(padded);

    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

export const createSessionCookieValue = async (token: string) => {
    const expiresAt = Math.floor(Date.now() / 1000) + APP_SESSION_MAX_AGE;
    const payload = encodeBase64Url(
        encoder.encode(JSON.stringify({ token, expiresAt })),
    );
    const signature = await globalThis.crypto.subtle.sign(
        'HMAC',
        await getSigningKey(),
        encoder.encode(payload),
    );

    return {
        value: `${payload}.${encodeBase64Url(new Uint8Array(signature))}`,
        expiresAt,
    };
};

export const getTokenFromSessionCookie = async (value?: string) => {
    if (!value) {
        return null;
    }

    try {
        const [payload, encodedSignature, ...extraParts] = value.split('.');
        if (!payload || !encodedSignature || extraParts.length > 0) {
            return null;
        }

        const isValid = await globalThis.crypto.subtle.verify(
            'HMAC',
            await getSigningKey(),
            decodeBase64Url(encodedSignature),
            encoder.encode(payload),
        );
        if (!isValid) {
            return null;
        }

        const session = JSON.parse(
            new TextDecoder().decode(decodeBase64Url(payload)),
        ) as { token?: unknown; expiresAt?: unknown };

        if (
            typeof session.token !== 'string' ||
            !/^[a-f0-9]{64}$/i.test(session.token) ||
            typeof session.expiresAt !== 'number' ||
            session.expiresAt <= Math.floor(Date.now() / 1000)
        ) {
            return null;
        }

        return session.token;
    } catch {
        return null;
    }
};
