'use client';

import ClientProvider from '@/module/wrapper/clientProvider';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const Wrappers = ({ children }: Props) => {
    return <ClientProvider>{children}</ClientProvider>;
};

export default Wrappers;
