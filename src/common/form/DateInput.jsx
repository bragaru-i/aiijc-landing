import {h, Component} from "preact";
import classNames from 'classnames';
import './DateInput.scss';
import {useCallback, useState} from "preact/hooks";
import {useTranslation} from 'react-i18next';


const onlyNumbers = (value) => value.replace(/[^0-9]/g, '');


function parseDate(str) {
    const res = {day: '', month: '', year: ''};
    if (str) {
        const tokens = str.split('-');
        if (tokens.length === 3) {
            res.day = tokens[2];
            res.month = tokens[1];
            res.year = tokens[0];
        }
    }
    return res;
}

function dateToStr(day, month, year) {
    if (day.length === 1) day = '0' + day;
    if (month.length === 1) month = '0' + month;
    return year + '-' + month + '-' + day;
}


export const DateInput = ({value, name, className, label, onChange, ...rest}) => {
    const {t} = useTranslation();
    const {day, month, year} = parseDate(value);
    const [dayValue, setDayValue] = useState(day);
    const [monthValue, setMonthValue] = useState(month);
    const [yearValue, setYearValue] = useState(year);

    const onInputDay = useCallback(
        e => {
            const val = onlyNumbers(e.target.value);
            setDayValue(val);
            const res = dateToStr(val, monthValue, yearValue);
            onChange(name, res);
        }, [name, monthValue, yearValue, onChange]
    )

    const onInputMonth = useCallback(
        e => {
            const val = onlyNumbers(e.target.value);
            setMonthValue(val);
            const res = dateToStr(dayValue, val, yearValue);
            onChange(name, res);
        }, [name, dayValue, yearValue, onChange]
    )

    const onInputYear = useCallback(
        e => {
            const val = onlyNumbers(e.target.value);
            setYearValue(val);
            const res = dateToStr(dayValue, monthValue, val);
            onChange(name, res);
        }, [name, dayValue, monthValue, onChange]
    )

    return (
        <div className={classNames('dateInput', className)}>
            <input
                id={'dateInput__' + name}
                type="text"
                value={dayValue}
                className={classNames('dateInput__input', 'dateInput__day')}
                maxLength={2}
                name={name + '.day'}
                onInput={onInputDay}
                placeholder={t('Form.dayValue')}
                {...rest}
            />
            <input
                type="text"
                value={monthValue}
                className={classNames('dateInput__input', 'dateInput__month')}
                maxLength={2}
                name={name + '.month'}
                onInput={onInputMonth}
                placeholder={t('Form.monthValue')}
                {...rest}
            />
            <input
                type="text"
                value={yearValue}
                className={classNames('dateInput__input dateInput__year')}
                maxLength={4}
                name={name + '.year'}
                onInput={onInputYear}
                placeholder={t('Form.yearValue')}
                {...rest}
            />
        </div>
    );
}
