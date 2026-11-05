import { NextResponse } from 'next/server';
import { clearSession } from '@/feature/auth/server';

export async function POST() {
    await clearSession();
    return NextResponse.json({ success: true });
}
