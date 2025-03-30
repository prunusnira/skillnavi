import crawlProfile from '../../../crawl/crawlProfile';
import crawlTargetQuick from '../../../crawl/crawlTargetQuick';
import crawlAllSong from '../../../crawl/crawlAllSong';
import crawlTarget from '../../../crawl/crawlTarget';
import crawlFavo from '../../../crawl/crawlFavo';
import crawlBoard from '../../../crawl/crawlBoard';
import { useAtom } from 'jotai';
import { atomCrawler } from '../atom/Crawler.atom';

const useCrawerRunner = () => {
    const [env, setEnv] = useAtom(atomCrawler);
    const { version, delay, user } = env;

    const setCurrent = (text: string) => {
        setEnv({ current: text });
    };

    const setBtnDisabled = (inactive: boolean) => {
        setEnv({ btnDisabled: inactive });
    };

    const crawlRunner = async (type: number) => {
        if (version === undefined || user === undefined) {
            alert('Can not run updater due to no user data specified')
            return;
        }

        switch (type) {
            case 0:
                crawlProfile({ version, setCurrent, setBtnDisabled });
                break;

            // quick target update
            case 10:
                crawlTargetQuick({ gtype: 'all', delay, version, setCurrent, setBtnDisabled });
                break;
            case 11:
                crawlTargetQuick({ gtype: 'gf', delay, version, setCurrent, setBtnDisabled });
                break;
            case 12:
                crawlTargetQuick({ gtype: 'dm', delay, version, setCurrent, setBtnDisabled });
                break;

            // all song update
            case 20:
                crawlAllSong({
                    gtype: 'all',
                    delay,
                    isSelective: false,
                    category: [],
                    version,
                    setCurrent,
                    setBtnDisabled,
                });
                break;
            case 21:
                crawlAllSong({
                    gtype: 'gf',
                    delay,
                    isSelective: false,
                    category: [],
                    version,
                    setCurrent,
                    setBtnDisabled,
                });
                break;
            case 22:
                crawlAllSong({
                    gtype: 'dm',
                    delay,
                    isSelective: false,
                    category: [],
                    version,
                    setCurrent,
                    setBtnDisabled,
                });
                break;

            // target song update
            case 30:
                crawlTarget({ gtype: 'all', delay, version, setCurrent, setBtnDisabled });
                break;
            case 31:
                crawlTarget({ gtype: 'gf', delay, version, setCurrent, setBtnDisabled });
                break;
            case 32:
                crawlTarget({ gtype: 'dm', delay, version, setCurrent, setBtnDisabled });
                break;

            // favo update
            case 401:
                crawlFavo({ page: 1, gtype: 'all', delay, setCurrent, setBtnDisabled });
                break;
            case 411:
                crawlFavo({ page: 1, gtype: 'gf', delay, setCurrent, setBtnDisabled });
                break;
            case 421:
                crawlFavo({ page: 1, gtype: 'dm', delay, setCurrent, setBtnDisabled });
                break;
            case 402:
                crawlFavo({ page: 2, gtype: 'all', delay, setCurrent, setBtnDisabled });
                break;
            case 412:
                crawlFavo({ page: 2, gtype: 'gf', delay, setCurrent, setBtnDisabled });
                break;
            case 422:
                crawlFavo({ page: 2, gtype: 'dm', delay, setCurrent, setBtnDisabled });
                break;
            case 403:
                crawlFavo({ page: 3, gtype: 'all', delay, setCurrent, setBtnDisabled });
                break;
            case 413:
                crawlFavo({ page: 3, gtype: 'gf', delay, setCurrent, setBtnDisabled });
                break;
            case 423:
                crawlFavo({ page: 3, gtype: 'dm', delay, setCurrent, setBtnDisabled });
                break;

            // board update
            case 51:
                crawlBoard({ gtype: 'gf', setCurrent, setBtnDisabled });
                break;
            case 52:
                crawlBoard({ gtype: 'dm', setCurrent, setBtnDisabled });
                break;

            // wrong param
            default:
                console.log('[Skill Navigator] Wrong parameter passed');
                break;
        }

        // disable all button
        setBtnDisabled(true);
    };

    const crawlSelRunner = (type: number) => {
        if (version === undefined) return;

        var category: number[] = [];

        const checkbox = document.querySelectorAll<HTMLInputElement>('input[name="ver[]"]:checked');
        checkbox.forEach(v => {
            v.checked ? category.push(parseInt(v.value)) : console.log('');
        });

        if (type === 1) {
            crawlAllSong({
                gtype: 'gf',
                delay,
                isSelective: true,
                category,
                version,
                setCurrent,
                setBtnDisabled,
            });
        } else if (type === 2) {
            crawlAllSong({
                gtype: 'dm',
                delay,
                isSelective: true,
                category,
                version,
                setCurrent,
                setBtnDisabled,
            });
        }

        setBtnDisabled(true);
    };

    return {
        crawlRunner,
        crawlSelRunner,
    };
};

export default useCrawerRunner;