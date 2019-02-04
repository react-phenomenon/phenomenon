import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.nav`
    background-color: #fff;
`;

export const List = styled.ul`
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: auto auto;
`;

export const Element = styled.li`
    list-style: none;
`;

export const Link = styled(NavLink)`
    display: block;
    padding: 1em 2em;
    text-align: center;
    text-decoration: none;
    color: #333;
    border: 1px solid #ddd;
    &:hover {
        background-color: #eee;
    }
`;
