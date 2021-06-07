import { h, Fragment } from "preact";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

import "./WebinarHeading.scss";

const WebinarHeading = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link to='/' className='back-btn back-btn--common'>
        {t("buttons.back")}
      </Link>
      <h1>{t("Header.nav.webinar")}</h1>
    </>
  );
};

export default WebinarHeading;
