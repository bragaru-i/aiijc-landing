import {h, Fragment} from 'preact';
import {useTranslation} from 'react-i18next';
import './TaskStatus.scss';

export const TaskStatus = ({active}) => {
    const {t} = useTranslation();

    return (
        <>
            {active &&
                <div className="taskStatus active">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6025 18.3334 10.0001C18.3334 5.39771 14.6025 1.66675 10.0001 1.66675C5.39771 1.66675 1.66675 5.39771 1.66675 10.0001C1.66675 14.6025 5.39771 18.3334 10.0001 18.3334Z" stroke="#06B418" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 5V10L13.3333 11.6667" stroke="#06B418" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    {t('TaskList.TaskStatus.active')}
                </div>
            }
            {!active &&
                <div className="taskStatus">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.66675 2.5H6.66675C7.5508 2.5 8.39865 2.85119 9.02377 3.47631C9.64889 4.10143 10.0001 4.94928 10.0001 5.83333V17.5C10.0001 16.837 9.73669 16.2011 9.26785 15.7322C8.79901 15.2634 8.16312 15 7.50008 15H1.66675V2.5Z" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.3333 2.5H13.3333C12.4493 2.5 11.6014 2.85119 10.9763 3.47631C10.3512 4.10143 10 4.94928 10 5.83333V17.5C10 16.837 10.2634 16.2011 10.7322 15.7322C11.2011 15.2634 11.837 15 12.5 15H18.3333V2.5Z" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {t('TaskList.TaskStatus.available')}
                </div>
            }
        </>
    );
};
