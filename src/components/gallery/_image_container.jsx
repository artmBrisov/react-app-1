import React from 'react';
import styled from 'styled-components';

import {ClickableImage} from "./_image.jsx";

let Container = styled.div`
    display: flex;
    flex-flow: row wrap;
   
    @media screen and (max-width: 660px) {
        justify-content: center;
    }
`;

export const ImageContainer = ({images, onClick}) => {
    return <div>
        <Container>
            {images.map(i => <ClickableImage
                id={i.id}
                alt={`Image ${i.id}`}
                url={i.url}
                onClick={onClick}
                key={i.id} />
            )}
        </Container>
    </div>
}
