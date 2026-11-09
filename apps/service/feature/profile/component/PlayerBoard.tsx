'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
    userId: string;
    label: string;
    noImageText: string;
}

const PlayerBoard = ({ userId, label, noImageText }: Props) => {
    const [imageAvailable, setImageAvailable] = useState(true);
    const src = `https://sin.nira.one/data/board/${userId}.png`;

    return (
        <div className="relative aspect-[320/580] w-full max-w-[320px] overflow-hidden rounded-lg border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
            {imageAvailable ? (
                <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 block"
                    aria-label={label}
                >
                    <Image
                        unoptimized={true}
                        alt={label}
                        src={src}
                        fill
                        sizes="320px"
                        className="object-contain"
                        onError={() => setImageAvailable(false)}
                    />
                </a>
            ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-slate-500 dark:text-slate-300">
                    {noImageText}
                </div>
            )}
        </div>
    );
};

export default PlayerBoard;
