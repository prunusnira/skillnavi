import axios from 'axios';
import onSongSuccess from './onSongSuccess';

const crawlMusic = async (
    url: string,
    setCurrent: (s: string) => void,
) => {
    const html = await axios.get(url);
    return onSongSuccess(html.data, setCurrent);
};

export default crawlMusic;