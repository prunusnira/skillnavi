import useCrawlerInit from './useCrawlerInit';
import styles from './Crawler.module.scss';
import Header from '../../header/component/Header';
import InvalidUser from '../../invalid/component/InavlidUser';
import Caution from '../../caution/component/Caution';
import User from '../../user/component/User';
import Status from '../../status/component/Status';
import Updater from '../../updater/component/Updater';

const Crawler = () => {
    const { user } = useCrawlerInit();

    return (
        <main className={styles.crawlerMain}>
            {/* 헤더 */}
            <Header />

            {/* 사용자 */}
            {!user && <InvalidUser />}
            {user && <User user={user} />}

            {/* 주의사항 */}
            <Caution />

            {/* 진행상황 */}
            <Status />

            {/* 업데이트 버튼 선택 */}
            <Updater />
        </main>
    );
};

export default Crawler;