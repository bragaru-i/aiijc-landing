import {h, Component} from "preact";
import classNames from 'classnames';
import {useCallback} from "preact/compat";


export const Checkbox = ({name, value, children, onChange, className, disabled, isBooleanValue = false, ...props}) => {
    const toggle = useCallback(() => {
        if (!disabled) {
            onChange(name, value ? (isBooleanValue ? false : '') : true);
        }
    }, [disabled, value, onChange, name, isBooleanValue])

    return (
        <div className={classNames('checkbox', className)}>
            <input disabled={disabled} type="checkbox" name={name} className="checkbox__input" onChange={toggle} {...props} checked={value}/>
            <label className={classNames('checkbox__label', {active: !!value})} onClick={toggle}>
                {children}
            </label>
        </div>
    );
}
