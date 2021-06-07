import {h, Fragment} from 'preact';
import {useState, useEffect} from 'preact/hooks';
import {FaqList} from './';
import {connect} from 'redux-zero/preact';
import actions from '../../../../store/actions';
import {useTranslation} from 'react-i18next';
import {Link} from "react-router-dom";

const FaqComponent = ({faqEntrySet}) => {
    const {t} = useTranslation();
    const [items, setItems] = useState([
        {
            answer_title: t('FAQ.list.restoreActivate'),
            slug: 'restore-password',
            icon: '<svg width="42" height="38" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M37 14V1H1V37H37V20.5M37 20.5L41 24M37 20.5L33 24" stroke="black" stroke-width="2"/>' +
                '<rect x="8.82812" y="28.0918" width="13" height="2" transform="rotate(-45 8.82812 28.0918)" fill="#1E1EF7"/>' +
                '<rect x="10.2422" y="26.6777" width="2" height="4" transform="rotate(-45 10.2422 26.6777)" fill="#1E1EF7"/>' +
                '<path fill-rule="evenodd" clip-rule="evenodd" d="M22.2625 11.8277L18.0198 16.0703L22.2625 20.313L26.5051 16.0703L22.2625 11.8277ZM15.1914 16.0703L22.2625 23.1414L29.3335 16.0703L22.2625 8.99924L15.1914 16.0703Z" fill="#1E1EF7"/>' +
                '</svg>'
        },
    ]);

    useEffect(() => {
        try {
            if (faqEntrySet) {
                setItems([...items, ...faqEntrySet]);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <Link to="/" className="back-btn">
                {t('buttons.back')}
            </Link>
            <h1>FAQ</h1>
            <FaqList items={items} />
        </>
    );
};

const mapToProps = ({faqEntrySet}) => ({faqEntrySet});
export const Faq = connect(mapToProps, actions)(FaqComponent);
