import createMiddleware from 'next-intl/middleware';
import { locales, routing } from '@/i18n/routing';
import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';
import { authPages } from '@/module/api/auth/authPages';

const publicPages = [
    '/',
    '/auth/signin',
];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
    // authorized 콜백에서 true가 리턴되고 위의 pages에 포함되지 않은 경우에만 호출
    function onSuccess(req) {
        return handleI18nRouting(req);
    },
    {
        callbacks: {
            authorized: ({ token }) => token !== null,
        },
        pages: authPages,
    },
);

export const middleware = (req: NextRequest) => {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages
            .flatMap((p) =>
                p === '/'
                    ? [
                          '',
                          '/',
                      ]
                    : p,
            )
            .join('|')})/?$`,
        'i',
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return handleI18nRouting(req);
    } else {
        // eslint-disable-next-line
        return (authMiddleware as any)(req);
    }
};

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
