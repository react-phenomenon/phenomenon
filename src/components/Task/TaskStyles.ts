import styled from 'styled-components';

export const Container = styled.li`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    list-style: none;
    padding: 0.5em;
    border: 1px solid #eee;
    border-radius: 0.2em;
    margin: 0.2em 0;
    transition: 0.2s border;
    background-color: #fff;
    cursor: move;
    &:hover {
        border-color: #ccc;
    }
`;

export const RemoveButton = styled.button`
    font: inherit;
    background-color: #f5f5f5;
    color: #c30707;
    border: 1px solid #ddd;
    border-radius: 0.2em;
    padding: 0.2em 0.5em;
    transition: 0.2s border;
    &:hover {
        border: 1px solid #ccc;
    }
    cursor: pointer;
`;
