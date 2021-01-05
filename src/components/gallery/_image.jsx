import React from 'react';
import styled from 'styled-components';

let Wrapper = styled.div`
    width: 30%;
    margin-bottom: 30px;
    margin-left: 20px;
    user-select: none;
    
    @media screen and (max-width: 600px) {
        margin-left: 0;
        width: 75%;
    }
    
    @media screen and (max-width: 500px) {
        width: 90%;
    }
`;

let Img = styled.img`
    width: 100%;
    height: auto;
`;

export const Image = ({url, alt}) => {
    return <Wrapper>
        <Img src={url} alt={alt} />
    </Wrapper>
}

let ClickableImg = styled(Img)`
     cursor: pointer;
`;

export const ClickableImage = ({url, alt, id, onClick}) => {
    let clickHandler = () => onClick(id);
    return <Wrapper>
        <ClickableImg alt={alt} src={url} onClick={clickHandler} />
    </Wrapper>
}