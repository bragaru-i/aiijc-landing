import {h, Fragment} from "preact";
import cn from 'classnames'
import {useTranslation} from 'react-i18next'

import {Icon} from "../../../../common";
import {Spinner} from "../../../../common/Components/Spinner";
import s from "./NoData.module.scss";


const color = (str) => {
  switch (str) {
    case "application":
      return "#FE9A7A";
    case "other":
      return "#FE9A7A";
    case "video":
      return "#B24FFF";
    case "course":
      return "#41E18B";
    case "book":
      return "#FFB45D";
    case "article":
      return "#3DE0D6";
    case "game":
      return "#50D3F0";
    default:
      return "#B24FFF";
  }
};

const LearningNoData = ({isLoading, data, courseId}) => {
  const {t} = useTranslation()
  if (isLoading)
    return <div className={cn(s.container, s.centerSpinner)}>
      <div className={s.center}> <Spinner /></div>
    </div>
  return (
    <div className={cn(s.container, {[s.hidden]: !!data.res && data.res.results && data.res.results.length > 0})}>
      <div className={s.center}>
        <div className={cn(s.svg__ico, s[`svg__ico--${courseId}`])} >
          <Icon name='empty-box' width='48px' fill={color(courseId)} />
        </div>
        <span>{data.err ? data.err :t('Learning.noData')}</span>
      </div>
    </div>
  );
};

export default LearningNoData;
