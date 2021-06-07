import {h} from "preact";
import cn from "classnames";
import {useTranslation} from "react-i18next";

import {Icon} from "../../../../common/";
import {truncate} from "../../../../common/utils";

import s from "./LearnCard.module.scss";
import {useWindowSize} from '../../../../common/useWidth'

const LearnCard = ({data}) => {
  const {
    content_format,
    name,
    about,
    author,
    content_level,
    cost,
    age,
    url
  } = data;
  const {t} = useTranslation();

  const freeCheck = !cost ? t("Learning.cost.noCost"): `${cost}`;
  let tags = [t(`Learning.level.${content_level}`), freeCheck];
  if (!!age) tags = [...tags, age]

  return (
    <div className={s.container}>
      <div className={cn(s.title, s[`title--${content_format}`])}>
        <div className={cn(s.title__cat, s[`title__cat--${content_format}`])}>
          {t(`Learning.types.${content_format}`)}
        </div>
        <div className={cn(s.title__text, s[`title__text--${content_format}`])}>
          {truncate(author, 80)}
        </div>
        <div className='spacer' />
        <div className={s.title__ico}>
          <Icon name={content_format} width='48px' />
        </div>
      </div>
      <div className={cn(s.body, s[`body--${content_format}`])}>
        <a href={url} target='_blank' rel='noopener noreferrer'  className={s.body__heading}>{truncate(name, 100)}</a>
        <div className={s.body__msg}>{truncate(about, 300)}</div>
        <div className={s.body__tags}>
          {tags && tags.length > 0 && tags.map((el, i) => (
            <span key={el + i} className={s.body__tag}>
              {el}
            </span>
          ))}
        </div>
      </div>
      <a href={url} target='_blank' rel='noopener noreferrer' className={cn(s.mobCta, s[`mobCta--${content_format}`])}>
        <span className={s.mobCta__text}>{t("buttons.getKnown")}</span>
        <span className={s.mobCta__ico}>
          <Icon name='chevron-right' width='6px' />
        </span>
      </a>
    </div>
  );
};

export default LearnCard;
