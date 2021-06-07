import {h, Fragment} from 'preact';
import {Link, useParams} from 'react-router-dom';
import './FaqContentPage.scss';
import Helmet from "preact-helmet";
import {useEffect, useState} from 'preact/hooks';
import {useTranslation} from 'react-i18next';
import {connect} from 'redux-zero/preact';
import actions from '../../../../store/actions';

const FaqContentPageComponent = ({faqEntrySet}) => {
    const {t} = useTranslation();
    const {slug} = useParams();
    const [content, setContent] = useState(null);

    useEffect(async () => {
        try {
            setContent(faqEntrySet.find(entry => entry.slug === slug));
        } catch (err) {
            console.log(err);
        }
    }, []);
    return (
        <>
            {content && <>
                <Helmet title={content.question}/>
                <Link to="/faq" className="back-btn">
                    {t('buttons.back')}
                </Link>
                <h1>{content.question}</h1>
                <div className="faq-legal-content" dangerouslySetInnerHTML={{__html: content.answer}}></div>
            </>}
        </>
    );
};

const mapToProps = ({faqEntrySet}) => ({faqEntrySet});
export const FaqContentPage = connect(mapToProps, actions)(FaqContentPageComponent);