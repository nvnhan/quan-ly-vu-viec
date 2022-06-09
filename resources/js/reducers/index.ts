import { combineReducers } from "redux";
import { User } from "../utils";
import authUser from "./authUser";
import pageTitle from "./pageTitle";

export interface AppState {
    pageTitle: string,
    authUser: User
}
export const myReducer = combineReducers<AppState>({
    pageTitle,
    authUser,
});
