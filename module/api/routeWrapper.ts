import { isFetchError } from '@/data/fetch/FetchError';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
    req: NextRequest;
    work: () => Promise<NextResponse>;
}

const RouteWrapper = async ({ req, work }: Params) => {
    try {
        return work();
    } catch (e: unknown) {
        if (isFetchError(e)) {
            console.error(e.toString());
        } else {
            console.error(e);
        }
    }
};

export default RouteWrapper;
