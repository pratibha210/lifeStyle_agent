import { __DEV } from "../../isDev";

export function referenceCatList
    (state = [], action)
{
    switch (action.type) {
        case 'REFERENCECAT_LIST':
            __DEV && console.log(action.data);
            return action.data;
        default:
            return state;
    }
}
