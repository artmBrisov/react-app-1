import React from 'react';
import styled from "styled-components";

import {ImageContainer} from "./_image_container.jsx";
import {GalleryModal} from "./gallery_modal.jsx";

const SERVER = "https://boiling-refuge-66454.herokuapp.com/images";

let loadImages = async () => {
    let response = await fetch(SERVER);
    if (!response.ok) {
        throw new Error("Unable to load images");
    }
    return await response.json();
}

let GalleryWrapper = styled.div`
    text-align: center;
`;

let Header = styled.h1`
    font-family: "Ubuntu Light", sans-serif;
    font-size: 2rem;
    font-weight: lighter;
    margin-bottom: 30px;
`;

export class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images : [],
            isModalOpen : false,
            isInit : false,
            currentImageId : null
        }

        let imageClickListener = (id) => this.openModal(id);
        let modalCloseListener = () => this.closeModal();
        let keyPressEscapeListener = (ev) => {
            if (ev.key === "Escape") modalCloseListener();
        }

        this.imageClickListener = imageClickListener;
        this.keyPressEscapeListener = keyPressEscapeListener;
        this.closeModalButtonListener = modalCloseListener;

        this.loadImagesIntervalHandle = null;
        this.loadImagesErrorTimeout = 30000;
    }

    async tryLoadImages() {
        let data = await loadImages();
        this.setState({images : data, isInit : true});
        clearInterval(this.loadImagesIntervalHandle);
    }

    componentDidMount() {
        this.tryLoadImages().catch(() => {
            setInterval(this.tryLoadImages.bind(this), this.loadImagesErrorTimeout);
        });
    }

    openModal(id) {
        document.body.style.overflow = "hidden";
        this.setState({isModalOpen : true, currentImageId : id});
    }

    closeModal() {
        document.body.style.overflow = "auto";
        this.setState({isModalOpen : false, currentImageId : null});
    }

    getModalClassName() {
        return this.state.isModalOpen ? "modal-open" : "modal-close";
    }

    render() {
        return <GalleryWrapper>
            <GalleryModal
                className={this.getModalClassName()}
                onKeyPress={this.keyPressEscapeListener}
                onClick={this.closeModalButtonListener}
                loadUrl={this.state.currentImageId ? `${SERVER}/${this.state.currentImageId}/` : null}
            />
            <Header>TEST APP</Header>
            <ImageContainer
                images={this.state.images}
                onClick={this.imageClickListener}
            />
        </GalleryWrapper>
    }
}