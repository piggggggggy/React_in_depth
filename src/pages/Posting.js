import React, {useState} from "react";
import styled from "styled-components";
import Upload from "../shared/Upload";

import { Text, Grid, Btn, Image, Input } from "../elements";

// 로그인이 됬을 때만 들어올 수 있게 하기
// => App.js 에서 이미 세션 확인을 했으므로
// is_login 만 확인하면 된다!!
// is_login 을 확인하기 위해선!
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";



const Posting = (props) => {
	// dispatch
	const dispatch = useDispatch();

	// 일단 is_login 가져오기, user.js에 있음
	const is_login = useSelector((state) => state.user.is_login);
	const {history} = props; // 미들웨어 만들어놔서 props 로 가져오나??????
	const preview = useSelector((state) => state.image.preview);

	// textarea 값 받아오기
	const [contents, setContents] = React.useState('');
	// 함수 만들기  
	const changeContents = (e) => {
    setContents(e.target.value);
	}

	// addPost 함수 만들기
	const addPost = () => {
		dispatch(postActions.addPostFB(contents));
	};


	if(!is_login){
		return (
			<Grid margin="100px 0px" padding="16px" center>
				<Text size="32px" bold>앗! 잠깐!</Text>
				<Text size="16px">로그인 후에만 글을 쓸 수 있단다! 욘석아!</Text>
				<Btn _onClick={()=>{history.replace('/login');}}></Btn>
			</Grid>
		)
	}
  return (
		<React.Fragment>
			<Grid padding="4px 16px">
				<Text bold size="36px">게시글 작성</Text>
				<Upload/>
				<Text bold size="20px" margin="0px">미리보기</Text>
			</Grid>
			<Grid>
				<Image shape="rectangle" src={preview? preview:"https://via.placeholder.com/400x300"}/>
			</Grid>
			<Grid padding="4px 16px">
				<Input _onChange={changeContents} multiLine label="게시글 내용" placeholder="게시글 작성"/>
				<Btn text="게시글 작성" _onClick={addPost}/>
			</Grid>
		</React.Fragment>
  )
}

Posting.defaultProps = {
	preview: "https://via.placeholder.com/400x300",

};

const ImageInput = styled.input`
	border: none;
	border-bottom: 1px solid #212121;
	width: 70%;
`;

export default Posting;