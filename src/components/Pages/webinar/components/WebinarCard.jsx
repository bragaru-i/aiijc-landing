import {h, Fragment} from "preact";
import {useState} from "preact/hooks";
import {useTranslation} from "react-i18next";
import cn from "classnames";

import {Icon, useWindowSize} from "../../../../common";
import * as utils from "../../../../common/utils";

import s from "./WebinarCard.module.scss";

const SpeakerCard = ({data}) => {
  const {t} = useTranslation();
  return (
    <div className={s.speaker}>
      <div className={s.speaker__avatar}>
        <img
          src={data.photo || "/static/dist/aiijc/images/avatar_example.png"}
        />
      </div>
      <div className={s.speaker__details}>
        <div className={s.speaker__details__info}>
          {t("Webinar.speaker")}
          {/*Speaker star disabled

          <div className={s.speaker__details__ico}>
            <Icon name='rating-star' width='10px' />
          </div> */}
        </div>
        <div className={s.speaker__details__name}>{utils.truncate(data.full_name,20)}</div>
      </div>
    </div>
  );
};
const dropDownIsDisabled = (width, nr) => {
  if (width < 768 && nr < 2) return true;
  if (width >= 768 && nr < 3) return true;
  return false;
};

const WebinarCard = ({
  data: {name, about, language_tip, url, track, date, speakers},
}) => {
  const [showSpeakers, setShowSpeakers] = useState(false);
  const width = useWindowSize();

  const {t} = useTranslation();

  return (
    <div className={cn(s.wrapper, {[s.extended]: !(!!language_tip && language_tip.length>0) })}>
      <div className={s.container}>
        <div className={s.time}>
          <div className={s.time__date}>{utils.formatDateToStr(date)}</div>
          <div className={s.time__hour}>
            {utils.formatHoursMinutesMoscow(date)} {t("Webinar.msk")}
          </div>
        </div>
        <div className={s.track_name}>{track}</div>
        <a href={url} target='_blank' rel='noopener noreferrer' className={s.title}>{utils.truncate(name, 80)}</a>
        <div className={s.desc}>{utils.truncate(about, 500)}</div>
        {!!speakers && speakers.length > 0 &&
          (<>
            <div className={cn(s.speakersCards, {[s.speakersCardsDisabled]: !showSpeakers, })}>
              {speakers.map((el) => (<SpeakerCard data={el} key={el.name} />))}
            </div>
          </>
          )}
        <div className={s.showAll} onClick={() => setShowSpeakers(() => !showSpeakers)}>
          {!showSpeakers ?
            (<span className={cn({[s.disabled]: dropDownIsDisabled(width, speakers.length), })}>
              {t("buttons.showAll")}
              <Icon className={s.chevron} name='chevron-right' width='10px' fill='unset' />
            </span>
            ) : (
              <div>
                <span className={cn({[s.disabled]: dropDownIsDisabled(width, speakers.length), })} >
                  {t("buttons.hideAll")}
                  <Icon className={s.chevron} name='chevron-right' width='10px' fill='unset' style={{transform: "rotate(-90deg)"}} />
                </span>
              </div>
            )}
        </div>

        {!!language_tip && (
          <div className={s.lang}>
            <div className={s.lang__header}>{t("Learning.lang")}</div>
            <div className={s.lang__body}>{language_tip}</div>
          </div>
        )}
      </div>
      <div className={s.cta}>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          {t("Webinar.goToWebinar")}
        </a>
      </div>
    </div>
  );
};

export default WebinarCard;
