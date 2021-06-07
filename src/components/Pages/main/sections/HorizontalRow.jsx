import {h, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';
import actions from '../../../../store/actions';
import {useTranslation} from 'react-i18next';
import cn from 'classnames';
import './HorizontalRow.scss';

const HorizontalRow = ({user}) => {
    const {t} = useTranslation();
    return (
        <>
            <div
                className={cn('horizontal-row', {
                    userActivated: user.is_active,
                })}
            >
                <div className="container">
                    <div className="headline">
                        {t('HorizontalRow')}
                    </div>
                </div>
            </div>
        </>
    );
};

const mapToProps = ({user}) => ({user});
export default connect(mapToProps, actions)(HorizontalRow);
