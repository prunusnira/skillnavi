import { GameVersionModel } from '@/data/game/GameVersionModel';
import { NextResponse } from 'next/server';

export const GET = async () => {
    return NextResponse.json(GameVersionModel.findAll());
};
