import {h, Fragment} from 'preact';
import {Switch, Route, Link} from 'react-router-dom';
import {useEffect} from 'preact/hooks';
import Header from '../main/sections/Header';
import Footer from '../main/sections/Footer';
import {Faq, FaqRestorePassword, FaqActivate, FaqRestore, FaqContentPage} from './sections';
import {useTranslation} from 'react-i18next';
import './FaqPage.scss';
import Helmet from 'preact-helmet';
import {TRACKER_GOALS} from "../../../constants";
import {pushAnalytics} from '../../../common';

export const FaqPage = () => {
    const {t} = useTranslation();

    useEffect(() => {
        pushAnalytics(TRACKER_GOALS.OPEN_FAQ);
    }, []);

    return (
        <>
            <Helmet title="FAQ"/>
            <Header />
            <main>
                <section class="faq-container">
                    <Switch>
                        <Route path="/faq/restore-password/restore">
                            <FaqRestore />
                        </Route>
                        <Route path="/faq/restore-password/activate">
                            <FaqActivate />
                        </Route>
                        <Route path="/faq/restore-password">
                            <FaqRestorePassword />
                        </Route>
                        <Route path="/faq/:slug">
                            <FaqContentPage />
                        </Route>
                        <Route path="/faq">
                            <Faq />
                        </Route>
                    </Switch>
                </section>
            </main>
            <Footer />
        </>
    );
};
