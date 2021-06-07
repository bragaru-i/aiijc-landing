import Helmet from 'preact-helmet';
import {connect} from "redux-zero/preact";
import Heading from "../../profile/components/Heading";
import actions from "../../../../store/actions";
import {useTranslation} from "react-i18next";
import SearchUsers from "./SearchUsers";


const Search = ({team}) => {
    const {t} = useTranslation();

    return (
        <SearchUsers/>
    );
}

const mapToProps = ({team}) => ({team});

export default connect(mapToProps, actions)(Search);
