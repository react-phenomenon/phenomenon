import React from 'react';
import { Container, Element, Link, List } from './NavigationStyles';

export const Navigation = () => (
    <Container>
        <List>
            <Element>
                <Link to="/">Landing page</Link>
            </Element>
        </List>
    </Container>
);
