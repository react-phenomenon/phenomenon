import { Dispatch } from 'redux';
import { fetchTasksService } from '../../../services/tasks';
import { TasksT } from '../../../types/TasksT';
import { TASKS_FETCH_TASKS_START, TASKS_FETCH_TASKS_SUCCESS } from '../tasksTypes';

export type FetchTasksActionStartActionT = {
    type: typeof TASKS_FETCH_TASKS_START;
};

export type FetchTasksActionSuccessActionT = {
    type: typeof TASKS_FETCH_TASKS_SUCCESS;
    payload: TasksT;
};

const fetchTasksActionStart = (): FetchTasksActionStartActionT => ({
    type: TASKS_FETCH_TASKS_START,
});

const fetchTasksActionSuccess = (payload: TasksT): FetchTasksActionSuccessActionT => ({
    type: TASKS_FETCH_TASKS_SUCCESS,
    payload,
});

export const fetchTasksAction = () => async (dispatch: Dispatch): Promise<void> => {
    dispatch(fetchTasksActionStart());

    const payload = await fetchTasksService();

    dispatch(fetchTasksActionSuccess(payload));
};
