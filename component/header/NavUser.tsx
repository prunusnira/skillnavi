import { useSession } from 'next-auth/react';

const NavUser = () => {
    const { data: session } = useSession();

    if (session) {
        return <div></div>;
    }

    return <div></div>;
};

export default NavUser;
