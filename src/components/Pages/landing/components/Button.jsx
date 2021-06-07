import {h} from 'preact'
import cn from 'classnames'

import s from './Button.module.scss'

const Button = ({className, onClick, children, size = "m", variant = "primary"}) => {

    const handleClick = () => {
        if (typeof onClick === "function") return onClick()
        return;

    }

    return (
        <button className={
            cn(
                s.btnContainer,
                className,
                s[`btn--${size}`],
                s[`btn--${variant}`]
            )
        }
            onClick={handleClick}>
            <span className={cn(s["btn-text"])}>
                {children}
            </span>

        </button>
    )
}

export default Button
