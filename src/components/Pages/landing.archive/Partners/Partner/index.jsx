import {h} from 'preact';
import s from './style.module.css';


const Partner = ({children, href}) => (
    <a href={href} className={s.partner}>
        {children}

        <div className={s.bottomLeft}>
            <svg width="64" height="4" viewBox="0 0 64 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="38" cy="2" r="1" fill="white" stroke="black" stroke-width="2"/>
                <circle cx="50" cy="2" r="1" fill="white" stroke="black" stroke-width="2"/>
                <circle cx="62" cy="2" r="1" fill="white" stroke="black" stroke-width="2"/>
                <circle cx="26" cy="2" r="1" fill="white" stroke="black" stroke-width="2"/>
                <circle cx="14" cy="2" r="1" fill="white" stroke="black" stroke-width="2"/>
                <circle cx="2" cy="2" r="1" fill="white" stroke="black" stroke-width="2"/>
            </svg>
        </div>

        <div className={s.topCenter}>
            <svg width="52" height="8" viewBox="0 0 52 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="32" y="8" width="2" height="8" transform="rotate(180 32 8)" fill="black"/>
                <rect x="42" y="8" width="2" height="8" transform="rotate(180 42 8)" fill="black"/>
                <rect x="52" y="8" width="2" height="8" transform="rotate(180 52 8)" fill="black"/>
                <rect x="22" y="8" width="2" height="8" transform="rotate(180 22 8)" fill="black"/>
                <rect x="12" y="8" width="2" height="8" transform="rotate(180 12 8)" fill="black"/>
                <rect x="2" y="8" width="2" height="8" transform="rotate(180 2 8)" fill="black"/>
            </svg>
        </div>

        <div className={s.bottomRightCorner}/>
    </a>
);


export default Partner;
