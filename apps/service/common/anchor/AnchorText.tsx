'use client';

import { useRouter } from '@/i18n/routing';
import { cn } from '@/lib/cn';

interface Props {
    text: string;
    path: string;
    className?: string;
}

const AnchorText = ({ text, path, className }: Props) => {
    const router = useRouter();

    return (
        <div
            className={cn('cursor-pointer', className)}
            onClick={() => router.push(path)}
        >
            {text}
        </div>
    );
};

export default AnchorText;
