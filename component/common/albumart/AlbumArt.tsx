'use client';

import { ALBUM } from '@/data/url';
import { useState } from 'react';

interface Props {
    mid: number;
    className?: string;
}

const AlbumArt = ({ mid, className }: Props) => {
    const [
        src,
        setSrc,
    ] = useState(`${ALBUM}/${mid}.jpg`);
    return (
        <img
            className={className}
            alt={'albumart'}
            src={src}
            onError={() => {
                setSrc(`${ALBUM}/empty.jpg`);
            }}
        />
    );
};

export default AlbumArt;
