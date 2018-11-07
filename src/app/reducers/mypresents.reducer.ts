import { Action } from '@ngrx/store';
import { LOGOUT } from './authentication.reducer';

export const LOAD_MY_PRESENTS = "LOAD_MY_PRESENTS";
export const ADD_MY_PRESENTS = "ADD_MY_PRESENTS";
export const REMOVE_MY_PRESENTS = "REMOVE_MY_PRESENTS";
export const UPDATE_MY_PRESENTS = "UPDATE_MY_PRESENTS";

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export function mypresents(state = [], action: ActionWithPayload<any>) {
    switch (action.type) {
        case LOAD_MY_PRESENTS:
            return action.payload;
        case ADD_MY_PRESENTS:
            return [...state, action.payload];
        case REMOVE_MY_PRESENTS:
            return state.filter((present) => { return present.id != action.payload; } );
        case UPDATE_MY_PRESENTS:
            const indexOfItem = state.findIndex(present => present.id == action.payload.id);
            const presentList = [...state];
            presentList[indexOfItem] = action.payload;
            return presentList;
        case LOGOUT:
            return [];
        default:
            return state;
    }
}