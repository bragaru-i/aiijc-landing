import Helmet from 'preact-helmet'
import {Switch, Route} from 'react-router-dom';

import Footer from '../main/sections/Footer'
import Header from '../main/sections/Header';
import BackButton from '../../../common/Components/BackButton';

import Settings from './components/Settings'
import SettingsGeneral from './components/SettingGeneral'
import SettingsUnuscribe from './components/SettingsUnuscribe'
import SettingsPrivate from './components/SettingsPrivate';

import '../edit/components/edit.scss'
import '../edit/EditPage.scss'


const SettingsPage = () => {
    return (
        <div className="profile-wrapper">
            <Helmet title="Settings"/>
            <Header/>
            <main className="full-height">
                <section className="edit-container">
                    <BackButton link="/profile"/>
                    <Switch>
                        <Route path="/settings" exact>
                            <Settings/>
                        </Route>
                        <Route path="/settings/general" exact>
                            <SettingsGeneral/>
                        </Route>
                        <Route path="/settings/unuscribe" exact>
                            <SettingsUnuscribe/>
                        </Route>
                        <Route path="/settings/private" exact>
                            <SettingsPrivate/>
                        </Route>
                    </Switch>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default SettingsPage
