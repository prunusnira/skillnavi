import text from '../../../text/text';
import React from 'react';

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
}

const UpdaterBlock = ({ title, description, children }: Props) => {
    return (
        <section className="flex flex-col justify-center items-center">
            <div className="text-sm font-bold mb-[10px]">{title}</div>
            <div className="text-sm font-medium mb-[10px]">{description}</div>
            <div className="flex">
                {children}
            </div>
        </section>
    );
};

export default UpdaterBlock;