import Card from '@/common/card/Card';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    title?: string;
}

export const Error = ({ title, children }: Props) => {
    return <Card title={title}>{children}</Card>;
};
