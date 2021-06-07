import {api, getScreen} from "../common";

const actions = store => ({
    login: (state, user) => ({user: {...user}}),
    logout: (state) => ({user: null}),
    changeUser: (state, data) => {
        if (state.user) {
            return {user: {...state.user, ...data}}
        }
    },
    setIsActive: (state, is_active) => {
        if (state.user) {
            return {user: {...state.user, is_active}}
        }
    },
    showModal: (state, modal) => ({modal}),
    hideModal: (state) => ({modal: null}),
    setStageTab: (state, tab) => ({stageTab: tab}),
    setSolutionErrorModalContent: (state, content) => ({solutionErrorModalContent: content}),
    setScreen: (state, size) => ({screen: getScreen(size)}),

    setTeam: (state, team) => ({team}),
    changeTeam: (state, data) => {
        if (state.team) {
            return {team: {...state.team, ...data}}
        }
    },
    openTeamCreatedModal: () => ({isShowingTeamCreatedModal: true}),
    closeTeamCreatedModal: () => ({isShowingTeamCreatedModal: false}),
    deleteParticipant: (state, uid) => {
        if (state.team) {
            const participants = state.team.participants.filter((p) => p.uid !== uid);
            return {team: {...state.team, participants}};
        }
    },
    updateParticipant: (state, uid, data) => {
        if (state.team) {
            const participants = state.team.participants;
            const index = participants.findIndex((p) => p.uid === uid);
            if (index !== -1) {
                participants[index] = {...participants[index], ...data};
                return {team: {...state.team, participants: [...participants]}};
            }
        }
    },

    getRounds: state => {
        return api.get(`/api_v2/contests/${state.contest}/rounds/`).then(res => ({
            rounds: res.rounds,
            tasks: res.rounds.reduce((arr, r) => [...arr, ...r.tasks], []),
        }))
    },
    setAvatar: (state, image, cropping) => ({ user:  {...state.user, image, cropping}}),
    setTrackRegistration : (state, teamId, trackId)=> ({trackRegistration: { teamId, trackId}}),
    setTeamAvatar : (state, avatar, cropping)=>({team: {...state.team, avatar, cropping}}),
    setInvitationsCounter: (state, invitationsCounter) => ({invitationsCounter}),
});

export default actions;
