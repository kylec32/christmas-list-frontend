import { Present } from "./present";

export interface FolloweeWithPresents {
    name: string,
    id: string,
    presents: Present[]
}