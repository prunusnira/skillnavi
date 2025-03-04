'use client';

import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const DataProvider = ({ children }: Props) => {
    return <>{children}</>;
};

export default DataProvider;
