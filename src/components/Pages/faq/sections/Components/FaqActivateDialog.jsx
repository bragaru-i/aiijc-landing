import { h, Fragment } from 'preact';
import { api, FormField } from '../../../../../common';
import { useState, useCallback } from 'preact/hooks';
import { useHistory } from 'react-router-dom';
import { FaqDialogHeadline } from './FaqDialogHeadline';
import {useTranslation} from 'react-i18next';
import './FaqRestoreActivateDialog.scss';

export const FaqActivateDialog = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const [stage, setStage] = useState(1);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = useCallback(
        ({ target }) => {
            setData({ ...data, [target.name]: target.value });
            setErrors({ ...errors, [target.name]: null });
        },
        [data, errors]
    );

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setIsLoading(true);
            try {
                const res = await api.post('/api_v2/send_activation/', {
                    ...data,
                    send_link: true,
                });
                if (res.email) {
                    setErrors({});
                    setStage(2);
                } else {
                    setErrors({ email: [t('errors.unknown')] }); 
                }
            } catch (e) {
                if (e.res?.errors) {
                    setErrors(e.res?.errors);
                } else if (!navigator.onLine) {
                    setErrors({ email: [t('errors.offline')] });
                } else if (e.status >= 500 && e.status < 600) {
                    setErrors({ email: [t('errors.500')] });
                } else {
                    setErrors({ email: [e.res?.email] });
                }
            } finally {
                setIsLoading(false);
            }
        },
        [data, errors]
    );

    return (
        <div className="FaqWrapperRestoreActivate">
            {stage === 1 && (
                <>
                    <FaqDialogHeadline
                        title={t('FAQ.activate.stage1title')}
                        svgSpriteID="mail"
                    />
                    <p className="mw485">
                        {t('FAQ.activate.stage1text')}
                    </p>
                    <form onSubmit={onSubmit} className="faq-form" novalidate>
                        <FormField
                            label="Email"
                            errors={errors.email}
                            labelFor="activate-form-email"
                            required
                        >
                            <input
                                className="field__input"
                                id="activate-form-email"
                                name="email"
                                type="email"
                                value={data.email}
                                onInput={onChange}
                            />
                        </FormField>
                        <button
                            type="submit"
                            className="btn primary"
                            disabled={isLoading}
                        >
                            {t('buttons.sendLetter')}
                        </button>
                    </form>
                </>
            )}
            {stage === 2 && (
                <>
                    <FaqDialogHeadline title={t('FAQ.activate.stage2title')} />
                    <div className="step-final">
                        <p>
                            {t('FAQ.activate.stage2text')}
                        </p>
                        <button
                            type="button"
                            className="btn primary"
                            onClick={() => history.push('/')}
                        >
                            {t('buttons.ok')}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
