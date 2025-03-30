import { atom } from 'jotai';
import { UpdateUrl } from '../type/Url.atom.type';

export const atomUrl = atom<UpdateUrl[]>([]);