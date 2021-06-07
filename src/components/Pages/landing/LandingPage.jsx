import {h} from 'preact';
import cn from 'classnames'
import {connect} from "redux-zero/preact";

import Questions from './sections/Questions';
import Footer from './sections/Footer';
import HeroBox from './sections/HeroBox'
import Testimonials from './sections/Testimonials'
import Contests from './sections/Contests'
import Prize from './sections/Prize';
import Partners from './sections/Partners';

import Header from '../../Pages/main/sections/Header'
import Nav from './sections/Nav'

import actions from "../../../store/actions";
import s from './LandingPage.module.scss'

const LandingPage = ({user}) => {

    return (
        <div className={s.container}>
            {user ? <Header className={s.header} /> : <Nav color="black" />}

            <HeroBox rowClass={s.row} />
            <Testimonials rowClass={s.row} />
            <Contests rowClass={s.row} />
            <Prize rowClass={s.row} />
            <Partners rowClass={s.row} />
            <Questions rowClass={s.row} />
            <Footer className={s.row} />

        </div >
    )
}


const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(LandingPage);