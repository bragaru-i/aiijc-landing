import {h, Fragment} from "preact";
import {useEffect, useState, useMemo, useCallback} from "preact/hooks";
import {useParams, useHistory} from "react-router-dom";

import cn from "classnames";
import {useTranslation} from "react-i18next";

import WebinarCard from "./WebinarCard";
import SelectTabs from "../../../../common/Components/SelectTabs";
import Paginator from "../../../../common/Components/Paginator";
import WebinarNoData from "./WebinarNoData";

import {api, apiEducationSrc, useWindowSize} from "../../../../common";
import {truncatePages} from "../../../../common/utils";
import {showError} from '../../../../common/utils'

import s from "./WebinarCardsList.module.scss";

import * as navData from "../dumbData";

const WebinarCardsList = () => {
  const [data, setData] = useState({
    isLoading: true,
    res: {},
    err: null,
  });
  const {category} = useParams();
  const [webinarCat, setWebinarCategory] = useState(category || 'nearest')
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const {t} = useTranslation();
  const history = useHistory();

  useEffect(() => {
    setWebinarCategory(category);
    setPage(1);
  }, [category]);

  useEffect(() => {
    if (webinarCat && webinarCat !== category) {
      setPage(1);
      history.push(`/webinar/${webinarCat}`);
    }
  }, [webinarCat]);

  useEffect(async () => {
    setData(() => ({res: {}, err: null, isLoading: true}))
    if (webinarCat) {
      try {
        setData(() => ({res: {}, err: null, isLoading: true}))
        const res = await api.get(
          `${apiEducationSrc}/webinar?date_type=${webinarCat}&page=${page}&page_size=${postsPerPage}`)
        setData({res});

      }
      catch (err) {
        if (!navigator.onLine) {
          showError(t('errors.offline'));
          setData(() => ({res: null, err: t('errors.offline')}))
        } else if (err.status >= 500 && err.status < 600) {

        }  else {
            showError(t('errors.unknown'));
        }
      }
      finally {
        setData((prevState) => ({...prevState, isLoading: false}))

      }
    }
  }, [webinarCat, page, postsPerPage]);

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
          oddArr.length > 0 &&
          oddArr.map((webinar) => (
            <WebinarCard key={webinar.id} data={webinar} />
          ))}
      </div>
    );
  }, [oddArr]);

  const evenColumn = useCallback(() => {
    return (
      <div className={s.evenColumn}>
        {evenArr &&
          evenArr.length > 0 &&
          evenArr.map((webinar) => (
            <WebinarCard key={webinar.id} data={webinar} />
          ))}
      </div>
    );
  }, [evenArr]);

  const translatedOptions = useMemo(() => {
    let newObj = [];
    navData.category.forEach(({value}) => {
      newObj = [...newObj, {value, label: t(`Webinar.cat.${value}`)}];
    });
    return newObj;
  }, [navData.category]);

  const onWebinarHandle = (cat) => {
    setPage(1);
    setWebinarCategory(cat)
  }

  const onPagesPerPost = nr => {
    setPage(1);
    setPostsPerPage(nr)
  }

  return (
    <div>
      {/* Navigation Tabs */}
      <div className={cn(s["nav-block"])}>
        <div className={cn(s["nav-block__heading"])}>
          <div className={cn(s["nav-block__type"])}>
            {t("Webinar.cat.category")}:
          </div>
        </div>
        <div className={cn(s["nav-block__select"])}>
          <div className={cn(s["nav-block__type"])}>
            <SelectTabs values={translatedOptions} onSelect={onWebinarHandle} defaultValue={webinarCat} />
          </div>
        </div>
      </div>
      {/* Container for Webinar Lists */}
      <div className={cn(s.container, {[s.extend]: data.res && data.res.totals > 0})}>
        {!data.isLoading &&
          data.res &&
          data.res.totals > 0 &&
          windowWidth < 1024 &&
          data.res.results && (
            data.res.results.map((webinar) => (
              <WebinarCard key={webinar.id} data={webinar} />
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
            <span
              onClick={() => onPagesPerPost(6)}
              className={cn(s.perPageNumbers, {
                [s["perPageNumbers--active"]]: postsPerPage === 6,
              })}
            >
              {" "}
              6{" "}
            </span>
            <span
              onClick={() => onPagesPerPost(12)}
              className={cn(s.perPageNumbers, {
                [s["perPageNumbers--active"]]: postsPerPage === 12,
              })}
            >
              {" "}
              12{" "}
            </span>
            <span
              onClick={() => onPagesPerPost(24)}
              className={cn(s.perPageNumbers, {
                [s["perPageNumbers--active"]]: postsPerPage === 24,
              })}
            >
              {" "}
              24{" "}
            </span>
            <span
              onClick={() => onPagesPerPost(36)}
              className={cn(s.perPageNumbers, {
                [s["perPageNumbers--active"]]: postsPerPage === 36,
              })}
            >
              {" "}
              36{" "}
            </span>
          </div>
        </div>
      )}
      <div className={s.f_center}><WebinarNoData isLoading={data.isLoading} data={data} /></div>
    </div>
  );
};
export default (WebinarCardsList);
