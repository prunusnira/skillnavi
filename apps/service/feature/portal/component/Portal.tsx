'use client';

import { createPortal } from 'react-dom';
import { PropsWithChildren, useEffect, useState } from 'react';
import Card from '@/common/card/Card';

interface Props extends PropsWithChildren {
    title: string;
}

const Portal = ({ children, title }: Props) => {
    const [
        isClient,
        setClient,
    ] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    return isClient ? (
        <>
            {createPortal(
                <div
                    className={
                        'fixed left-0 top-0 z-50 h-screen w-screen overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm flex-center'
                    }
                >
                    <Card title={title}>{children}</Card>
                </div>,
                document.getElementById('portal')!,
            )}
        </>
    ) : null;
};

export default Portal;
