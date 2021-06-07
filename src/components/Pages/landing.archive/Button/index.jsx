import {h} from 'preact';
import cn from 'classnames';
import s from './style.module.css';


const Button = ({children, white, className, ...rest}) => {
    return (
        <button  type="button" className={cn(s.button, {[s.white]: white}, className)} {...rest}>
            {children}
        </button>
    );
};

export default Button;
