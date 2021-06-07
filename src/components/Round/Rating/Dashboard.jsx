import {h, Fragment} from 'preact';
import {useState, useEffect, useRef} from 'preact/hooks';
import {connect} from 'redux-zero/preact';
import actions from '../../../store/actions';
import cn from 'classnames';
import {useTranslation} from 'react-i18next';

export const Dashboard = ({user, content, currentPage, setCurrentPage, scrollToPosition, setScrollToPosition}) => {
    const {t} = useTranslation();
    const positionRef = useRef(null);

    useEffect(() => {
        if (scrollToPosition && positionRef && positionRef.current) {
            scrollIndicateMyPosition(positionRef);
            setScrollToPosition(false);
        }
    }, [scrollToPosition, positionRef]);

    const scrollIndicateMyPosition = (ref) => {
        ref.current.scrollIntoView({behavior: 'smooth', block: 'center'});
        ref.current.classList.add('accentAnimate');
        setTimeout(() => {
            ref.current.classList.remove('accentAnimate');
        }, 4000)
    }

    const showMyPosition = (event) => {
        event.preventDefault();
        if (!content.my) return;

        if (content.my.page === currentPage) {
            scrollIndicateMyPosition(positionRef);
        } else {
            setCurrentPage(content.my.page);
            setScrollToPosition(true);
        }
    };

    return (
        <>
            {content && <div className="Dashboard">
                <div className="table">
                    <div className="tableHead">
                        {content.my && <a href="#" className="myPlaceMobile" onClick={showMyPosition}>{t('Rating.myPlaceLink')}</a>}
                        <div className="tableRow">
                            <div className="tableColumn parcipantLabel">
                                {t('Rating.participant')}
                            {content.my && <a href="#" className="myPlace" onClick={showMyPosition}>{t('Rating.myPlaceLink')}</a>}
                            </div>
                            <div className="tableColumn">{t('Rating.result')}</div>
                        </div>
                    </div>
                    <div className="tableBody">
                        {content.results && content.results.length !== 0 && content.results.map((result, index) => {
                            return (
                                <div ref={content.my && content.my.rank === result.rank ? positionRef : null} className={cn('tableRowWrapper', {accent: content.my && content.my.rank === result.rank && result.user.login === user.login})}>
                                    <div className={cn('tableRow', {accent: result.rank <= 3})}>
                                        <div className="tableColumn number"><span>{result.rank}</span></div>
                                        <div className="tableColumn login">{result.user.login}</div>
                                        <div className="tableColumn score">{result.score}</div>
                                    </div>
                                </div>
                            );
                        })}
                        {content.results && content.results.length === 0 &&
                            <div className="tableRowWrapper">
                                <div className="tableRow">
                                    <div className="tableColumn number"><span>-</span></div>
                                    <div className="tableColumn login">{t('Rating.empty')}</div>
                                    <div className="tableColumn score">&nbsp;</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>}
        </>
    );
};

const mapToProps = ({user, tasks}) => ({user, tasks});
export default connect(mapToProps, actions)(Dashboard);
