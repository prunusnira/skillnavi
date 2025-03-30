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
                        'w-screen h-screen fixed left-0 top-0 bg-white bg-opacity-70 flex-center'
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
