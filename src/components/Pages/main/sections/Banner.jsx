import {h, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';
import actions from '../../../../store/actions';
import {useTranslation} from 'react-i18next';
import TaskList from '../../../Round/TaskList';
import './Banner.scss';
import {useEffect} from "preact/hooks";
import {Spinner} from "../../../../common/Components/Spinner";

const Banner = ({stageTab, rounds, getRounds, user}) => {
    const {t} = useTranslation();

    useEffect(() => getRounds(), [user]);

    const round = rounds?.[stageTab || '0'];
    const isShowingBanner = !round?.tasks?.[0] && stageTab !== '0';

    return (
        <>
            {/* <div className="container banner-container">
                <div className="banner-tabs">
                    <div className={cn('banner-tab', {active: currentTab === 1})} onClick={() => setCurrentTab(1)}>{t('Banner.Tabs.qualify')}</div>
                    <div className={cn('banner-tab', {active: currentTab === 2})} onClick={() => setCurrentTab(2)}>{t('Banner.Tabs.team')}</div>
                    <div className={cn('banner-tab', {active: currentTab === 3})} onClick={() => setCurrentTab(3)}>{t('Banner.Tabs.offline')}</div>
                </div>
            </div> */}
            {/* {currentTab === 1 && <div className="container banner-container">
                <div className="banner stage1">
                    <h2 dangerouslySetInnerHTML={{__html: t('Banner.titleH2')}}></h2>
                    <p dangerouslySetInnerHTML={{__html: t('Banner.text')}}></p>
                    <a href={t('Banner.taskDescription.href')} target="_blank" className="btn primary">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L10 13L14 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10 3L10 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <rect x="4" y="16" width="12" height="2" rx="1" fill="white" />
                        </svg>
                        <span>{t('Banner.taskDescription.linkText')}</span>
                    </a>
                </div>
            </div>} */}
            {!rounds ? <Spinner/> : (
                <>
                    {isShowingBanner ? (
                        <>
                            {stageTab === '1' && <div className="container banner-container">
                                <div className="banner stage2">
                                    <h2 dangerouslySetInnerHTML={{__html: t('Banner.titleH2Stage2')}}></h2>
                                    <p dangerouslySetInnerHTML={{__html: t('Banner.textStage2')}}></p>
                                </div>
                            </div>}
                            {stageTab === '2' && <div className="container banner-container">
                                <div className="banner stage3">
                                    <h2 dangerouslySetInnerHTML={{__html: t('Banner.titleH2Stage3')}}></h2>
                                    <p dangerouslySetInnerHTML={{__html: t('Banner.textStage3')}}></p>
                                </div>
                            </div>}
                        </>
                    ) : (
                        <TaskList round={round}/>
                    )}
                </>
            )}
        </>
    );
}

const mapToProps = ({stageTab, rounds}) => ({stageTab, rounds});
export default connect(mapToProps, actions)(Banner);
