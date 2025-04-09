import { Profile } from '../../user/component/Profile.type';

export interface CrawlerAtom {
    // 지연 시간
    delay: number;

    // 현재 진행 중인 작업
    current: string;

    // 버튼 비활성화 여부
    btnDisabled: boolean;

    // 버전 타입
    version?: number;
    latest?: number;

    // 사용자 정보
    user?: Profile;

    // 언어
    lang: string;
}