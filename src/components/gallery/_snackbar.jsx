import React from 'react';
import styled from 'styled-components';

let SnackbarWrapper = styled.div`
    position: fixed;
    z-index: 100000;
    bottom: 10px;
    width: 100%;
    font-size: 1.5rem;
    font-family: "Ubuntu Light", sans-serif;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    transition: visibility .2s linear, opacity .2s linear;
    opacity: 1;
    visibility: visible;
    
    &.hidden {
        opacity: 0;
        visibility: hidden;
    }
`

let SnackbarBody = styled.div`
    min-height: 75px;
    border-radius: 5%;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.20);
    color: ${props => props.color};
    background-color: ${props => props.bgColor};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 10px;
    width: 70%;
    
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;

export const Snackbar = ({color, bgColor, text, visible}) => {
    return <SnackbarWrapper className={visible ? "" : "hidden"}>
        <SnackbarBody color={color || "#fff"} bgColor={bgColor || "green"}>{text}</SnackbarBody>
    </SnackbarWrapper>
}