import React from 'react';

export class GalleryForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form autoComplete={false} spellCheck={false}>
                <div>
                    <input type={"text"} name={"username"} />
                </div>
                <div>
                    <input type={"text"} name={"comment"} />
                </div>
                <div>
                    <input type={"submit"} value={"Отправить"}/>
                </div>
            </form>
        );
    }
}