import { __DEV } from "../../isDev";

export function categoryList
    (state = [], action)
{
    switch (action.type) {
        case 'CATEGORY_LIST':
            __DEV && console.log(action.data);
            return action.data;
        default:
            return state;
    }
}
