import {h} from 'preact';
import cn from 'classnames';
import s from './Header.module.css';


const Header = ({children}) => {
    return (
        <h2 className={s.header}>
            {children}
        </h2>
    );
};

export default Header;
