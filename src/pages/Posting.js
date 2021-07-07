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
import { actionCreators as imageActions } from "../redux/modules/image";
	// 수정페이지에서 프리뷰에 값을 주는데 왜 setPreview 를 해주며 이건 왜부르는거???

// 메인
const Posting = (props) => {
	// dispatch
	const dispatch = useDispatch();

	// 일단 is_login 가져오기, user.js에 있음
	const is_login = useSelector((state) => state.user.is_login);
	const {history} = props; // 미들웨어 만들어놔서 props 로 가져오나??????
	const preview = useSelector((state) => state.image.preview);
	const post_list = useSelector((state) => state.post.list);

	// id 값이 undefined 면 수정이 아니라 작성페이지
	console.log(props.match.params.id);

	const post_id = props.match.params.id;
	const is_edit = post_id? true: false;

	let _post = is_edit? post_list.find((p) => p.id === post_id) : null;

	

	// textarea 값 받아오기
	const [contents, setContents] = React.useState(_post? _post.contents : "");

	// useEffect가 어떨때 쓰이지..
	React.useEffect(() => {
		if(is_edit && !_post){
			console.log('포스트 정보가 없어요!!');
			history.goBack();
			return;
		}
		if(is_edit){
			dispatch(imageActions.setPreview(_post.image_url));
		}
	},[]);

	// 함수 만들기  
	const changeContents = (e) => {
    setContents(e.target.value);
	}

	// addPost 함수 만들기
	const addPost = () => {
		dispatch(postActions.addPostFB(contents));
	};

	// editPost 함수 만들기
	const editPost = () => {
		dispatch(postActions.editPostFB(post_id, {contents: contents}));
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
				<Text bold size="36px">{is_edit? "게시글 수정" : "게시글 작성"}</Text>
				<Upload/>
				<Text bold size="20px" margin="0px">미리보기</Text>
			</Grid>
			<Grid>
				<Image shape="rectangle" src={preview? preview:"https://via.placeholder.com/400x300"}/>
			</Grid>
			<Grid padding="4px 16px">
				<Input value={contents} _onChange={changeContents} multiLine label="게시글 내용" placeholder="게시글 작성"/>
				{is_edit? <Btn text="게시글 수정" _onClick={editPost}/> : (<Btn text="게시글 작성" _onClick={addPost}/>)}
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