import {connect} from "redux-zero/preact";
import {Route, Redirect} from "react-router-dom";


const PrivateRoute = ({user, allowed = true, ...props}) => {
    if (user && allowed) {
        return <Route {...props}/>;
    }

    return <Route {...props} children={() => <Redirect to="/"/>}/>;
};

const mapToProps = ({user}) => ({user});

export default connect(mapToProps, null)(PrivateRoute);
