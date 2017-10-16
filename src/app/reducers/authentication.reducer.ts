import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FOLLOWING_LOADED = "FOLLOWING_LOADED";
export const FOLLOWEE_DELETE = "FOLLOWEE_ID";

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

interface AppState {
    key:String,
    following:any
}

export function loginReducer(state = <AppState>{}, action: ActionWithPayload<any>) {
    console.log(action.type);
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {key: action.payload.token});
        case LOGOUT:
            return Object.assign({}, state, {key: null});
        case FOLLOWING_LOADED:
            return Object.assign({}, state, {following: action.payload.following});
        case FOLLOWEE_DELETE:
            let deleteIndex = state.following.indexOf(action.payload.toDelete);
            return Object.assign({}, state, {following: state.following.splice(deleteIndex, 1)});
        default:
            return state;
    }
}