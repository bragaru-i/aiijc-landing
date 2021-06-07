import cn from 'classnames';
import s from "./Card.module.scss";


const Card = ({heading, text, actions, children, className}) => {
    return (
        <div className={cn(s.container, className)}>
            {children ? children : (
                <>
                    {!!heading && <div className={s.heading}>{heading}</div>}
                    {!!text && (
                        <div className={s.text}>
                            {text}
                        </div>
                    )}
                    {!!actions && (
                        <div className={s.cta}>
                            {actions}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Card;
