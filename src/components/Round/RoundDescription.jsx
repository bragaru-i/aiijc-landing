import {connect} from "redux-zero/preact";
import actions from "../../store/actions";
import {useTranslation} from "react-i18next";
import './TaskList.scss';
import './Progress.scss';

const RoundDescription = ({round}) => {
    const {t} = useTranslation();
    return (
        <>
            <div className="progress">
                <h3>{t('TaskList.progress.title')}</h3>
                <div className="info">
                    <div className="description">
                        <div className="title">{round.name}</div>
                        <p className="text"><span dangerouslySetInnerHTML={{__html: round.description}}> </span></p>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapToProps = ({}) => ({});
export default connect(mapToProps, actions)(RoundDescription);
