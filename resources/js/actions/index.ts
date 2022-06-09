import * as Types from "../constants/ActionTypes";
import { Action, User } from "../utils";

export const changeTitle = (title: String): Action => {
    return {
        type: Types.CHANGE_PAGE_TITLE,
        payload: title
    };
};

export const logout = (): Action => {
    return { type: Types.LOGOUT };
};

export const setAuth = (auth: User): Action => {
    return { type: Types.SET_AUTH, payload: auth };
};
