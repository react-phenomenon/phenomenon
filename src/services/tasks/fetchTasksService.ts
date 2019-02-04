import { TASKS } from '../../mocks/tasks';

export const fetchTasksService = () =>
    fetch('https://jsonplaceholder.typicode.com/todos/2', { method: 'GET' }).then(
        response => {
            if (!response.ok) {
                throw response.statusText;
            }
            return TASKS;
            return response.json();
        }
    );
