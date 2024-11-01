'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

interface Props {
    children: ReactNode;
}

const ClientContext = createContext(false);

const ClientProvider = ({ children }: Props) => {
    const [
        isClient,
        setClient,
    ] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    return (
        <ClientContext.Provider value={isClient}>
            {children}
        </ClientContext.Provider>
    );
};

export default ClientProvider;
