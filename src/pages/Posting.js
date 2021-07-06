import React from "react";
import styled from "styled-components";
import Upload from "../shared/Upload";

import { Text, Grid, Btn, Image, Input } from "../elements";


const Posting = (props) => {

  return (
		<React.Fragment>
			<Grid padding="4px 16px">
				<Text bold size="36px" text="게시글 작성"/>
				<Grid is_flex>
					<Upload/>
					<Btn is_mini text="이미지 선택"/>
				</Grid>
				<Text bold size="20px" margin="0px">미리보기</Text>
			</Grid>
			<Grid>
				<Image shape="rectangle" src={props.src}/>
			</Grid>
			<Grid padding="4px 16px">
				<Input multiLine label="게시글 내용" placeholder="게시글 작성"/>
				<Btn text="게시글 작성"/>
			</Grid>
		</React.Fragment>
  )
}

Posting.defaultProps = {
	preview: "https://media.vlpt.us/images/pyt4105/post/83f78553-ba38-44c9-aaf8-3f7a715d0701/%EA%B2%B8%EB%91%A5%EC%9D%B4%EB%B2%A4.jpg",

};

const ImageInput = styled.input`
	border: none;
	border-bottom: 1px solid #212121;
	width: 70%;
`;

export default Posting;