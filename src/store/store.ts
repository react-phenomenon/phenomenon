import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { TasksT } from '../types/TasksT';
import { tasksReducers } from './tasks';

export type StoreT = {
    tasks: TasksT;
};

const reducers = combineReducers({
    tasks: tasksReducers,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(reducers, enhancer);
