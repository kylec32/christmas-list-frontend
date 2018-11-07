import { Action } from '@ngrx/store';
import { LOGOUT } from './authentication.reducer';

export const FOLLOWING_LOADED = "FOLLOWING_LOADED";
export const FOLLOWING_ADD = "FOLLOWING_ADD";
export const FOLLOWEE_DELETE = "FOLLOWEE_DELETE";

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export function following(state = [], action: ActionWithPayload<any>) {
    switch (action.type) {
        case FOLLOWING_LOADED:
            return action.payload.following;
        case FOLLOWING_ADD:
            return [...state, action.payload];
        case FOLLOWEE_DELETE:
            return state.filter((follower) => {
                return follower.id != action.payload.toDelete.id;
            });
        case LOGOUT:
            return [];
        default:
            return state;
    }
}