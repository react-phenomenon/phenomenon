import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { LandingPageScreen } from './screens/LandingPageScreen';
import { store } from './store';

export const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <>
                <Route path="/" exact component={LandingPageScreen} />
            </>
        </BrowserRouter>
    </Provider>
);
