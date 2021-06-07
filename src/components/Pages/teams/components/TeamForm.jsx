import {useCallback, useState} from 'preact/hooks';
import Helmet from 'preact-helmet';
import {useTranslation} from "react-i18next";
import {connect} from "redux-zero/preact";
import {Link, useHistory} from "react-router-dom";
import cn from 'classnames';
import Heading from "../../profile/components/Heading";
import actions from '../../../../store/actions';
import Card from "./Card";
import {Checkbox, FormField, api, showError, showSuccess} from "../../../../common";
import CitySelect from "../../../../common/form/CitySelect";
import CountrySelect from "../../../../common/form/CountrySelect";
import Modal from "../../../../common/Modal";
import s from './TeamForm.module.scss';


const TeamForm = ({team, setTeam, openTeamCreatedModal}) => {
    const history = useHistory();
    const {t} = useTranslation();

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [inputs, setInputs] = useState({
        name: team?.name || '',
        country: team?.country || null,
        city: team?.city || null,
        can_receive_requests: team?.can_receive_requests || false,
        description: team?.description || ''
    });

    const header = !!team ? t("teams.form.updateHeader") : t("teams.form.createHeader");

    const onChange = useCallback((...args) => {
        let [name, value] = args;
        if (args[0]?.target) {
            ({name, value} = args[0].target);
        }

        setInputs({...inputs, [name]: value});
        setErrors({...errors, [name]: null});
    }, [inputs, errors]);

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();

        const errors = {};
        const requiredFields = ['name', 'description'];
        requiredFields.forEach(field => {
            if (!inputs[field]) {
                errors[field] = t("Profile.required");
            }
        })

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            setIsLoading(true);
            const data = {
                ...inputs, country: inputs.country?.id || "", city: inputs.city?.id || "",
            };

            if (team) {
                let res = await api.patch(`/api_v2/teams/${team.uid}/update/`, data);
                setTeam(res);
                showSuccess(t("Profile.savedMsg"));
            } else {
                let res = await api.post('/api_v2/teams/create/ ', data);
                history.push('/teams/');
                openTeamCreatedModal();
                setTimeout(() => setTeam(res), 0);
            }
        } catch (e) {
            if (e.res?.errors) {
                setErrors(e.res.errors);
            } else {
                showError(e.res?.detail || e.res?.details || t('errors.unknown'));
            }
        } finally {
            setIsLoading(false);
        }
    }, [inputs, team, errors]);

    const deleteTeam = useCallback(async () => {
        try {
            setIsLoadingDelete(true);
            await api.post(`/api_v2/teams/${team?.uid}/delete/`);
            showSuccess(t("teams.form.successDeleteTeam"));
            history.push('/teams/');
            setTimeout(() => setTeam(null), 0);
        } catch (e) {
            showError(e.res?.detail || e.res?.details || t('errors.unknown'));
        } finally {
            setIsLoadingDelete(false);
        }
    }, [team, history]);

    const closeDeleteModal = useCallback(() => setDeleteModalOpened(false), []);
    const openDeleteModal = useCallback(() => setDeleteModalOpened(true), []);

    return (
        <>
            <Helmet title={header}/>
            <div className={s.headerWr}>
                <Heading text={header} className={s.header}/>
                {!!team && (
                    <button className={s.deleteBtn} onClick={openDeleteModal}>
                        {t("teams.form.deleteTeam")}
                    </button>
                )}
            </div>

            <Card>
                <form className={s.teamForm} onSubmit={onSubmit}>
                    <FormField colon={false} label={t("teams.form.nameLabel")} labelFor="team-form-name"
                               errors={errors.name} required>
                        <input className="field__input" id="team-form-name" name="name"
                               type="text" value={inputs.name} onChange={onChange}/>
                    </FormField>

                    <div className={s.address}>
                        <FormField colon={false} label={t("teams.form.countryLabel")} errors={errors.country}
                                   className={s.countryFormField}>
                            <CountrySelect value={inputs.country} name="country" onChange={onChange}/>
                        </FormField>

                        <FormField colon={false} label={t("teams.form.cityLabel")} errors={errors.city}>
                            <CitySelect value={inputs.city} country_id={inputs.country?.id} name="city"
                                        onChange={onChange}/>
                        </FormField>
                    </div>

                    <FormField colon={false} label={t("teams.form.detailsLabel")}
                               labelFor="team-form-description" errors={errors.description} required>
                        <textarea className={cn("field__input", s.description)} id="team-form-description"
                                  name="description" value={inputs.description} onChange={onChange}
                        />
                    </FormField>

                    <Checkbox name="can_receive_requests" isBooleanValue
                              onChange={onChange} value={inputs.can_receive_requests}>
                        {t("teams.form.canReceiveRequestsLabel")}
                    </Checkbox>

                    <div className={s.help}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="#5F5F5F"/>
                            <path
                                d="M11.0999 11.5841L11.463 4.73145H8.55778L8.93673 11.5841H11.0999ZM10.0104 15.4367C10.8157 15.4367 11.4946 14.7578 11.4946 13.9683C11.4946 13.163 10.8157 12.4841 10.0104 12.4841C9.20515 12.4841 8.54199 13.163 8.54199 13.9683C8.54199 14.7578 9.20515 15.4367 10.0104 15.4367Z"
                                fill="white"/>
                        </svg>

                        <div>
                            {t("teams.form.faq")}{' '}<Link to="/faq/teams/">FAQ</Link>.
                        </div>
                    </div>

                    <div className={s.actions}>
                        <button className="btn primary" disabled={isLoading}>
                            {!!team ? t("teams.form.updateSubmitBtn") : t("teams.form.createSubmitBtn")}
                        </button>
                    </div>
                </form>
            </Card>

            {!!team && (
                <button className={cn(s.deleteBtn, s.deleteBtnMobile)} onClick={openDeleteModal}>
                    {t("teams.form.deleteTeam")}
                </button>
            )}

            <Modal isShowing={deleteModalOpened} header={t("teams.form.deleteTeamModal.header")}
                   onClose={closeDeleteModal}>
                {t("teams.form.deleteTeamModal.text")}

                <div className={s.deleteActions}>
                    <button className="btn primary" onClick={deleteTeam}
                            disabled={isLoadingDelete}>
                        {t("teams.form.deleteTeamModal.submitBtn")}
                    </button>
                    <button className="btn primary-outline" onClick={closeDeleteModal}>
                        {t("teams.form.deleteTeamModal.closeBtn")}
                    </button>
                </div>
            </Modal>
        </>
    )
}

const mapToProps = ({team, setTeam}) => ({team, setTeam});

export default connect(mapToProps, actions)(TeamForm);
