import {h, Fragment} from "preact";
import {useEffect} from "preact/hooks";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import {connect} from "redux-zero/preact";
import Helmet from "preact-helmet";
import {useTranslation} from "react-i18next";


import Header from "../main/sections/Header";
import Footer from "../main/sections/Footer";
import {LearningHeading} from "./components/LearningHeading";
import LearnCardsList from "./components/LearnCardsList";

import actions from "../../../store/actions";

import "./LearningPage.scss";

const Learning = ({setLanguage, setCourseType, user}) => {
  const history = useHistory();
  const {t} = useTranslation();



  useEffect(() => {
    if (!user) return history.push('/')
    // todo: better category checking!!!!push from slash to a category
    const learningCats = history.location.pathname.split("/learning/");
    if (learningCats[learningCats.length - 1] === "") {
      const lang = localStorage.getItem("langId") || 0;
      return history.push(`/learning/language/${lang}?content_format=all`);
    }
  }, []);

  return (
    <>
      <Helmet title={t('Header.nav.learning')} />
      <Header />
      <main>
        <section className='container-common'>
          <LearningHeading />
          <Switch>
            <Route exact path='/learning/language/:langId'>
              <LearnCardsList user={user} />
            </Route>
            <Redirect to="/learning/language/0" />
          </Switch>
        </section>
      </main>
      <Footer />
    </>
  );
};

const mapToProps = ({user}) => ({user});

export const LearningPage = connect(mapToProps, actions)(Learning);
