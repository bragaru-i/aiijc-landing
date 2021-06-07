import {h} from 'preact';
import Audience from './Audience';
import Stages from './Stages';
import Contest from './Contest';
import Nav from './Nav';
import Questions from './Questions';
import Partners from './Partners';
import Footer from './Footer';
import Header from '../../Pages/main/sections/Header'
import s from './style.module.css';
import {connect} from "redux-zero/preact";
import actions from "../../../store/actions";

const LandingPage = ({user}) => {
    return (
        <div className={s.landing}>
            {user ? <Header className={s.header}/> : <Nav/>}
            <Contest/>
            <Audience/>
            <Stages/>
            <Questions/>
            <Partners/>
            <Footer/>
        </div>
    );
};

const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(LandingPage);