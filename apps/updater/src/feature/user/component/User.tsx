import { Profile } from './Profile.type';
import { IMAGE_URL } from '../../../common/constant';

interface Props {
    user: Profile;
}

const User = ({ user }: Props) => {
    const { name, titletower, title } = user;
    return (
        <section className="flex flex-col justify-center items-center">
            <div className="flex gap-[8px] justify-center items-center">
                {titletower && (
                    <img
                        alt={'user_towerimg'}
                        style={{ width: '42px', height: '42px' }}
                        src={`${IMAGE_URL}/title/${titletower}.png`}
                    />
                )}
                <div className="flex flex-col justify-center items-start">
                    <span className="text-sm font-semibold">{title}</span>
                    <span className="text-xl font-medium">{name}</span>
                </div>
            </div>
        </section>
    );
};

export default User;
