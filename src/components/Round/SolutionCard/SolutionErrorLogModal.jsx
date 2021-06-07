import {h, Component} from 'preact';
import Modal from "../../../common/Modal";
import {connect} from "redux-zero/preact";
import actions from "../../../store/actions";
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import './SolutionErrorLogModal.scss';


const SolutionErrorLogModal = ({showModal, solutionErrorModalContent, hideModal, ...props}) => {
    const {t} = useTranslation();
    return (
        <Modal header={solutionErrorModalContent?.header} className="SolutionErrorLogModal" {...props}>
            <pre>
                {solutionErrorModalContent?.error_message}
            </pre>
        </Modal>
    )
}

const mapToProps = ({solutionErrorModalContent}) => ({solutionErrorModalContent});
export default connect(mapToProps, actions)(SolutionErrorLogModal);
