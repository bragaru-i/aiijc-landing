import {h, Component} from "preact";
import classNames from 'classnames';
import './Switch.scss';


export const Switch = ({name, value, firstValue, secondValue, firstLabel, secondLabel, onChange, className,
                           disabled}) => {
    const toggle = v => {
        if (!disabled) {
            onChange(name, v);
        }
    }

    return (
        <div className={classNames('switch', className)}>
            <span className={classNames("switch__label", "switch__firstLabel", {active: value === firstValue})}
                  onClick={e => toggle(firstValue)}>
                {firstLabel}</span>
            <div className={classNames("switch__jack-overlay", {first: value === firstValue, second: value === secondValue})}
                 onClick={e => toggle(value === firstValue ? secondValue : firstValue)}>
                <div className={classNames("switch__jack")}/>
            </div>
            <span className={classNames("switch__label", "switch__secondLabel", {active: value === secondValue})}
                  onClick={e => toggle(secondValue)}>
                {secondLabel}</span>
        </div>
    );
}
