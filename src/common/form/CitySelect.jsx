import {useCallback} from "preact/hooks";
import AsyncSelect from "react-select/async";
import {api} from "../api";
import {useTranslation} from "react-i18next";


const CitySelect = ({country_id, onChange, name, ...rest}) => {
    const {t} = useTranslation();

    const noOptionsMessage = useCallback(({inputValue}) => {
        if (inputValue.length < 3) {
            return t('Form.enter3chars');
        }
        return t('Form.noData');
    }, []);

    const searchCities = useCallback(async (value) => {
        if (value.length < 3) {
            return [];
        }

        try {
            const data = {search: value};
            if (country_id) {
                data.country_id = country_id;
            }
            return await api.get('/api_v2/cities/', data);
        } catch (e) {
            alertify.error(t('errors.unknown'));
        }
    }, [country_id]);

    return (
        <AsyncSelect loadOptions={searchCities} noOptionsMessage={noOptionsMessage}
                     loadingMessage={() => t('Form.loading')} className="select"
                     classNamePrefix="select" placeholder=""
                     getOptionLabel={opt => opt.region_name ? `${opt.name} (${opt.region_name})` : opt.name}
                     getOptionValue={opt => opt.id}
                     onChange={(v) => onChange(name, v)}
                     {...rest}
        />
    )
};

export default CitySelect;