import React from "react";
import styled from "styled-components";
import { Btn, Grid  } from "../elements";
import { storage } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
	// 이미지를 선택하고 다른 작업을 했을 때도 값은 유지가 되어야하므로 
	// onChange가 아닌 useRef를 이용해서 값을 가져와보쟈!!! 
	const fileInput = React.useRef();
	const dispatch = useDispatch();

	// 업로딩 중에 버튼이 안눌리게 하려고 만든 장치 => disabled 활용
	const is_uploading = useSelector(state => state.image.uploading);
	
	const selectFile = (e) => {
		console.log(e);
		console.log(e.target);
		console.log(e.target.files[0]);

		console.log(fileInput.current.files[0]);
	}

	// storage에 이미지 업로드하기
	const uploadFB = () => {

		let image = fileInput.current.files[0];
		// // 파일이름을 포함한 참조를 만들고 put 메소드 활용하래
		// const _upload = storage.ref(`images/${image.name}`).put(image);

		// // 여기는 자세히 설명도 못들음
		// _upload.then((snapshot) => {
		// 	console.log(snapshot);
			
		// 	// 이미지의 링크 받아오기    => posting에서 써야하므로 리덕스로 보내기
		// 	snapshot.ref.getDownloadURL().then((url) => {
		// 		console.log(url);
		// 	})
		// })
		dispatch(imageActions.uploadImageFB(image));

	}

  return (
		<React.Fragment>
			<Grid is_flex>
				<input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
				<Btn _onClick={uploadFB} text="업로드하기"/>
			</Grid>
		</React.Fragment>

  )
}




export default Upload;