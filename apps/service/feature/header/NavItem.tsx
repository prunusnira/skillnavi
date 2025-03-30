import { cn } from '@/lib/cn';

interface Props {
    children: React.ReactNode;
}

const NavItem = ({ children }: Props) => (
    <section className={cn(['flex-center nav-item gap-[10px]'])}>
        {children}
    </section>
);

export default NavItem;
