import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 0.2em;
    justify-items: stretch;
    align-items: stretch;
    margin: 0.2em 0;
`;

export const Input = styled.input`
    font-size: inherit;
    border: 1px solid #ddd;
    border-radius: 0.2em;
    padding: 0.5em;
    &:focus {
        outline: none;
        border-color: #ccc;
    }
`;

export const Button = styled.button`
    font: inherit;
    background-color: #f5f5f5;
    color: #51a000;
    border: 1px solid #ddd;
    border-radius: 0.2em;
    padding: 0.2em 0.5em;
    transition: 0.2s border;
    &:hover {
        border: 1px solid #ccc;
    }
    cursor: pointer;
`;
