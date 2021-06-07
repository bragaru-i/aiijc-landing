import {h} from 'preact';
import Modal from "../../common/Modal";
import {connect} from "redux-zero/preact";
import actions from "../../store/actions";
import VerificationForm from "./VerificationForm";
import {useTranslation} from 'react-i18next';
import "./VerificationModal.scss"


const VerificationModal = ({...props}) => {
    const {t} = useTranslation();
    return (
        <Modal header={t("VerificationModal.header")} className="verification-modal" {...props}>
            <p className="help-text">
                {t("VerificationModal.helpText")}
            </p>
            <VerificationForm/>
            <p className="text-secondary">
                {t("VerificationModal.secondaryText")} <a href="mailto:support@aiijc.com">support@aiijc.com</a>
            </p>
        </Modal>
    )
}

const mapToProps = ({}) => ({});
export default connect(mapToProps, actions)(VerificationModal);
