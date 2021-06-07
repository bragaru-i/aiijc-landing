import {useCallback} from 'preact/hooks'
import {Link, useHistory} from "react-router-dom";
import cn from "classnames";
import {useTranslation} from "react-i18next";
import "./BackButton.scss";


const BackButton = ({className, link, onClick}) => {
    const history = useHistory();
    const {t} = useTranslation();

    const goTo = useCallback((e) => {
        if (!link) {
            e.preventDefault();
            history.goBack();
        }
    }, [history, link]);

    return (
        <Link to={link} className={cn("back-btn1", className)} onClick={onClick ? onClick : goTo}>
            {t("buttons.back")}
        </Link>
    );
};

export default BackButton;
