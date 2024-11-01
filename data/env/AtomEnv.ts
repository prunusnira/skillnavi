import { Language } from '@/data/env/Language';
import { Theme } from '@/data/env/Theme';

export interface AtomEnv {
    theme: Theme;
    language: Language;
    transparency: boolean;
    menu: boolean;
}
