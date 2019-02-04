import React, { PureComponent } from 'react';
import { TaskT } from '../../types/TasksT';
import { Container, RemoveButton } from './TaskStyles';

type PropsT = {
    onRemoveTask(taskId: string): void;
    onDragStart(event: any): void;
} & TaskT;

export class Task extends PureComponent<PropsT> {
    public onRemoveTasks = (): void => {
        this.props.onRemoveTask(this.props.id);
    };

    public render() {
        const { content, id, onDragStart } = this.props;
        return (
            <Container draggable onDragStart={onDragStart} id={id}>
                {content} <RemoveButton onClick={this.onRemoveTasks}>Remove</RemoveButton>
            </Container>
        );
    }
}
