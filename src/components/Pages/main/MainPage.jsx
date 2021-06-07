import {h, Fragment} from 'preact';
import Header from './sections/Header';
import Main from './sections/Main';
import Footer from './sections/Footer';
import {connect} from "redux-zero/preact";
import actions from "../../../store/actions";
import LandingPage from "../landing/LandingPage";

const MainPage = ({user}) => {
    if (!user) {
        return <LandingPage/>
    }

    return (
        <>
            <Header isMainPage={true} />
            <Main />
            <Footer />
        </>
    );
};

const mapToProps = ({user}) => ({user});
export default connect(mapToProps, actions)(MainPage);
