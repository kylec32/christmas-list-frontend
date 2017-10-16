import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

interface AppState {
    key:String,
    following:any
}

export function token(state = null, action: ActionWithPayload<any>) {
    console.log(action.type);
    switch (action.type) {
        case LOGIN:
            return action.payload.token;
        case LOGOUT:
            return null;
        default:
            return state;
    }
}