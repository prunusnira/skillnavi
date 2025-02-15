'use client';

import { ALBUM } from '@/data/url';
import { useState } from 'react';
import Image from 'next/image';

interface Props {
    mid: number;
    className?: string;
    size?: number;
}

const AlbumArt = ({ mid, className, size }: Props) => {
    const [
        src,
        setSrc,
    ] = useState(`${ALBUM}/${mid}.jpg`);
    return (
        <Image
            unoptimized={true}
            className={className}
            alt={'albumart'}
            src={src}
            onError={() => {
                setSrc(`${ALBUM}/empty.jpg`);
            }}
            width={size || 48}
        />
    );
};

export default AlbumArt;
