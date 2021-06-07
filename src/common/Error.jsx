import {h, Component} from "preact";
import {useTranslation} from 'react-i18next';

export const Error = ({error}) => {
    const {t} = useTranslation();
    if (!error) return null;
    const errors = typeof error === 'string' ? [error] : error;
    return <div className="error-list">
        {errors.map(err => <div className="error"><p>{t('errors.error')}</p>{err}</div>)}
    </div>
}
