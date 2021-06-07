import {h} from 'preact';
import s from './style.module.css';


const Number = ({children}) => {
    return (
        <div className={s.number}>
            <svg className={s.topLeft} width="49" height="25" viewBox="0 0 49 25" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M1 25V1H49" stroke="black" stroke-width="2"/>
            </svg>

            <svg className={s.topRight} width="8" height="26" viewBox="0 0 8 26" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <rect width="8" height="2" fill="black"/>
                <rect y="8" width="8" height="2" fill="black"/>
                <rect y="16" width="8" height="2" fill="black"/>
                <rect y="24" width="8" height="2" fill="black"/>
            </svg>

            <svg className={s.bottomRight} width="33" height="17" viewBox="0 0 33 17" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16L32 16L32 0" stroke="black" stroke-width="2"/>
            </svg>

            <svg className={s.bottomLeft} width="24" height="4" viewBox="0 0 24 4" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <circle cx="2" cy="2" r="2" fill="black"/>
                <circle cx="12" cy="2" r="2" fill="black"/>
                <circle cx="22" cy="2" r="2" fill="black"/>
            </svg>

            {children}
        </div>
    );
};

export default Number;
