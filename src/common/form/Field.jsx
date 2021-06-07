import {h, Component} from "preact";
import {useTranslation} from 'react-i18next';
import cn from 'classnames';
import "./Field.scss";


export const FormField = ({label, labelFor, errors, required, help, className, children, colon=true}) => {
    const {t} = useTranslation();

    const errorList = typeof errors === 'string' ? [errors] : errors;

    return (
        <div className={cn('form__row', className)}>
            <div className={`form__field field ${errors ? 'field-error' : ''}`}>
                {label &&
                    <label className="field__label" for={labelFor}>
                        {label}{colon && ":"}{' '}
                        {required && <span className="field__star" title={t('Form.required')}>*</span>}
                    </label>}
                {children}
                {errors && errorList.map(err => <span className="field__error">{err}</span>)}
                {help && <span className="field__hint">{help}</span>}
            </div>
        </div>
    )
}

