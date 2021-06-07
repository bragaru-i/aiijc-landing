import {connect} from 'redux-zero/preact';
import {useState, useCallback} from 'preact/hooks';
import {useHistory} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import Button from "../../../../common/Components/Button";
import actions from "../../../../store/actions";
import cn from 'classnames';
import s from "./EmptyProfileCard.module.scss";


const EmptyProfileCard = ({user, openVerificationModal}) => {
    const {t} = useTranslation();

    const history = useHistory();
    const goToEdit = () => {
        history.push('/edit')
    };

    return (
        <>
            {!user.parent_phone_confirmed ? (
                <div className={s.container}>
                    <div className={s.heading}>{t("Verification.title")}</div>
                    <div className={s.text}>
                        {t("Verification.text")}
                    </div>
                    <div className={s["cta"]}>
                        <Button className={cn("btn---profile-card", s.btnProfileCard)} onClick={openVerificationModal}>
                            {t('Verification.startVerificationBtn')}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={s.container}>
                    <div className={s.heading}>{t("Profile.emptyCardHeader")}</div>
                    <div className={s.text}>
                        {t("Profile.emptyCardText")}
                    </div>
                    <div className={s["cta"]}>
                        <Button className="btn---profile-card" onClick={goToEdit}>
                            {t("Profile.emptyCardBtn")}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(EmptyProfileCard);
