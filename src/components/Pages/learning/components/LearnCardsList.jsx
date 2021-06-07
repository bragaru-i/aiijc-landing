import {h, Fragment} from 'preact';
import {useCallback} from 'preact/hooks';
import cn from 'classnames';
import {useTranslation} from 'react-i18next';

import LearnCard from './LearnCard';
import {api, apiEducationSrc, useWindowSize} from '../../../../common';
import SelectTabs from '../../../../common/Components/SelectTabs';
import Paginator from '../../../../common/Components/Paginator';
import LearningNoData from './LearningNoData';

import {truncatePages} from '../../../../common/utils';

import s from './LearnCardsList.module.scss';
import useLearnCardList from './useLearnCardList';

const LearnCardsList = ({user}) => {

  const {translatedTypes,
    page, setPage,
    data,
    postsPerPage,
    onPagesPerPost,
    selectLang,
    courseType,
    selectType,
    activeLang,
    mappedLang} = useLearnCardList(user)

  const {t} = useTranslation();
  const windowWidth = useWindowSize();




  let oddArr = [];
  let evenArr = [];
  if (windowWidth >= 1024 && data.res && Array.isArray(data.res.results)) {
    data.res.results.forEach((result, i) => {
      if (i % 2 > 0) {
        oddArr.push(result);
      } else evenArr.push(result);
    });
  }

  const oddColumn = useCallback(() => {
    return (
      <div className={s.oddColumn}>
        {oddArr &&
          oddArr.length > 0 && oddArr.map((webinar) => (
            <LearnCard key={webinar.id} data={webinar} />
          ))}
      </div>
    );
  }, [oddArr]);

  const evenColumn = useCallback(() => {
    return (
      <div className={s.evenColumn}>
        {evenArr && evenArr.length > 0 &&
          evenArr.map((webinar) => (
            <LearnCard key={webinar.id} data={webinar} />
          ))}
      </div>
    );
  }, [evenArr]);

  return (
    <div>
      <div className={cn(s['nav-block'])}>
        <div className={cn(s['nav-block__heading'])}>

          <div className={cn(s['nav-block__type'])}> {t('Learning.lang')}: </div>
          <div className={cn(s['nav-block__type'])}> {t('Learning.type')} </div>
        </div>
        <div className={cn(s['nav-block__select'])}>


          <div className={cn(s['nav-block__type'])}>
            <SelectTabs isAsync values={mappedLang} onSelect={selectLang} defaultValue={activeLang} />
          </div>


          <div className={cn(s['nav-block__type'])}>
            <SelectTabs values={translatedTypes} onSelect={selectType} defaultValue={courseType} />
          </div>
        </div>
      </div>

      <div className={cn(s.container, {[s.extend]: data.res && data.res.totals > 0})}>

        {!data.isLoading &&
          data.res &&
          data.res.totals > 0 &&
          windowWidth < 1024 && 
          data.res &&
          data.res.results  && (
            data.res.results.map((course) => (
              <LearnCard key={course.id} data={course} />
            ))
          )}
        {!data.isLoading &&
          data.res &&
          data.res.totals > 0 &&
          data.res.results &&
          windowWidth > 1024 && (
            <>
              {evenColumn()}
              {oddColumn()}
            </>
          )}
      </div>
      {/* Paginator */}
      {data.res && data.res.totals > 0 && (
        <div className={s.paginator}>
          <Paginator
            isLoading={data.isLoading}
            setCurrentPage={setPage}
            currentPage={page}
            numPages={truncatePages(data.res.totals, postsPerPage)}
          />
          <div className={s.perPage}>
            <span className={s.perPageShow}> {t("Rating.filterPerPage")} </span>
            <span onClick={() => onPagesPerPost(6)}
              className={cn(s.perPageNumbers, {
                [s["perPageNumbers--active"]]: postsPerPage === 6,
              })}
            >

              6
            </span>
            <span
              onClick={() => onPagesPerPost(12)}
              className={cn(s.perPageNumbers, {
                [s["perPageNumbers--active"]]: postsPerPage === 12,
              })}
            >
              12
            </span>
            <span
              onClick={() => onPagesPerPost(24)}
              className={cn(s.perPageNumbers, {
                [s["perPageNumbers--active"]]: postsPerPage === 24,
              })}
            >

              24
            </span>
            <span
              onClick={() => onPagesPerPost(36)}
              className={cn(s.perPageNumbers, {
                [s["perPageNumbers--active"]]: postsPerPage === 36,
              })}
            >
              36
            </span>
          </div>
        </div>
      )}
      <div className={s.f_center}><LearningNoData isLoading={data.isLoading } data={data} courseId={courseType} /></div>



    </div>
  );
};


export default (LearnCardsList);
