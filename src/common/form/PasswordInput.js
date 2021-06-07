import {h, Component} from 'preact';
import cn from "classnames";
import {useState} from "preact/hooks";

export const PasswordInput = props => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    return (
        <div className="password-wrapper">
            <input type={isPasswordShown ? 'text' : 'password'} {...props}/>
            <div className={cn('password-checkbox', {view: isPasswordShown})}
                 onClick={() => setIsPasswordShown(!isPasswordShown)}/>
        </div>
    )
}