import {useHistory} from 'react-router-dom'
import shortid from 'shortid'
import {connect} from 'redux-zero/preact'
import {Icon} from '../../../../common/icons/'
import actions from "../../../../store/actions";
import Avatar from './Avatar';
import dayjs from "dayjs";
import {getSocialByProvider} from '../../../../common';
import {useTranslation} from "react-i18next";
import s from './ProfileCard.module.scss';


const ProfileCard = ({screen, user}) => {
    const {t} = useTranslation();
    const history = useHistory();
    const goTo = address => history.push(`/${address}`);

    const isMobile = !!screen && screen.width < 668;


    const country = user.address_set?.[0]?.country?.name || '';
    const city = user.address_set?.[0]?.city.name || '';

    const BioDetails = () => (
        <div className={s["user-bio"]}>
            {user.birth && (
                <div className={s["user-bio-rowWrapper"]}>
                    <div className={s["user-bio__type"]}>{t("Profile.birth")}:</div>
                    <div className={s["user-bio__content"]}>
                        {dayjs(user.birth).format('D MMMM YYYY')}
                    </div>
                </div>
            )}

            {(country || city) && (
                <div className={s["user-bio-rowWrapper"]}>
                    <div className={s["user-bio__type"]}>{t("Profile.address")}:</div>
                    <div className={s["user-bio__content"]}>
                        {[country, city].join(', ')}
                    </div>
                </div>
            )}

            {/*<div className={s["user-bio-rowWrapper"]}>*/}
            {/*    <div className={s["user-bio__type"]}>Школа:</div>*/}
            {/*    <div className={s["user-bio__content"]}>№479, Россия, Санкт-Петербург</div>*/}
            {/*</div>*/}

            {/*<div className={s["user-bio-rowWrapper"]}>*/}
            {/*    <div className={s["user-bio__type"]}>Класс:</div>*/}
            {/*    <div className={s["user-bio__content"]}>9Б</div>*/}
            {/*</div>*/}

            {user.userextra?.about && (
                <div className={s["user-bio-rowWrapper"]}>
                    <div className={s["user-bio__content"]}>
                        <div className={s["user-bio__type"]}>{t("Profile.about")}:</div>
                        {user.userextra?.about}
                    </div>
                </div>
            )}
        </div>
    );

    const NavButtons = () => (
        <div className={s["edit-buttons"]}>
            <div className={s.button} onClick={() => goTo('edit')}>
                <Icon name="edit-pen" className={s.ico} width={isMobile ? "13.33px" : "16px"}/>
                <span>{t("Profile.edit")}</span>
            </div>
            <div className={s.button} onClick={() => goTo('settings')}>
                <Icon name="settings" className={s.ico} width={isMobile ? "16.67px" : "20px"}/>
                <span>{t("Profile.settings")}</span>
            </div>
        </div>
    );

    const SocialLinks = () => {
        if (!user.userlink_set) {
            return null;
        }

        return (
            <div className={s["social-links"]}>
                {user.userlink_set.map(({external_app_name, url}) => {
                    const social = getSocialByProvider(external_app_name);
                    if (!social) {
                        return null;
                    }

                    return (
                        <a href={url} target="_blank">
                            <Icon name={social.iconName} className={s["social-links_ico"]}/>
                        </a>
                    );
                })}
            </div>
        );
    };

    const avatarUrl = user?.cropping ? user.cropping + '?id=' + shortid.generate() : null;

    return (
        <div className={s.container}>
            {isMobile && <NavButtons/>}
            <div className={s.body}>
                <div className={s['avatar-container']}>
                    <div className={s['avatar']}>
                        <Avatar avatarUrl={avatarUrl}/>
                        {!isMobile && <SocialLinks/>}
                    </div>

                    <div className={s["user-info"]}>
                        <div className={s.name}>
                            {(user.first_name || user.last_name) ?
                                <>{user.last_name} {user.first_name}</> :
                                t("Profile.withoutName")
                            }
                        </div>
                        {!isMobile && <NavButtons/>}
                        {!isMobile && <BioDetails/>}
                    </div>
                </div>
                {isMobile && <SocialLinks/>}
                {isMobile && <BioDetails/>}
            </div>
        </div>
    )
}

const mapToProps = ({screen, user}) => ({screen, user})

export default connect(mapToProps, actions)(ProfileCard)
