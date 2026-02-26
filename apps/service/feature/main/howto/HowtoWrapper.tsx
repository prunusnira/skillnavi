'use client';

import { useState } from 'react';
import { HowtoButtons } from '@/feature/main/howto/HowtoButtons';
import { HowtoCardPCChrome } from '@/feature/main/howto/HowtoCardPCChrome';
import { HowtoCardiOSSafari } from '@/feature/main/howto/HowtoCardiOSSafari';
import { HowtoCardAndroidChrome } from '@/feature/main/howto/HowtoCardAndroidChrome';

export const HowtoWrapper = () => {
    const [
        howtoState,
        setHowtoState,
    ] = useState<number>(0);

    const changeHowtoOpenState = (howtoNumber: number) => {
        setHowtoState(howtoNumber);
    };

    return (
        <>
            <HowtoButtons changeHowtoOpenState={changeHowtoOpenState} />

            {howtoState === 0 && <HowtoCardPCChrome />}
            {howtoState === 1 && <HowtoCardAndroidChrome />}
            {howtoState === 2 && <HowtoCardiOSSafari />}
        </>
    );
};
