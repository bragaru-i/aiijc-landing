import {h} from 'preact';
import Button from '../../../../common/Components/Button';
import s from './ProfileFull.module.scss';

const ProfileFull = () => {
    return (
        <div className={s.container}>
            <div className={s.heading}>
                Профиль <span className={s.accent}>заполнен!</span>
            </div>
            <div className={s.text}>
                Отлично! Теперь ты можешь создать свою команду,
                или вступить <br/> в одну
                из существующих
            </div>
            <div className={s.cta}>
                <Button>Создать команду</Button>
                <Button variant="secondary">Вступить в команду</Button>
            </div>
        </div>
    )
}

export default ProfileFull;
