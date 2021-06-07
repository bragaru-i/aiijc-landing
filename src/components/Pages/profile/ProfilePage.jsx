import {connect} from 'redux-zero/preact';
import {useTranslation} from 'react-i18next';
import {useState, useCallback} from 'preact/hooks';
import Header from '../main/sections/Header';
import Footer from '../main/sections/Footer';
import Helmet from 'preact-helmet';
import BackButton from '../../../common/Components/BackButton';
import Heading from './components/Heading';
import EmptyProfileCard from './components/EmptyProfileCard';
import ProfileCard from './components/ProfileCard';
import ProfileFull from './components/ProfileFull';
import './ProfilePage.scss';
import VerificationModal from "../../Round/VerificationModal";


export const isFullFilled = (user) => (
    user.last_name && user.first_name && user.birth &&
    user.address_set?.[0]?.country && user.address_set?.[0]?.city
);

const ProfilePage = ({user}) => {
    const {t} = useTranslation();
    const [isShowingVerificationModal, setIsShowingVerificationModal] = useState(false);

    const openVerificationModal = useCallback(() => {
        setIsShowingVerificationModal(true);
    }, []);

    return (
        <div className="profile-wrapper">
            <Helmet title={t("Profile.my")}/>
            <Header/>
            <main className="full-height">
                <section className="profile-container">
                    <BackButton/>
                    <Heading text={t('Profile.my')}/>
                    {isFullFilled(user) && user.parent_phone_confirmed ? (
                        <ProfileCard/>
                    ) : (
                        <EmptyProfileCard openVerificationModal={openVerificationModal}/>
                    )}
                    {/*<ProfileFull />*/}
                    <VerificationModal isShowing={isShowingVerificationModal}
                                       setIsShowing={setIsShowingVerificationModal}/>
                </section>
            </main>
            <Footer/>
        </div>
    );
};

const mapToProps = ({user}) => ({user});
export default connect(mapToProps, null)(ProfilePage);
