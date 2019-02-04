import React, { ChangeEvent, PureComponent } from 'react';
import { Tasks } from '../../components/Tasks';
import { TasksT } from '../../types/TasksT';

export type PropsT = {
    tasks: TasksT;
    fetchTasksAction(): Promise<void>;
};

type StateT = {
    addTaskValue: string;
    keptTaskId: string | null;
};

export class TasksContainer extends PureComponent<PropsT, StateT> {
    public state = {
        addTaskValue: '',
        keptTaskId: null,
    };

    public componentDidMount() {
        this.props.fetchTasksAction();
    }

    private onChangeAddTask = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            addTaskValue: event.target.value,
        });
    };

    private onSubmitAddTask = (): void => {
        // const { tasks, addTaskValue } = this.state;
        //     this.setState({
        //         addTaskValue: '',
        //         tasks: [{ id: addTaskValue, content: addTaskValue }, ...tasks],
        //     });
    };

    private onRemoveTask = (taskId: string): void => {
        taskId;
        // this.setState({
        //     tasks: this.state.tasks.filter(task => task.id !== taskId),
        // });
    };

    private onDragStart = (event: any) => {
        this.setState({
            keptTaskId: event.target.id,
        });
    };

    private onDragOver = (event: any) => {
        event.preventDefault();
    };

    private onDrop = (event: any) => {
        const tasks = this.props.tasks;
        const indexFrom = tasks.findIndex(task => task.id === this.state.keptTaskId);
        const indexTo = tasks.findIndex(task => task.id === event.target.id);
        const cutOut = tasks.splice(indexFrom, 1)[0];
        tasks.splice(indexTo, 0, cutOut);

        this.setState({
            keptTaskId: null,
        });
    };

    public render() {
        const { addTaskValue } = this.state;
        const { tasks } = this.props;

        return (
            <Tasks
                addTaskValue={addTaskValue}
                onChangeAddTask={this.onChangeAddTask}
                onDragOver={this.onDragOver}
                onDragStart={this.onDragStart}
                onDrop={this.onDrop}
                onRemoveTask={this.onRemoveTask}
                onSubmitAddTask={this.onSubmitAddTask}
                tasks={tasks}
            />
        );
    }
}
