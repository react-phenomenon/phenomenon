import { TasksT } from '../../types/TasksT';
import {
    FetchTasksActionStartActionT,
    FetchTasksActionSuccessActionT,
} from './tasksActions';
import * as TYPES from './tasksTypes';

type ActionsT = FetchTasksActionStartActionT | FetchTasksActionSuccessActionT;

const initialState: TasksT = [];

export const tasksReducers = (state: TasksT = initialState, action: ActionsT) => {
    switch (action.type) {
        case TYPES.TASKS_FETCH_TASKS_START:
            return state;
        case TYPES.TASKS_FETCH_TASKS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
