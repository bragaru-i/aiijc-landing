import { h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Helmet from "preact-helmet";
import { connect } from "redux-zero/preact";
import {useTranslation} from 'react-i18next'


import Header from "../main/sections/Header";
import Footer from "../main/sections/Footer";
import WebinarHeading from "./components/WebinarHeading";
import WebinarCardsList from "./components/WebinarCardsList";

import actions from "../../../store/actions";

import "./WebinarPage.scss";

const Webinar = ({ setWebinarCategory, user }) => {
  const history = useHistory();
  const {t} = useTranslation();

  
  useEffect(() => {
    if (!user) {
        history.push('/');
    }
}, [user]);

  useEffect(() => {
    // todo: better category checking!!!!
    const webinarCats = history.location.pathname.split("/webinar/");
    if (webinarCats[webinarCats.length - 1] === "") {
      setWebinarCategory("nearest");
      return history.push("/webinar/nearest/");
    }
  }, []);

  return (
    <>
      <Helmet title={t('Header.nav.webinar')} />
      <Header />
      <main>
        <section className='container-common'>
          <WebinarHeading />
          <Switch>
            <Route exact path='/webinar/:category'>
              <WebinarCardsList />
            </Route>
            <Redirect to="/webinar/nearest" />
          </Switch>
        </section>
      </main>
      <Footer />
    </>
  );
};

const mapToProps = ({user}) => ({user});

export const WebinarPage = connect(mapToProps, actions)(Webinar);
