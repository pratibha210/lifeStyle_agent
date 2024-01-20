import { __DEV } from "../../isDev";

export function firstChatMessage
    (state = [], action)
{
    switch (action.type) {
        case 'FIRST_MESSAGE_LIST':
            __DEV && console.log(action.data);
            return action.data;
        default:
            return state;
    }
}
