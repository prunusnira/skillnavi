import { FetchError } from '@/lib/fetch/FetchError';

export interface FetchParams {
    [key: string]: number | string | boolean | undefined;
}

interface FetchOptions extends Omit<RequestInit, 'body'> {
    params?: URLSearchParams | FetchParams;
    contentType?: string;
    // eslint-disable-next-line
    body?: BodyInit | Record<string, any>;
    customUrl?: boolean;
}

/**
 * @about fetch를 확장하여 axios처럼 사용할 수 있게 만든 유틸리티
 * @componentType utility
 */
export class FetchAdv {
    private baseUrl = '';

    constructor(option?: { url: string }) {
        this.baseUrl = option?.url ?? '';
    }

    private base = async <T>(
        url: string,
        {
            method,
            params,
            body,
            contentType,
            customUrl,
            ...options
        }: FetchOptions,
    ) => {
        let query = '';
        if (params) {
            if (params instanceof URLSearchParams) {
                query = `?${params.toString()}`;
            } else if (typeof params === 'object') {
                const map = new Map(Object.entries(params));
                const searchParams = new URLSearchParams();
                const keyArray = Array.from(map.keys());
                keyArray.forEach((k) => {
                    if (params[k]) {
                        searchParams.set(k, String(params[k]));
                    }
                });
                query = `?${searchParams.toString()}`;
            }
        }

        let data = body;
        if (
            data &&
            !(data instanceof Blob) &&
            !(data instanceof FormData) &&
            !(data instanceof URLSearchParams) &&
            typeof data === 'object'
        ) {
            data = JSON.stringify(data);
        }

        let headers: HeadersInit = { ...options.headers };
        if (headers) {
            headers = {
                ...headers,
                'Content-Type': contentType || 'application/json',
            };
        }

        const res = await fetch(
            customUrl ? `${url}${query}` : `${this.baseUrl}${url}${query}`,
            {
                ...options,
                method,
                body: data,
                credentials: 'include',
                headers: {
                    ...headers,
                    // Cookie: await getCookieForFetch(),
                },
                cache: 'no-cache',
            },
        );

        if (!res.ok) {
            throw new FetchError({ status: res.status, response: res });
        }

        return (await res.json()) as T;
    };

    public get = async <T>(url: string, options?: FetchOptions) =>
        this.base<T>(url, { method: 'GET', ...options });

    public post = async <T>(url: string, options?: FetchOptions) =>
        this.base<T>(url, { method: 'POST', ...options });

    public put = async <T>(url: string, options?: FetchOptions) =>
        this.base<T>(url, { method: 'PUT', ...options });

    public delete = async <T>(url: string, options?: FetchOptions) =>
        this.base<T>(url, { method: 'DELETE', ...options });

    public head = async <T>(url: string, options?: FetchOptions) =>
        this.base<T>(url, { method: 'HEAD', ...options });

    public option = async <T>(url: string, options?: FetchOptions) =>
        this.base<T>(url, { method: 'OPTION', ...options });
}

export const fetchAdv = new FetchAdv({
    url: `${typeof window !== 'undefined' ? `${process.env.NEXT_PUBLIC_URL_PUBLICEP}` : process.env.NEXT_PUBLIC_URL_ENDPOINT}`,
});
