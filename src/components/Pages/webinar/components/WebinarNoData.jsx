import {h, Fragment} from "preact";
import {useTranslation} from "react-i18next";
import cn from 'classnames'

import {Spinner} from '../../../../common/Components/Spinner'
import {Icon} from "../../../../common";

import s from "./WebinarNoData.module.scss";

const WebinarNoData = ({isLoading, data}) => {
  const {t} = useTranslation();
  if (isLoading)
    return (
      <div className={cn(s.container, s.centerSpinner)}>
        <div className={s.center}>  <Spinner /> </div>
      </div>)

  return (
    <div className={cn(s.noData, {[s.hidden]: !!data.res && !!data.res.results && data.res.results.length > 0})}>
      <Icon name='webinar-no-data' className={s.ico} />
      <div className={s.noDataText}>{data.err ? data.err : t('Webinar.notFound')}</div>
    </div>
  );
};

export default WebinarNoData;
