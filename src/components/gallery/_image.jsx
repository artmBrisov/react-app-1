import React from 'react';
import styled from 'styled-components';

import {Loader} from './_loader.jsx';

export const Wrapper = styled.div`
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

const Img = styled.img`
    width: 100%;
    height: auto;
    
    &.image-visible {
      visibility: visible;
    }
    
    &.image-hidden {
      visibility: hidden;
    }
`;

let ClickableImg = styled(Img)`
     cursor: pointer;
`;

let FullSizeWrapper = styled(Wrapper)`
    width: 100%;
    margin: 0;
`;

export class Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isImageLoaded : false
        }

        this.loadHandler = this.loadHandler.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.url !== this.props.url) this.setState({isImageLoaded : false});
    }

    loadHandler(ev) {
        this.setState({isImageLoaded: true});
        if (this.props.onLoad) this.props.onLoad(ev);
    }

    render() {
        return <Wrapper>
            <Loader className={this.state.isImageLoaded === false ? "loader-visible" : "loader-hidden"} />
            <Img
                src={this.props.url}
                alt={this.props.alt}
                className={this.state.isImageLoaded ? "image-visible" : "image-hidden"}
                onLoad={this.loadHandler}/>
            </Wrapper>
    }
}

export class ClickableImage extends Image {
    constructor(props) {
        super(props);
    }

    render() {
        return <Wrapper>
            <Loader className={this.state.isImageLoaded === false ? "loader-visible" : "loader-hidden"} />
            <ClickableImg
                src={this.props.url}
                alt={this.props.alt}
                className={this.state.isImageLoaded ? "image-visible" : "image-hidden"}
                onLoad={this.loadHandler}
                onClick={this.props.onClick}
                id={this.props.id}
            />
        </Wrapper>
    }
}

export class ModalImage extends Image {
    constructor(props) {
        super(props);
    }

    render() {
        return <FullSizeWrapper>
            <Loader className={this.state.isImageLoaded === false ? "loader-visible" : "loader-hidden"} />
            <Img
                src={this.props.url}
                alt={this.props.alt}
                className={this.state.isImageLoaded ? "image-visible" : "image-hidden"}
                onLoad={this.loadHandler}
            />
        </FullSizeWrapper>
    }
}