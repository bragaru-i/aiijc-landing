import createStore from "redux-zero";
import TagManager from "react-gtm-module";
import {getScreen} from "../common";

const initialState = {
    user: null,
    modal: null,
    gtmId: null,
    faqEntrySet: null,
    stageTab: localStorage.getItem('currentStageTab') || '0',
    contest: null,
    rounds: null,
    tasks: null,
    solutionErrorModalContent: null,
    screen: getScreen(window.innerWidth),

    team: null,
    isShowingTeamCreatedModal: false,
    trackRegistration: null,
    invitationsCounter: null
};

const dom = document.getElementById('root');
const user = dom.dataset.user;
if (user) {
    initialState.user = JSON.parse(user);
}

const faqCategoriesJSON = dom.dataset.faq_categories;
if (faqCategoriesJSON) {
    try {
        const faqCategories = JSON.parse(faqCategoriesJSON);
        initialState.faqEntrySet = [];
        for (let category of faqCategories) {
            if (category.entry_set && category.entry_set.length !== 0) {
                initialState.faqEntrySet.push(...category.entry_set);
            }
        }
    } catch(err) {
        console.log(err);
    }
}

const gtmId = dom.dataset.gtm;
if (gtmId) {
    initialState.gtmId = gtmId;
    TagManager.initialize({ gtmId: gtmId });
}

initialState.contest = dom.dataset.contest;

const store = createStore(initialState);

export default store;
