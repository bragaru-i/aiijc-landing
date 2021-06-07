import Helmet from 'preact-helmet';
import {Switch, Route} from 'react-router-dom';
import Header from '../main/sections/Header';
import Footer from '../main/sections/Footer'
import EditGeneral from './components/EditGeneral';
import EditEducation from './components/EditEducation'
import EditSocial from './components/EditSocial'
import Edit from './components/Edit'
import BackButton from '../../../common/Components/BackButton';
import './EditPage.scss'


const EditPage = () => {
    return (
        <div className="profile-wrapper">
            <Helmet title="Profile"/>
            <Header/>
            <main className="full-height">
                <section class="edit-container">
                    <BackButton link="/profile"/>
                    <Switch>
                        <Route path="/edit" exact>
                            <Edit/>
                        </Route>
                        <Route path="/edit/general">
                            <EditGeneral/>
                        </Route>
                        <Route path="/edit/education">
                            <EditEducation/>
                        </Route>
                        <Route path="/edit/social">
                            <EditSocial/>
                        </Route>
                    </Switch>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default EditPage
