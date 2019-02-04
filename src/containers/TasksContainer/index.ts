import { connect } from 'react-redux';
import { StoreT } from '../../store';
import { fetchTasksAction } from '../../store/tasks';
import { PropsT, TasksContainer as TasksComponent } from './TasksContainer';

type TypesFromStateT = Pick<PropsT, 'tasks'>;

const mapStateToProps = (state: StoreT): TypesFromStateT => ({
    tasks: state.tasks,
});

const mapDispatchToProps = {
    fetchTasksAction,
};

export const TasksContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksComponent);
