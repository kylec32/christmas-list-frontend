import { Action } from '@ngrx/store';

export const FOLLOWING_LOADED = "FOLLOWING_LOADED";
export const FOLLOWEE_DELETE = "FOLLOWEE_ID";

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export function following(state = [], action: ActionWithPayload<any>) {
    console.log(action.type);
    switch (action.type) {
        case FOLLOWING_LOADED:
            return action.payload.following;
        case FOLLOWEE_DELETE:
            let deleteIndex = state.indexOf(action.payload.toDelete);
            return state.splice(deleteIndex, 1);
        default:
            return state;
    }
}