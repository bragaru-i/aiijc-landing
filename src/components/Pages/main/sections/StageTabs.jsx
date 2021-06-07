import {h, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';
import cn from 'classnames';
import actions from '../../../../store/actions';
import {useTranslation} from 'react-i18next';
// import './StageTabs.scss';
import SocialLinks from './SocialLinks';

const StageTabs = ({stageTab, setStageTab}) => {
    const {t} = useTranslation();
    const localSetStageTab = (index) => {
        localStorage.setItem('currentStageTab', index);
        // console.log(index);
        setStageTab(index);
    };
    return (
        <>
            <div className="container banner-container">
                <div className="banner-tabs">
                    <div className={cn('banner-tab', {active: stageTab === '0'})} onClick={() => localSetStageTab('0')}>{t('Banner.Tabs.qualify')}</div>
                    <div className={cn('banner-tab', {active: stageTab === '1'})} onClick={() => localSetStageTab('1')}>{t('Banner.Tabs.team')}</div>
                    <div className={cn('banner-tab', {active: stageTab === '2'})} onClick={() => localSetStageTab('2')}>{t('Banner.Tabs.offline')}</div>
                </div>
                <SocialLinks className="socialLinksBlock" />
            </div>
        </>
    );
};

const mapToProps = ({stageTab, setStageTab}) => ({stageTab, setStageTab});
export default connect(mapToProps, actions)(StageTabs);
