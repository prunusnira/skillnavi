import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Card from '@/common/card/Card';

interface Props {
    size?: string;
}

const Loading = ({ size }: Props) => {
    return (
        <Card>
            <div
                style={{
                    width: size,
                    height: size,
                }}
            >
                <DotLottieReact
                    src={'/lottie/loading.lottie'}
                    loop
                    autoplay
                    width={size || '100%'}
                    height={size || '100%'}
                />
            </div>
        </Card>
    );
};

export default Loading;
