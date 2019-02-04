import React, { ChangeEvent } from 'react';
import { Button, Container, Input } from './AddTaskInputStyles';

type TProps = {
    value: string;
    onChange(event: ChangeEvent<HTMLInputElement>): void;
    onSubmit(): void;
};

export const AddTaskInput = ({ value, onChange, onSubmit }: TProps) => (
    <Container>
        <Input type="text" value={value} onChange={onChange} />
        <Button onClick={onSubmit}>Add</Button>
    </Container>
);
