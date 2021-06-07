import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';
import {connect} from 'redux-zero/preact';
import actions from '../../../../store/actions';
import {useTranslation} from 'react-i18next';
import NotActivated from './NotActivated';
import Banner from './Banner';
import {FaqList} from "../../faq/sections";
import {Link} from "react-router-dom";
import './Main.scss';
import StageTabs from './StageTabs';
import {TRACKER_GOALS} from "../../../../constants";
import {pushAnalytics} from "../../../../common";

const Main = ({user, faqEntrySet}) => {
    const {t} = useTranslation();
    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            if (faqEntrySet) {
                setItems(faqEntrySet.filter(entry => entry.show_on_index));
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        pushAnalytics(TRACKER_GOALS.OPEN_TASKS_LIST);
    }, []);

    return (
        <main>
            {user && !user.is_active && <NotActivated />}
            <StageTabs />
            {user && (
                <Banner />
            )}
            {user && (
                <section class="container main__faq">
                    <div className="main__faq-header">
                        <h2>{t('Main.faqHeader')}</h2>
                        <Link to="/faq">{t('Main.faqLink')}</Link>
                    </div>
                    <FaqList items={items} />
                </section>
            )}
            {!user && <section class="top container">
                <h1>{t('Main.h1')}</h1>
            </section>}
        </main>
    );
};

const mapToProps = ({user, faqEntrySet}) => ({user, faqEntrySet});
export default connect(mapToProps, actions)(Main);
