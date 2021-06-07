import {useCallback, useEffect, useState} from 'preact/hooks';
import {useTranslation} from "react-i18next";
import {connect} from "redux-zero/preact";
import cn from 'classnames';
import actions from '../../../../store/actions';
import {FormField} from "../../../../common";
import CitySelect from "../../../../common/form/CitySelect";
import CountrySelect from "../../../../common/form/CountrySelect";
import s from './SearchForm.module.scss';


const TeamForm = ({onSubmit, initialAge, initialSearch}) => {
    const {t} = useTranslation();

    const [filters, setFilters] = useState({
        age: initialAge,
        search: initialSearch
    });

    useEffect(() => {
        if (initialAge != filters.age || initialSearch != filters.search) {
            setFilters({age: initialAge, search: initialSearch});
        }
    }, [initialAge, initialSearch]);

    const onChange = useCallback((...args) => {
        let [name, value] = args;
        if (args[0]?.target) {
            ({name, value} = args[0].target);
        }

        setFilters({...filters, [name]: value});
    }, [filters]);

    const onSubmitCallback = useCallback((e) => {
        e.preventDefault();
        onSubmit(filters);
    }, [onSubmit, filters]);

    return (
        <form className={s.form} onSubmit={onSubmitCallback}>
            <FormField>
                <input className="field__input" name="search" placeholder={t('teams.SearchForm.byName')}
                       type="text" value={filters.search} onChange={onChange}/>
            </FormField>

            {/*<FormField className={s.countryWrapper}>*/}
            {/*    <CountrySelect value={filters.country} name="country" isClearable*/}
            {/*                   placeholder={t("teams.form.countryLabel")} onChange={onChange} />*/}
            {/*</FormField>*/}

            {/*<FormField>*/}
            {/*    <CitySelect value={filters.city} country_id={filters.country?.id}*/}
            {/*                name="city" onChange={onChange} isClearable*/}
            {/*                placeholder={t("teams.form.cityLabel")}/>*/}
            {/*</FormField>*/}

            <FormField>
                <input className="field__input" name="age" placeholder={t('teams.SearchForm.byAge')}
                       type="number" value={filters.age} onChange={onChange}/>
            </FormField>

            <button className={cn("btn primary", s.submitBtn)}>
                {t('teams.SearchForm.submitBtn')}
            </button>
        </form>
    )
}

const mapToProps = ({team, setTeam}) => ({team, setTeam});

export default connect(mapToProps, actions)(TeamForm);
