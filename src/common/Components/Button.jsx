import {h} from 'preact';
import cn from 'classnames';
import s from './Button.module.scss';


const Button = ({children, variant="primary", fullWidth, className, ...rest}) => {
    return (
        <button type="button" className={cn(s.btn, className, s[`btn--${variant}`], {[s.fullWidth]: fullWidth})} {...rest}>
            {children}
        </button>
    );
};

export default Button;
