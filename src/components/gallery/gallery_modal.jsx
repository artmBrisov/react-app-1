import React from 'react'
import styled from 'styled-components';

import {GalleryForm} from "./_gallery_form.jsx";
import {ModalImage} from "./_image.jsx";
import {Comments} from "./_gallery_comments.jsx";
import {Loader} from "./_loader.jsx";
import {Snackbar} from "./_snackbar.jsx";

const SERVER = "https://boiling-refuge-66454.herokuapp.com/images";

let ModalWrapper = styled.div`
    position: fixed;
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
    transition: visibility .2s linear, opacity .2s linear;
    
    &.modal-close {
        visibility: hidden;
        opacity: 0;
    }
`;

let ModalDiv = styled.div`
    width: 60%;
    min-height: 60%;
    background-color: white;
    position: relative;
    
    @media screen and (max-width: 960px) {
        width: 80%;
        min-height: 60%;
    }    
        
    @media screen and (max-width: 600px) {
        width: 100%;
        min-height: 110%;
        overflow-y: auto;
    }
`;

let ModalCloseButton = styled.button`
  z-index: 20000;
  border: none;
  outline: none;
  position: absolute;
  font-weight: bold;
  top: 10px;
  right: 20px;
  width: 80px;
  height: 80px;
  color: white;
  cursor: pointer;
  font-size: 48px;
  border-radius: 50px;
  background-color: #4997d0;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
`

let LeftSection = styled.div`
   width: 60%;
   margin-bottom: 20px;
     
   @media screen and (max-width: 600px) {
      padding: 0;
      margin-bottom: 10px;
      margin-left: 0;
      width: 100%;
   }
`;

let RightSection = styled.div`
   width: 30%;
   margin-left: 30px;
   
    @media screen and (max-width: 600px) {
      width: 90%;
      margin-left: 0;
      margin-top: 10px;
      margin-bottom: 20px;
   }
`;

let FormSection = styled.div`
   width: 60%;
  
   @media screen and (max-width: 600px) {
      width: 100%;
      margin-left: 10px;
      margin-right: 10px;
   }  
`

let ModalBody = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  
  @media screen and (max-width: 600px) {
      padding: 0;
      flex-flow: column nowrap;
      align-items: center;
  }
`

let LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
  z-index: 100000;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export class GalleryModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadUrl : null,
            url : null,
            id : null,
            comments : [],
            isInit : false,
            error : {
                thrown : false,
                message : ""
            },
            showSuccessSnackbar : false
        };

        this.SNACKBAR_LIFETIME = 2500;

        this.formRef = React.createRef();

        this.closeButtonClickListener = () => {
            this.formRef.current.clear();
            this.props.onClick();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loadUrl !== this.props.loadUrl) {
            this.loadImageInfo(this.props.loadUrl);
        }
    }

    setError(message) {
        this.setState({error : {message, thrown : true}});
        setTimeout(() => this.setState({error : {message : "", thrown : false}}), this.SNACKBAR_LIFETIME);
    }

    setSuccess() {
        this.setState({showSuccessSnackbar : true});
        setTimeout(() => this.setState({showSuccessSnackbar : false}), this.SNACKBAR_LIFETIME);
    }

    async postComment(data) {
        try {
            let response = (await fetch(`${SERVER}/${this.state.id}/comments`
                , {
                    method: "POST",
                    body : JSON.stringify({name : data.username, comment : data.comment}),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                }
            ));
            if (!response.ok) {
                this.setError("Не удалось сохранить Ваш комментарий");
            } else {
                this.setState({comments: [
                    ...this.state.comments, {text: data.comment, date: new Date().toLocaleDateString()}]})
                this.setSuccess();
            }
        } catch (e) {
            this.setError("Не удалось сохранить Ваш комментарий");
        }
    }

    async loadImageInfo(loadUrl) {
        try {
            if (loadUrl != null) {
                let data = await (await fetch(loadUrl)).json();
                this.setState({loadUrl : loadUrl, id : data.id, url : data.url, comments : data.comments});
            } else {
                setTimeout(() =>
                    this.setState({loadUrl : null, url : null, id : null, comments : [], isInit : false}), 200);

            }
        } catch (e) {
           this.setError("Не удалось загрузить картинку");
        }
    }

    renderLoader() {
        if (!this.state.isInit)
            return <LoaderWrapper>
                <Loader />
            </LoaderWrapper>
    }

    imageLoadHandle(ev) {
        this.setState({ isInit : true});
    }

    renderMain() {
        return <>
            <LeftSection>
                {this.state.loadUrl != null ? <ModalImage
                    onLoad={this.imageLoadHandle.bind(this)}
                    url={this.state.url} alt={"Selected image"} /> : ""
                }
            </LeftSection>
            <RightSection>
                <Comments comments={this.state.comments} />
            </RightSection>
            <FormSection>
                <GalleryForm ref={this.formRef} onSubmit={this.postComment.bind(this)}/>
            </FormSection>
        </>
    }

    render() {
        return <ModalWrapper className={this.props.className} onKeyUp={this.props.onKeyPress} tabIndex={-1}>
            <ModalCloseButton onClick={this.closeButtonClickListener}>{`\u00d7`}</ModalCloseButton>
            <ModalDiv>
                {this.renderLoader()}
                <ModalBody>
                    {this.renderMain()}
                </ModalBody>
            </ModalDiv>
            <Snackbar bgColor={"red"} text={this.state.error.message} visible={this.state.error.thrown}/>
            <Snackbar bgColor={"green"} text={"Комментарий успешно сохранен"} visible={this.state.showSuccessSnackbar} />
        </ModalWrapper>
    }
}