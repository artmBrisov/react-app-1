import React from 'react'
import styled from 'styled-components';

import {GalleryForm} from "./_gallery_form.jsx";
import {Image, ClickableImage} from "./_image.jsx";

let Wrapper = styled.div`
    position: absolute;
    visibility: visible;
    width: 100%;
    top: 0;
    left: 0;
    height: 100vh;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    opacity: 1;
    transition: visibility .25s , opacity .25s ease;
    
    &.modal-close {
        visibility: hidden;
        opacity: 0;
    }
`;

let ModalDiv = styled.div`
    width: 60%;
    height: 60%;
    background-color: white;
    position: relative;
    
    @media screen and (max-width: 960px) {
        width: 80%;
        height: 80%;
    }    
        
    @media screen and (max-width: 600px) {
        width: 100%;
        height: 100%;
    }
`;

let ModalCloseButton = styled.button`
  border: none;
  outline: none;
  position: absolute;
  top: 10px;
  right: 20px;
  width: 50px;
  height: 50px;
  color: grey;
  cursor: pointer;
  font-size: 48px;
  background-color: transparent;
`

export class GalleryModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadUrl : null,
            url : null,
            id : null,
            comments : [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loadUrl !== this.props.loadUrl) {
            this.loadImageInfo(this.props.loadUrl);
        }
    }

    async loadImageInfo(loadUrl) {
        try {
            if (loadUrl != null) {
                let data = await (await fetch(loadUrl)).json();
                this.setState({id : data.id, url : data.url, comments : data.comments});
            } else {
                this.setState({url : null, id : null, comments : []});
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        return (
            <Wrapper className={this.props.className} onKeyUp={this.props.onKeyPress} tabIndex={-1}>
                <ModalDiv>
                    <ModalCloseButton onClick={this.props.onClick}>{`\u00D7`}</ModalCloseButton>
                    {this.props.loadUrl != null ? <Image url={this.state.url} alt={"Selected image"} /> : ""}
                    <GalleryForm />
                </ModalDiv>
            </Wrapper>
        );
    }
}