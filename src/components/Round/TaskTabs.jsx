import {h, Fragment} from 'preact';
import cn from 'classnames';
import {useEffect} from 'preact/hooks';
import {useTranslation} from 'react-i18next';
import './TaskTabs.scss';
import {TRACKER_GOALS} from "../../constants";
import {pushAnalytics} from "../../common";

export const TaskTabs = ({currentTab, setCurrentTab, isShown, taskId}) => {
    const {t} = useTranslation();

    const tabs = [
        {
            isShown: true,
            text: t('TaskTabs.description'),
            svg: 'book-open',
            goal: TRACKER_GOALS.OPEN_TASK_DESCRIPTION,
        },
        {
            isShown: isShown,
            text: t('TaskTabs.upload'),
            svg: 'upload',
            goal: TRACKER_GOALS.OPEN_TASK_UPLOAD,
        },
        {
            isShown: true,
            text: t('TaskTabs.rating'),
            svg: 'rating',
            goal: TRACKER_GOALS.OPEN_TASK_RATING,
        },
    ];

    useEffect(() => {
        pushAnalytics(tabs[currentTab].goal);
    }, [currentTab]);

    const icons = {
        'book-open': (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.66669 2.5H6.66669C7.55074 2.5 8.39859 2.85119 9.02371 3.47631C9.64883 4.10143 10 4.94928 10 5.83333V17.5C10 16.837 9.73663 16.2011 9.26779 15.7322C8.79895 15.2634 8.16306 15 7.50002 15H1.66669V2.5Z" stroke="var(--svg-color, #000)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.3333 2.5H13.3333C12.4493 2.5 11.6014 2.85119 10.9763 3.47631C10.3512 4.10143 10 4.94928 10 5.83333V17.5C10 16.837 10.2634 16.2011 10.7322 15.7322C11.2011 15.2634 11.837 15 12.5 15H18.3333V2.5Z" stroke="var(--svg-color, #000)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),
        'upload': (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 7.00049L10 3.00049L6 7.00049" stroke="var(--svg-color, #000)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10 13.0005L10 3.00049" stroke="var(--svg-color, #000)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <rect x="4" y="16" width="12" height="2" rx="1" fill="var(--svg-color, #000)" />
            </svg>
        ),
        'rating': (
            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1" fill="white">
                    <rect y="6" width="7" height="8" rx="1" />
                </mask>
                <rect y="6" width="7" height="8" rx="1" stroke="var(--svg-color, #000)" stroke-width="4" mask="url(#path-1-inside-1)" />
                <mask id="path-2-inside-2" fill="white">
                    <rect x="5" width="7" height="14" rx="1" />
                </mask>
                <rect x="5" width="7" height="14" rx="1" stroke="var(--svg-color, #000)" stroke-width="4" mask="url(#path-2-inside-2)" />
                <mask id="path-3-inside-3" fill="white">
                    <rect x="10" y="3" width="7" height="11" rx="1" />
                </mask>
                <rect x="10" y="3" width="7" height="11" rx="1" stroke="var(--svg-color, #000)" stroke-width="4" mask="url(#path-3-inside-3)" />
            </svg>


        ),
    };

    const localSetCurrentTab = (index) => {
        localStorage.setItem('currentTaskTab:' + taskId, index);
        // console.log(index);
        setCurrentTab(index);
    };


    return (
        <>
            <div className="taskTabsWrapper container">
                <div className="task-tabs">
                    {tabs &&
                        tabs.map((tab, index) => {
                            return (
                                <>
                                    {tab.isShown && <div className={cn('task-tab', {active: currentTab === '' + index})} onClick={() => localSetCurrentTab('' + index)}>
                                        {tab.svg && icons[tab.svg]}
                                        {tab.text}
                                    </div>}
                                </>
                            );
                        })}
                </div>
            </div>
        </>
    );
};
