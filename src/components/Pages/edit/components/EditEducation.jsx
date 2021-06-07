import {useState, useCallback} from 'preact/hooks'
import {connect} from 'redux-zero/preact'
import {useTranslation} from "react-i18next";
import {Error, FormField} from '../../../../common'
import Button from '../../../../common/Components/Button'
import Heading from '../../profile/components/Heading'
import EditSideBar from './EditSideBar'
import './edit.scss'


const EditEducationForm = () => {
    const {t} = useTranslation();

    const [inputs, setInputs] = useState({
        country: "",
        city: "",
        school: "",
        year: "",
    })
    const [errors, setErrors] = useState({});
    const onChange = useCallback(
        ({target}) => {
            setInputs({...inputs, [target.name]: target.value});
            setErrors({...errors, [target.name]: null});
        },
        [inputs, errors]
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const errors = {};

            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }
        }, [inputs, errors]);
    return (
        <>
            <Heading className="header-hide" text="Образование"/>
            <div className="container-editForms">
                <div className="edit-form-heading">
                    Образование
                </div>
                <Error error={errors.details}/>
                <FormField
                    label="Country"
                    labelFor="edit-form-country"
                    errors={errors.country}

                >
                    <input
                        className="field__input"
                        id="edit-form-country"
                        name="country"
                        type="text"
                        value={inputs.country}
                        onInput={onChange}
                    />
                </FormField>
                <FormField
                    label="City"
                    labelFor="edit-form-city"
                    errors={errors.city}
                >
                    <input
                        className="field__input"
                        id="signin-form-city"
                        name="city"
                        type="text"
                        disabled={!inputs.country}
                        value={inputs.city}
                        onInput={onChange}
                    />
                </FormField>
                <FormField
                    label="School"
                    labelFor="edit-form-school"
                    errors={errors.school}
                >
                    <input
                        className="field__input"
                        id="signin-form-school"
                        name="school"
                        type="text"
                        disabled={!inputs.city}
                        value={inputs.school}
                        onInput={onChange}
                    />
                </FormField>
                <FormField
                    label="Class"
                    labelFor="edit-form-year"
                    errors={errors.year}
                >
                    <input
                        className="field__input"
                        id="signin-form-year"
                        name="year"
                        type="text"
                        disabled={!inputs.school}
                        value={inputs.year}
                        onInput={onChange}
                    />
                </FormField>

                <Button onClick={onSubmit} fullWidth>
                    {t("Profile.save")}
                </Button>
            </div>
        </>)
}

const EditGeneral = ({screen}) => {
    if (!!screen && screen.width > 767)
        return (
            <>
                <Heading text="Редактировать"/>
                <div className="main-edit-container">
                    <EditEducationForm/>
                    <EditSideBar/>
                </div>
            </>
        )
    return <EditEducationForm/>
}

const mapToProps = ({screen}) => ({screen})
export default connect(mapToProps, null)(EditGeneral)
