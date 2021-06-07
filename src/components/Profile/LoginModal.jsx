import {h, Component} from 'preact';
import Modal from "../../common/Modal";
import {useTranslation} from 'react-i18next';
import LoginForm from "./LoginForm";


const LoginModal = (props) => {
    const {t} = useTranslation();
    return (
        <Modal header={t('buttons.LogIn')} {...props}>
            <LoginForm setIsAuthModalShowing={hide => hide && props.onClose()} />
        </Modal>
    )
}

export default LoginModal;
