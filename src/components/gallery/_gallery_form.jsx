import React from 'react';
import styled from 'styled-components';

let FormInputWrapper = styled.div`
   margin-top: 10px;
   margin-bottom: 10px;
   width: 100%;
   text-align: center;
`;

let Form = styled.form`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`

let FormInput = styled.input`
    display: inline-block;
    outline: none;
    width: 100%;
    box-sizing: border-box;
   
    font-size: 1rem;
    font-family: "Ubuntu Light", sans-serif;
    height: 40px;
    padding: 0;
    white-space: unset;
    
    @media screen and (max-width: 600px) {
        width: 90%;
    }
`;

let FormTextInput = styled(FormInput)`   
    border: 1px solid grey;
    text-indent: 10px;
    &:focus {
        border: 1px solid #4997d0;
    }
    
    &.invalid {
        border: 1px solid red;
    }
`;

let InvalidFeedback = styled.div`
    color: red;
    font-size: 0.8rem;
    height: 0.8rem;
`;

let FormSubmitInput = styled(FormInput)`
    color: white;
    box-shadow: none;
    background-color: #4997d0;
    cursor: pointer;
    border: none;
`

export class GalleryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username : {
                value : "",
                isValid : undefined,
                errorMessage : "",
            },
            comment : {
                value : "",
                isValid: undefined,
                errorMessage: ""
            }
        }

        let userNameValidationRules = [
            (v) => v.trim().length === 0 ? "Поле не может быть пустым" : "",
            (v) => v.trim().length < 5 ? "Минимальная длина - 5 символов" : "",
            (v) => v.trim().length > 30 ? "Максимальная длина - 30 символов" : "",
            (v) => /([^\p{Alpha}\s-])/gu.test(v) ? "Допустимы только буквы и пробелы" : ""
        ];

        let commentValidationRules = [
            (v) => v.trim().length === 0 ? "Поле не может быть пустым" : "",
            (v) => v.trim().length < 10 ? "Минимальная длина - 10 символов" : "",
            (v) => v.trim().length > 150 ? "Максимальная длина - 150 символов" : "",
            (v) => /([^\p{Alpha}\s\d-])/gu.test(v) ? "Допустимы только буквы, цифры и пробелы" : ""
        ];

        this.userNameInputHandler = (ev) => {
            let value = ev.target.value;
            let errMsg = this.validate(value, userNameValidationRules);
            if (errMsg.length)  {
                this.setState({username : {isValid : false, errorMessage : errMsg}});
            } else {
                this.setState({username : {value, isValid : true, errorMessage : ""}});
            }
        }

        this.commentInputHandler = (ev) => {
            let value = ev.target.value;
            let errMsg = this.validate(value, commentValidationRules);
            if (errMsg.length)  {
                this.setState({comment : {isValid : false, errorMessage : errMsg}});
            } else {
                this.setState({comment : {value, isValid : true, errorMessage : ""}});
            }
        }

        this.inputRefs = {
            "username" : {
                ref : React.createRef(),
                rule : userNameValidationRules
            },
            "comment" : {
                ref : React.createRef(),
                rule : commentValidationRules
            }
        }

        this.submitHandler = (ev) => {
            ev.preventDefault();
            let resultRefs = {};
            for (let refName of Object.keys(this.inputRefs)) {
                resultRefs[refName] =
                    this.validate(this.inputRefs[refName].ref.current.value, this.inputRefs[refName].rule);
            }

            let totalValidationResult = Object.keys(resultRefs).reduce((prev, current) => {
                let value = resultRefs[current];
                if (!value.length) return prev && true;
                let stateSnapshot = {};
                stateSnapshot[current] = {isValid : false, errorMessage : value}
                this.setState(stateSnapshot);
                return false;
            }, true);

            if (totalValidationResult) {
                let submit = this.props.onSubmit;
                if (submit) submit({"username" : this.state.username.value, "comment" : this.state.comment.value})
            }
        }
    }

    validate(value, rules) {
        let errorMessage = "";
        for (let rule of rules) {
            let errMsg = rule(value);
            if (errMsg.length) {
                errorMessage = errMsg;
                break;
            }
        }
        return errorMessage;
    }

    getClassNameFor(name) {
        return this.state[name].isValid !== false
            ? ""
            : "invalid";
    }

    render() {
        return (
            <Form autoComplete={"off"} spellCheck={"off"} onSubmit={this.submitHandler}>
                <FormInputWrapper>
                    <FormTextInput
                        className={this.getClassNameFor("username")}
                        onInput={this.userNameInputHandler}
                        onFocus={this.userNameInputHandler}
                        onBlur={this.userNameInputHandler}
                        type={"text"}
                        name={"username"}
                        placeholder={"Ваше имя"}
                        ref={this.inputRefs["username"].ref}
                    />
                    <InvalidFeedback>{this.state.username.errorMessage}</InvalidFeedback>
                </FormInputWrapper>
                <FormInputWrapper>
                    <FormTextInput
                        className={this.getClassNameFor("comment")}
                        onInput={this.commentInputHandler}
                        onFocus={this.commentInputHandler}
                        onBlur={this.commentInputHandler}
                        type={"text"}
                        name={"comment"}
                        placeholder={"Ваш комментарий"}
                        ref={this.inputRefs["comment"].ref}
                    />
                    <InvalidFeedback>{this.state.comment.errorMessage}</InvalidFeedback>
                </FormInputWrapper>
                <FormInputWrapper>
                    <FormSubmitInput type={"submit"} value={"Отправить"}/>
                </FormInputWrapper>
            </Form>
        );
    }
}