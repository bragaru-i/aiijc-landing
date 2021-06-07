import {h, Fragment} from 'preact';
import {useState, useCallback, useEffect} from 'preact/hooks';
import cn from 'classnames';
import {useDropzone} from 'react-dropzone';
import i18n from '../../../i18n';
import {useTranslation} from 'react-i18next';
import {connect} from "redux-zero/preact";
import actions from "../../../store/actions";
import {Spinner2Icon, WarningIcon, SuccessIcon, CloseIcon} from '../WorkareaIcons';
import {SOLUTION_STATE} from '../../../constants';
import {api} from '../../../common/api';
import {FormField, showError} from '../../../common';
import s from './style.module.scss';


const EXTENSIONS = '.gz, .csv, .jsonl';
const MAX_SIZE_MB = 50;

const checkSize = (file) => {
    return file.size / 1024 / 1024 <= MAX_SIZE_MB;
};

const checkFile = (file, EXTENSIONS = EXTENSIONS) => {
    let pattern = '(' + EXTENSIONS.replace(/ /g, '').replace(/,/g, '|') + ')$';
    let regexp = new RegExp(pattern, 'i');

    if (!regexp.test(file.name)) {
        return `${i18n.t('SolutionUploader.checkFileFunc.error')} ${EXTENSIONS} ${i18n.t('SolutionUploader.checkFileFunc.format')}`;
    }

    if (!checkSize(file)) {
        return i18n.t('SolutionUploader.checkFileFunc.errorFile');
    }

    return '';
};

const solveDropState = (allowed, lastState) => {
    if ([SOLUTION_STATE.CHECKING, SOLUTION_STATE.COMPILES].some(s => s === lastState)) {
        return 'send';
    } else if (!allowed) {
        return 'not_allowed';
    }
    return 'drop';
};


const SolutionUploader = ({allowed, reasons, lastState, user, task, fetchSolutions}) => {
    const {t} = useTranslation();
    const {is_manager} = user || {};

    const [dropState, setDropState] = useState(solveDropState(is_manager ? is_manager : allowed, lastState));

    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({comment: ''});
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);

    useEffect(() => {
        setDropState(solveDropState(is_manager ? is_manager : allowed, lastState));
    }, [allowed, lastState]);

    const onDrop = useCallback(acceptedFiles => {
        const formatError = checkFile(acceptedFiles[0], EXTENSIONS);

        if (formatError) {
            setErrorMessage(formatError);
        } else {
            setFile(acceptedFiles[0]);
            setDropState('loaded');
        }
    }, [EXTENSIONS]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const onChange = useCallback(
        ({target}) => {
            setData({...data, [target.name]: target.value});
            setErrors({...errors, [target.name]: null});
        },
        [data, errors]
    );

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        setDropState('loading');
        try {
            await api.postFormData(`/api_v2/task/${task.id}/upload_solution/`, {solution: file, comment: data.comment});
            fetchSolutions();
            setErrorMessage('');
            setFile(null);
            setData({...data, comment: ''});
        } catch (e) {
            if (!navigator.onLine) {
                showError(t('errors.offline'));
            } else if (e.status >= 500 && e.status < 600) {
                showError(t('errors.500'));
            } else {
                setErrorMessage((e.res?.details) || t('SolutionUploader.submitHandlerError'));
                setErrors(e?.res?.errors || {})
            }
            setDropState('drop');
        }
    }, [task, file, fetchSolutions, data.comment]);

    const onClear = useCallback(() => {
        setDropState('drop');
        setErrorMessage('');
        setFile(null);
    }, []);

    return (
        <Fragment>
            <div className={cn(s.wrapper)}>
                {dropState === 'drop' && (
                    <div
                        className={cn(s.dropContainer, {
                                [s.dropError]: errorMessage,
                            })}
                        {...getRootProps({style: {cursor: 'pointer'}})}
                    >
                        <input {...getInputProps({accept: EXTENSIONS})} />
                        <div
                            className={cn(s.dropInner, {
                                [s.dropError]: errorMessage,
                                [s.dropActive]: isDragActive,
                            })}
                        >
                            <div className={s.prompt}>
                                {t('SolutionUploader.dropState.drop.prompt1')}{' '}
                                <span className={s.promptAccent}>{t('SolutionUploader.dropState.drop.prompt2')}</span>
                            </div>
                            {!errorMessage ? (
                                <div className={s.notion}>
                                    {t('SolutionUploader.dropState.drop.notion')} {EXTENSIONS}{' '}
                                    {t('SolutionUploader.dropState.drop.format')}
                                </div>
                            ) : (
                                    <div className={cn(s.notion, s.notionError)}>
                                        {errorMessage}
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {dropState === 'loading' && (
                    <div className={s.dropContainer}>
                        <div className={cn(s.dropText, s.loadingText)}>
                            <Spinner2Icon className={s.spinnerIcon} /> {t('SolutionUploader.dropState.loading')}
                        </div>
                    </div>
                )}

                {dropState === 'loaded' && (
                    <div className={cn(s.dropContainer, s.loaded)}>
                        <div className={s.loadedInner}>
                            <div className={cn(s.dropText, s.fileName)} title={file && file.name}>
                                {file && file.name}
                            </div>
                            <div className={s.closeButton} onClick={onClear}>
                                <CloseIcon className={s.closeIcon} />
                            </div>
                        </div>
                    </div>
                )}

                {dropState === 'send' && (
                    <div className={cn(s.dropContainer, s.dropContainerSend)}>
                        <div className={s.sendInnerWrapper}>
                            <div className={s.sendInner}>
                                <div className={cn(s.dropText, s.sendHeader)}>
                                    <SuccessIcon className={s.successIcon} />
                                    <span>{t('SolutionUploader.dropState.send.sendedMsg')}</span>
                                </div>
                            </div>
                            <div>{t("SolutionUploader.dropState.send.alert")}</div>
                        </div>
                    </div>
                )}

                {dropState === 'not_allowed' && (
                    <div className={cn(s.dropContainer, s.dropContainerNotAllow)}>
                        <div className={s.notAllowInnerWrapper}>
                            <div className={s.notAllowInner}>
                                <WarningIcon className={s.warningIcon} />
                                <div className={s.notAllowHeader}>
                                    {t('SolutionUploader.dropState.notAllowed')}
                                </div>
                            </div>
                            <div className={s.notAllowMessage}>
                                {dropState === 'send' && t('SolutionUploader.dropState.send.alert')}

                                {dropState === 'not_allowed' && Array.isArray(reasons) && !!reasons.length && (
                                    reasons.map((reason) => <span>{reason}{' '}</span>)
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {(dropState !== 'send' && dropState !== 'not_allowed') && (
                    <form onSubmit={onSubmit}>
                        <FormField
                            className={s.commentLabel}
                            label={t('SolutionUploader.dropState.form.comment')}
                            errors={errors.comment}
                            labelFor="signin-form-email"
                        >
                            <textarea name="comment" className={cn('field__input', s.commentTextarea)} value={data.comment} onChange={onChange}></textarea>
                        </FormField>
                        <button className={cn("btn primary", s.submitButton)}
                            disabled={!file || dropState === 'loading'} type="submit">
                            {t('SolutionUploader.dropState.form.ButtonText')}
                        </button>
                    </form>
                )}
            </div>
        </Fragment>
    );
};


const mapToProps = ({user}) => ({user});

export default connect(mapToProps, actions)(SolutionUploader);
