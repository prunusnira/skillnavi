'use client';

import { useRouter } from '@/i18n/routing';

interface Props {
    text: string;
    path: string;
    className?: string;
}

const AnchorText = ({ text, path, className }: Props) => {
    const router = useRouter();
    return (
        <div
            className={className}
            onClick={() => router.push(path)}
        >
            {text}
        </div>
    );
};

export default AnchorText;
