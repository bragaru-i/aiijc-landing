import {h, Component} from 'preact';
import Modal from "../../common/Modal";
import {connect} from "redux-zero/preact";
import actions from "../../store/actions";
import "./SignUpActivationModal.scss"
import ActivationForm from "./ActivationForm";
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';


const SignUpActivationModal = ({...props}) => {
    const {t} = useTranslation();
    return (
        <Modal header={t('SignUp.ActivationModal.header')} className="signup_activation-modal" {...props}>
            <p className="help-text">
                {t('SignUp.ActivationModal.helpText')}
            </p>
            <ActivationForm/>
            <p className="text-secondary">
                <span dangerouslySetInnerHTML={{__html: t('SignUp.ActivationModal.noCode')}}/>
                {' '}
                <Link to="/faq/restore-password/activate" onClick={() => props.onClose()}>FAQ</Link>, {t('SignUp.ActivationModal.noCodeSupport')} <a href="mailto:support@aiijc.com">support@aiijc.com</a></p>
        </Modal>
    )
}

const mapToProps = ({}) => ({});
export default connect(mapToProps, actions)(SignUpActivationModal);
