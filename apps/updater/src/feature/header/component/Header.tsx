import { useQuery } from '@tanstack/react-query';
import { getAvailableVersion } from '../../version/api/getAvailableVersion';
import { atomCrawler } from '../../crawler/atom/Crawler.atom';
import { useAtom } from 'jotai';
import {
    ForceClassedButtonRounded,
    ForceClassedButtonStandard,
} from '../../../common/ForceClassedButtonStandard';

const Header = () => {
    const { data: availableVersion } = useQuery({
        queryKey: [
            'version',
            'available',
        ],
        queryFn: getAvailableVersion,
    });

    const [
        env,
        setEnv,
    ] = useAtom(atomCrawler);

    return (
        <header className="!flex !flex-col">
            {/* 상단 타이틀 */}
            <section className="!relative !flex !items-center !justify-center !mb-[20px]">
                <div className="!flex !flex-col !flex-grow !w-full !items-start">
                    <div className="!text-md !font-bold">Skill Navigator</div>
                    <div className="!text-xl !font-medium">Data Updater</div>
                </div>
                <ForceClassedButtonStandard
                    text={'CLOSE'}
                    onClick={() => window.location.reload()}
                />
            </section>

            {/* 버전 선택 메뉴 */}
            <section className="!flex !gap-[4px]">
                {availableVersion?.map((version) => (
                    <ForceClassedButtonRounded
                        text={version.full}
                        isSelected={version.id === env.version}
                        onClick={() => {
                            setEnv({ version: version.id });
                        }}
                        customClass={'!border-black !text-black'}
                    />
                ))}
            </section>
        </header>
    );
};

export default Header;
