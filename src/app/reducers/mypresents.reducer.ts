import { Action } from '@ngrx/store';

export const LOAD_MY_PRESENTS = "LOAD_MY_PRESENTS";

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export function mypresents(state = [], action: ActionWithPayload<any>) {
    console.log(action.type);
    switch (action.type) {
        case LOAD_MY_PRESENTS:
            return action.payload;
        default:
            return state;
    }
}