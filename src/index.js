if (process.env.NODE_ENV === 'development') {
    require("preact/debug");
}
import { h, render } from 'preact';
import store from './store/store'
import App from "./App";
import {Provider} from "redux-zero/preact";

const dom = document.getElementById('root');
render(
    <Provider store={store}>
        <App/>
    </Provider>, dom
);
