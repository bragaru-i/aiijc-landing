import {useMemo} from "preact/hooks";

export const useIsTeamLeader = ({user, team}) => {
    return useMemo(() => {
        if (user && team) {
            return team.participants.some((p) => p.is_leader && p.user.id === user.id);
        }

        return false;
    }, [user, team]);
};