import {h, Component} from 'preact';
import Modal from "../../common/Modal";
import {connect} from "redux-zero/preact";
import actions from "../../store/actions";
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {useCallback} from "preact/hooks";
import {TRACKER_GOALS} from "../../constants";
import {pushAnalytics} from "../../common";


const EmailExistsModal = ({showModal, hideModal, ...props}) => {
    const {t} = useTranslation();

    const showLogin = useCallback(() => {
        showModal('login');
        pushAnalytics(TRACKER_GOALS.OPEN_LOGIN_MODAL);
    }, [showModal]);

    return (
        <Modal header={t('SignUp.EmailExistsModal.header')} className="email_exists-modal" {...props}>
            <p className="help-text">
                {t('SignUp.EmailExistsModal.helpText')}
            </p>
            <div className="modal-actions">
                <button type="submit" className="btn primary btn-block" onClick={showLogin}>
                    {t('buttons.toLogIn')}</button>
                <Link to={'/faq/restore-password/restore'} onClick={hideModal} className="btn primary-outline">
                    {t('Form.LinkRestorePassword')}</Link>
            </div>
        </Modal>
    )
}

const mapToProps = ({}) => ({});
export default connect(mapToProps, actions)(EmailExistsModal);
