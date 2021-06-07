import {h, Component} from "preact";
import classNames from 'classnames';
import {useEffect, useState} from "preact/hooks";

export const Timer = ({endTime, className, onTimerEnd}) => {
    const now = new Date();
    const [delta, setDelta] = useState(new Date(endTime - now));

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const delta = new Date(endTime - now);
            setDelta(delta);
            if (delta <= 0) {
                onTimerEnd();
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [endTime, onTimerEnd])

    return (
        <span className={classNames("timer", className)}>
            {delta > 0 ? delta.toLocaleString("ru", {minute: 'numeric', second: 'numeric'}) : '00:00'}
        </span>
    )
}
