import { __DEV } from "../../isDev";

export function managerMessages
    (state = [], action)
{
    switch (action.type) {
        case 'MANAGER_MESSAGES':
            __DEV && console.log(action.data);
            return action.data;
        default:
            return state;
    }
}
