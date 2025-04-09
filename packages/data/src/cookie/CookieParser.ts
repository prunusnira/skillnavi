export class CookieParser {
    private static instance: CookieParser | null = null;
    private cookieList: Record<string, string> = {};

    constructor() {
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new CookieParser();
        }
        return this.instance;
    }

    parseCookie(cookies: string) {
        if (!cookies) return null;

        cookies.split(';').forEach((cookie) => {
            const cookieKeyValue = cookie.trim().split('=');
            if (cookieKeyValue.length === 2) {
                const [key, value] = cookieKeyValue;
                if (key && value) {
                    this.cookieList[key] = value;
                }
            }
        });
    }

    getCookie(name: string) {
        if (!Object.keys(this.cookieList).includes(name)) {
            return undefined;
        }
        return this.cookieList[name];
    }
}
