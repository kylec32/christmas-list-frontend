import { Action } from '@ngrx/store';

export const LOAD_OTHER_PRESENTS = "LOAD_OTHER_PRESENTS";

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export function presents(state = [], action: ActionWithPayload<any>) {
    console.log(action.type);
    switch (action.type) {
        case LOAD_OTHER_PRESENTS:
            return action.payload;
        default:
            return state;
    }
}