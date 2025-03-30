import { ReactNode } from 'react';
import styles from '../Common.module.scss';

interface ItemRowProps {
    children: ReactNode;
    keepHorizontal?: boolean;
    vertical?: boolean;
}

export const ItemRow = ({ children, keepHorizontal = false, vertical = false }: ItemRowProps) => {
    return (
        <div className={`${styles.itemRow} ${keepHorizontal ? styles.keepHorizontal : ''} ${vertical ? styles.vertical : ''}`}>
            {children}
        </div>
    );
}

interface ItemColProps {
    children: ReactNode;
    size?: number;
    flatUnderLg?: boolean;
}

export const ItemCol = ({ children, size = 10, flatUnderLg = false }: ItemColProps) => {
    return (
        <div className={`${styles.itemCol} ${styles[`size${size}`]} ${flatUnderLg ? styles.flatUnderLg : ''}`}>
            {children}
        </div>
    );
}

interface ContainerProps {
    children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}

interface BodyHeaderProps {
    children: ReactNode;
}

export const BodyHeader = ({ children }: BodyHeaderProps) => {
    return (
        <div className={styles.bodyHeader}>
            {children}
        </div>
    );
}

interface BodyContentProps {
    children: ReactNode;
}

export const BodyContent = ({ children }: BodyContentProps) => {
    return (
        <div className={styles.bodyContent}>
            {children}
        </div>
    );
}

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
}

export const ButtonSm = ({ children, onClick }: ButtonProps) => {
    return (
        <button className={styles.buttonSm} onClick={onClick}>
            {children}
        </button>
    );
}

interface IconProps {
    src: string;
    alt: string;
    size?: 'sm' | 'lg';
}

export const Icon = ({ src, alt, size = 'sm' }: IconProps) => {
    return (
        <img 
            src={src} 
            alt={alt} 
            className={`${styles.icon} ${size === 'lg' ? styles.sizeLg : styles.sizeSm}`}
        />
    );
} 