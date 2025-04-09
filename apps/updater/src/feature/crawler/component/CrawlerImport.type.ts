import UrlData from '../../../crawl/data/urlData';
import { UpdateSkill } from '@skillnavi/data/src/skill/SkillData';

export interface CrawlerParams {
    page: number,
    gtype: string,
    delay: number,
    isSelective: boolean,
    category: number[],
    version: number,
    setCurrent: (s: string) => void,
    setBtnDisabled: (b: boolean) => void
}

export type CrawlerAllParams = Omit<CrawlerParams, 'page'>;

export type CrawlerProfileParams = Pick<CrawlerParams, 'version' | 'setCurrent' | 'setBtnDisabled'>;

export type CrawlerTargetParams = Pick<CrawlerParams, 'gtype' | 'delay' | 'version' | 'setCurrent' | 'setBtnDisabled'>;

export type CrawlerTargetUrl = Pick<CrawlerParams, 'gtype' | 'version' | 'setCurrent'>;

export type CrawlerFavoParams = Pick<CrawlerParams, 'page' | 'gtype' | 'delay' | 'setCurrent' | 'setBtnDisabled'>;

export type CralwerFavoUrl = Pick<CrawlerParams, 'page' | 'gtype' | 'setCurrent'>;

export type CrawlerBoardParams = Pick<CrawlerParams, 'gtype' | 'setCurrent' | 'setBtnDisabled'>;

export interface CrawlerUrlList {
    urls: UrlData[];
    delay: number;
    version: number;
    setCurrent: (s: string) => void;
    setBtnDisabled: (b: boolean) => void;
}

export interface CrawlerUrlRunner extends CrawlerUrlList {
    skillData: UpdateSkill;
    index: number;
}

export interface CrawlerUpload {
    json: string;
    type: string;
    version: number;
    setCurrent: (s: string) => void;
    setBtnDisabled: (b: boolean) => void;
}