import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';
import {Router, Switch, Route, Link} from "react-router-dom";
import ScrollToTop from './common/Components/ScrollToTop';
import MainPage from './components/Pages/main/MainPage';
import LandingPage from './components/Pages/landing/LandingPage';
import './normalize.css';
import './style.scss';
import {connect} from "redux-zero/preact";
import actions from "./store/actions";
import Helmet from "preact-helmet";


const App = () => {
  
    return (
        <Router history={history}>
            <Helmet
                titleTemplate="AIIJC | %s"
                defaultTitle="AIIJC"/>
            <ScrollToTop/>
            <Switch>
                {is500 && <Route component={ErrorPage500}/>}
                <Route exact path="/about">
                    <LandingPage/>
                </Route>
               
            </Switch>
        </Router>
    )
};

const mapToProps = ({modal, user, screen}) => ({modal, user, screen});
export default connect(mapToProps, actions)(App);
