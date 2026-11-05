import createMiddleware from 'next-intl/middleware';
import { locales, routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { LINK_AUTH_LOGIN } from '@/url/url';
import {
    APP_SESSION_COOKIE,
    getTokenFromSessionCookie,
} from '@/feature/auth/server/sessionToken';

const publicPagesExact = [
    '/',
    '/recent',
    '/auth/signin',
    '/crawler',
];

const publicPages = [
    '/profile',
    '/music',
    '/pattern',
    '/skill',
    '/rank/skill',
    '/rank/playcount',
];

const handleI18nRouting = createMiddleware(routing);

export const middleware = async (req: NextRequest) => {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(((${publicPagesExact
            .flatMap((p) =>
                p === '/'
                    ? [
                          '',
                          '/',
                      ]
                    : p,
            )
            .join('|')})/?$)|((${publicPages
            .flatMap((p) =>
                p === '/'
                    ? [
                          '',
                          '/',
                      ]
                    : `${p}.*`,
            )
            .join('|')})/?))`,
        'i',
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    if (isPublicPage) {
        return handleI18nRouting(req);
    }

    const sessionToken = await getTokenFromSessionCookie(
        req.cookies.get(APP_SESSION_COOKIE)?.value,
    );
    if (!sessionToken) {
        const locale = locales.find(
            (value) =>
                req.nextUrl.pathname === `/${value}` ||
                req.nextUrl.pathname.startsWith(`/${value}/`),
        );
        const signInPath = `${locale ? `/${locale}` : ''}${LINK_AUTH_LOGIN}`;
        const signInUrl = new URL(signInPath, req.url);
        signInUrl.searchParams.set(
            'callbackUrl',
            `${req.nextUrl.pathname}${req.nextUrl.search}`,
        );
        return NextResponse.redirect(signInUrl);
    }

    return handleI18nRouting(req);
};

export const config = {
    matcher: ['/((?!api|_next|data|.*\\..*).*)'],
};
