import { __DEV } from "../../isDev";

export function marketCatList
    (state = [], action)
{
    switch (action.type) {
        case 'MARKETCAT_LIST':
            __DEV && console.log(action.data);
            return action.data;
        default:
            return state;
    }
}
