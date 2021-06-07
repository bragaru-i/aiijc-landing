import {h, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';
import actions from '../../../../store/actions';
import {useTranslation} from 'react-i18next';
import './NotActivated.scss';
import {Link} from "react-router-dom";

const NotActivated = ({}) => {
    const {t} = useTranslation();
    return (
        <>
            <div className="container not-activated-container">
                <div className="not-activated">
                    <div className="text">
                        <h3>{t('NotActivated.titleH3')}</h3>
                        <p dangerouslySetInnerHTML={{__html: t('NotActivated.text')}}></p>
                    </div>
                    <Link to="/faq/restore-password/activate" className="btn activate">{t('NotActivated.link')}</Link>
                </div>
            </div>
        </>
    );
};

const mapToProps = ({}) => ({});
export default connect(mapToProps, actions)(NotActivated);
