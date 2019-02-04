import React, { ChangeEvent } from 'react';
import { TasksT } from '../../types/TasksT';
import { AddTaskInput } from '../AddTaskInput';
import { Task } from '../Task';
import { Container, List } from './TasksStyles';

type TasksPropsT = {
    addTaskValue: string;
    onChangeAddTask(event: ChangeEvent<HTMLInputElement>): void;
    onDragOver(event: any): void;
    onDragStart(event: any): void;
    onDrop(event: any): void;
    onRemoveTask(taskId: string): void;
    onSubmitAddTask(): void;
    tasks: TasksT;
};

export const Tasks = ({
    addTaskValue,
    onChangeAddTask,
    onDragOver,
    onDragStart,
    onDrop,
    onRemoveTask,
    onSubmitAddTask,
    tasks,
}: TasksPropsT) => (
    <Container>
        <AddTaskInput
            value={addTaskValue}
            onChange={onChangeAddTask}
            onSubmit={onSubmitAddTask}
        />
        <List onDragOver={onDragOver} onDrop={onDrop}>
            {tasks &&
                tasks.length &&
                tasks.map(task => (
                    <Task
                        key={task.id}
                        {...task}
                        onRemoveTask={onRemoveTask}
                        onDragStart={onDragStart}
                    />
                ))}
        </List>
    </Container>
);
