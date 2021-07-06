import React from "react";
import styled from "styled-components";

import { Text, Grid, Btn, Image, Input } from "../elements";


const Posting = (props) => {

  return (
		<React.Fragment>
			<Grid padding="4px 16px">
				<Text bold size="40px" text="게시글 작성"/>
				<Grid is_flex>
					<ImageInput></ImageInput>
					<Btn is_mini text="이미지 선택"/>
				</Grid>
				<Text bold size="20px" text="미리보기"/>
			</Grid>
			<Grid>
				<Image shape="rectangle" src={props.src}/>
			</Grid>
			<Grid padding="4px 16px">
				<Text bold margin="0px">게시글 내용</Text>
				<TextArea placeholder="게시글 작성"/>
				<Btn text="게시글 작성"/>
			</Grid>
		</React.Fragment>
  )
}

Posting.defaultProps = {
	preview: "https://media.vlpt.us/images/pyt4105/post/83f78553-ba38-44c9-aaf8-3f7a715d0701/%EA%B2%B8%EB%91%A5%EC%9D%B4%EB%B2%A4.jpg",

};

const TextArea = styled.textarea`
	width: 100%;
	padding: 12px 12px;
	height: 200px;
	box-sizing: border-box;
	margin-bottom: 20px;
	border: 1px solid #212121;
`;

const ImageInput = styled.input`
	border: none;
	border-bottom: 1px solid #212121;
	width: 70%;
`;

export default Posting;