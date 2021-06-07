import {useCallback} from "preact/hooks";
import AsyncSelect from "react-select/async";
import {api} from "../api";
import {useTranslation} from "react-i18next";


const CountrySelect = ({onChange, name, ...rest}) => {
    const {t} = useTranslation();

    const noOptionsMessage = useCallback(({inputValue}) => {
        if (inputValue.length < 3) {
            return t('Form.enter3chars');
        }

        return t('Form.noData');
    }, []);

    const searchCountries = useCallback(async (value) => {
        if (value.length < 3) {
            return [];
        }

        try {
            return await api.get('/api_v2/countries/', {search: value});
        } catch (e) {
            alertify.error(t('errors.unknown'));
        }
    }, []);

    return (
        <AsyncSelect loadOptions={searchCountries} noOptionsMessage={noOptionsMessage}
                     loadingMessage={() => t('Form.loading')} className="select"
                     classNamePrefix="select" placeholder="" getOptionLabel={opt => opt.name}
                     getOptionValue={opt => opt.id}
                     onChange={(v) => onChange(name, v)}
                     {...rest}/>
    )
};

export default CountrySelect;