import React from 'react';
import { Navigation } from '../../components/Navigation';
import { TasksContainer } from '../../containers/TasksContainer';

export const LandingPageScreen = () => (
    <div>
        <Navigation />
        <h2>Landing page</h2>
        <TasksContainer />
    </div>
);
