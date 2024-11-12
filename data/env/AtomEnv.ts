import { Language } from '@/data/env/Language';
import { Theme } from '@/data/env/Theme';

export interface AtomEnv {
    theme: Theme;
    language: keyof typeof Language;
    transparency: boolean;
    menu: boolean;
}
