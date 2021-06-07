import {h, Fragment} from 'preact';
import {connect} from "redux-zero/preact";
import actions from "../../store/actions";
import {useState, useCallback} from 'preact/hooks';
import cookies from "browser-cookies";
import {Link} from 'react-router-dom';
import {api, pushAnalytics} from '../../common';
import cn from 'classnames';
import {FormField} from '../../common';
import {useTranslation} from 'react-i18next';
import {TRACKER_GOALS} from "../../constants";
import './Login.scss';

const LoginForm = ({login, setIsAuthModalShowing, showModal, hideModal}) => {
    const {t} = useTranslation();
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});
    const signin = (e) => {
        e.preventDefault();
        const form = document.getElementById('signin-form');
        fetch('/api_v2/login/', {
            method: 'POST',
            body: new FormData(form),
            headers: {'X-CSRFToken': cookies.get('csrftoken')},
        })
            .then((response) => response.json())
            .then((res) => alert(JSON.stringify(res)))
            .catch(console.error);
        return false;
    };

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setError('');
            const errors = {};

            if(!data.email || data.email.length === 0) {
                errors.email = [t('errors.fieldEmpty')];
            }
            if(!data.password || data.password.length === 0) {
                errors.password = [t('errors.fieldEmpty')];
            }

            setErrors(errors);
            if (Object.keys(errors).length > 0) {
                return;
            }

            setIsLoading(true);
            try {
                const res = await api.post('/api_v2/login/', data);
                setErrors({});
                if (res.needed_verification) {
                    showModal('verification');
                } else {
                    login(res);
                }
                setIsAuthModalShowing(false);
                hideModal();
                pushAnalytics(TRACKER_GOALS.LOGIN);
            } catch (e) {
                if (e.res?.errors) {
                    setErrors(e?.res?.errors)
                } else if (!navigator.onLine) {
                    setError(t('errors.offline'));
                } else if (e.status >= 500 && e.status < 600) {
                    setError(t('errors.500'));
                } else if (e.res?.detail) {
                    setError(e.res?.detail);
                    if (e.res?.detail === 'Учётные данные неверны') {
                        setErrors({email: [''], password: ['']});
                    }
                } else if (e.res?.details) {
                    setError(e.res?.details);
                }
            } finally {
                setIsLoading(false);
            }
        }, [data, errors, error]);

    const onChange = useCallback(
        ({target}) => {
            setData({...data, [target.name]: target.value});
            setErrors({...errors, [target.name]: null});
        },
        [data, errors]
    );


    const signUpredirect = (event) => {
        event.preventDefault();
        setIsAuthModalShowing(false);
        showModal('signup')
        //open reg modal
        // dispatch(setModal(MAIN_MODAL.SIGNUP));
    };

    return (
        <>
            {error && <div className="error login-form-error"><p>{t('errors.error')}</p>{error}</div>}
            <form onSubmit={onSubmit} id="signin-form" className="login-form" novalidate>
                <FormField
                    label="Email"
                    errors={errors.email}
                    labelFor="signin-form-email"
                    required
                >
                    <input
                        className="field__input"
                        id="signin-form-email"
                        name="email"
                        type="email"
                        disabled={isLoading}
                        value={data.email}
                        onInput={onChange}
                    />
                </FormField>
                <FormField
                    label={t('Form.password')}
                    errors={errors.password}
                    labelFor="signin-form-password"
                    required
                >
                    <div className="password-wrapper">
                        <input
                            type={isPasswordShown ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            disabled={isLoading}
                            onInput={onChange}
                            id="signin-form-password"
                        />
                        <div
                            className={cn('password-checkbox', {
                                view: isPasswordShown,
                            })}
                            onClick={() => setIsPasswordShown(!isPasswordShown)}
                        ></div>
                    </div>
                </FormField>

                <div className="links-block">
                    <p>
                        <Link to="/faq/restore-password/restore" onClick={() => hideModal()}>{t('Form.LinkRestorePassword')}</Link>
                    </p>
                    <p>
                        {t('Form.NoAccount')}{' '}
                        <a href="/" onClick={signUpredirect}>
                            {t('Form.LinkRegister')}
                        </a>
                    </p>
                </div>
                <button type="submit" className="btn primary" disabled={isLoading}>
                    {t('buttons.toLogIn')}
            </button>
            </form>
        </>
    );
};


const mapToProps = ({login, showModal, hideModal}) => ({login, showModal, hideModal});

export default connect(mapToProps, actions)(LoginForm);