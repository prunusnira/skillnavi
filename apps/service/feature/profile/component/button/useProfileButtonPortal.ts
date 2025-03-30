import { useState } from 'react';

const useProfileButtonPortal = () => {
    const [
        displayCommentPortal,
        setDisplayCommentPortal,
    ] = useState(false);

    const [
        displayOpenDataPortal,
        setDisplayOpenDataPortal,
    ] = useState(false);

    const openCommentPortal = () => {
        setDisplayCommentPortal(true);
    };

    const closeCommentPortal = () => {
        setDisplayCommentPortal(false);
    };

    const openOpenDataPortal = () => {
        setDisplayOpenDataPortal(true);
    };

    const closeOpenDataPortal = () => {
        setDisplayOpenDataPortal(false);
    };

    return {
        displayCommentPortal,
        openCommentPortal,
        closeCommentPortal,
        displayOpenDataPortal,
        openOpenDataPortal,
        closeOpenDataPortal,
    };
};

export default useProfileButtonPortal;
