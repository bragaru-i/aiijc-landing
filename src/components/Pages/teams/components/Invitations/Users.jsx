import {useState, useCallback} from "preact/hooks";
import dayjs from "dayjs";
import cn from 'classnames';
import {Icon} from '../../../../../common';
import {useTranslation} from "react-i18next";
import s from './Users.module.scss';


const User = ({participant}) => {
    const {t} = useTranslation();
    const [detailsIsOpened, setDetailsIsOpened] = useState(false);

    const {user} = participant
    const address = [user.address_set?.[0]?.country?.name, user.address_set?.[0]?.city?.name].filter((i) => i).join(', ');
    const name = [user.first_name, user.last_name].filter((i) => i).join(' ') || user.login || '';

    const toggleDetails = useCallback(() => {
        setDetailsIsOpened((isOpened) => !isOpened);
    }, []);

    return (
        <li className={cn(s.user, {[s.detailsIsOpened]: detailsIsOpened})} onClick={toggleDetails}>
            <div className={s.top}>
                <img className={s.avatar} src={user?.cropping || "/static/dist/aiijc/images/participant-default.svg"}
                     alt={name}/>

                <div>
                    <div className={s.nameWr}>
                        <div className={s.name} title={name}>
                            {name}
                        </div>
                    </div>
                    <div className={s.address}>
                        {address || t("teams.addressDefault")}
                    </div>
                </div>

                <div className={s.right}>
                    <Icon name="chevron-bottom" className={s.chevron}/>
                </div>
            </div>

            {detailsIsOpened && (
                <div className={s.bottom}>
                    <ul className={s.detailsList}>
                        <li className={s.detailsItem}>
                            <label className={s.detailsLabel}>{t("teams.birth")}:</label>{' '}
                            <span>{user.birth ? dayjs(user.birth).format('D MMMM YYYY') : t("teams.default")}</span>
                        </li>

                        <li className={s.detailsItem}>
                            <label className={s.detailsLabel}>{t("teams.address")}:</label>{' '}
                            <span>{address || t("teams.default")}</span>
                        </li>

                        <li className={s.detailsItem}>
                            <label className={s.detailsLabel}>{t("teams.about")}:</label>{' '}
                            <span>{user.userextra?.about || t("teams.default")}</span>
                        </li>
                    </ul>
                </div>
            )}
        </li>
    );
};


const Users = ({participants}) => {
    const {t} = useTranslation();
    return (
        <ol className={s.users}>
            {participants.length > 0 ? (
                participants.map((participant) => (<User participant={participant}/>))
            ) : <span className={s.empty}>{t('teams.Invitations.emptyTeamText')}</span>}
        </ol>
    )
}

export default Users;
