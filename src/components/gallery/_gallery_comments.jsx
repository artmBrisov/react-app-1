import React from 'react';
import styled from 'styled-components';

let CommentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    font-family: 'Ubuntu Light', sans-serif;
    text-align: left;
    font-size: 1.2rem;
`;

let Comment = styled.div`
  &:not(:last-child) {
      margin-bottom: 30px;
  }
`;

let CommentDate = styled.div`
    color: grey;
`;

let CommentText = styled.div`
`;

export const Comments = ({comments}) => {
    return <CommentWrapper>
        {comments.length === 0
            ? <div>Комментариев пока нет</div>
            : comments.map((c,index) =>
                <Comment key={index}>
                    <CommentDate>{new Date(c.date).toLocaleDateString()}</CommentDate>
                    <CommentText>{c.text}</CommentText>
                </Comment>
            )
        }
    </CommentWrapper>
}