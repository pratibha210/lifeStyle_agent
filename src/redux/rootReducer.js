import { combineReducers } from "redux";
import { userDetail } from "./reducers/userDetail";
import { trainingVideos } from "./reducers/trainingVideos";
import { messages } from "./reducers/messages";
import {managerMessages} from './reducers/managerMessages';
import {categoryList} from './reducers/categoryList';
import {marketCatList} from './reducers/marketCatList';
import {referenceCatList} from './reducers/referenceCatList';
import {firstChatMessage} from './reducers/firstChatMessage';

const rootReducer = combineReducers({
  userDetail,
  trainingVideos,
  messages,
  managerMessages,
  categoryList,
  marketCatList,
  referenceCatList,
  firstChatMessage
});

export default rootReducer;
