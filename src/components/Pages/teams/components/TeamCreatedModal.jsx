import {connect} from 'redux-zero/preact';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import cn from 'classnames';
import Modal from "../../../../common/Modal";
import actions from '../../../../store/actions';
import s from './TeamCreatedModal.module.scss';


const TeamCreatedModal = ({isShowingTeamCreatedModal, closeTeamCreatedModal}) => {
    const {t} = useTranslation();
    return (
        <Modal header={t("teams.createdModal.header")} isShowing={isShowingTeamCreatedModal}
               onClose={closeTeamCreatedModal}>
            <div className={s.body}>
                {t("teams.createdModal.text")}
            </div>

            <Link to="/teams/search/" className={cn("btn primary", s.searchLink)}
                  onClick={closeTeamCreatedModal}>
                {t("teams.createdModal.searchLink")}
            </Link>
        </Modal>
    )
}

const mapToProps = ({isShowingTeamCreatedModal}) => ({isShowingTeamCreatedModal});

export default connect(mapToProps, actions)(TeamCreatedModal);