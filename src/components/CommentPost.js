import React from "react";
import styled from "styled-components";
import { Grid, Btn, Input } from "../elements";

const CommentPost = (props) => {

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
				<Input placeholder="댓글 내용을 입력해주세요:)"/>
				<Btn is_mini text="작성"/>
      </Grid>
    </React.Fragment>
    )
}

const CmtInput = styled.input`
  width: 70%;
	height: 50px;
`;

export default CommentPost;