import { useState } from 'react';

const useSkillMenu = () => {
    const [
        active,
        setActive,
    ] = useState<boolean>(false);

    const toggleMenu = () => {
        setActive(!active);
    };

    return {
        active,
        toggleMenu,
    };
};

export default useSkillMenu;
