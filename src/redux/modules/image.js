// 이미지를 firebase storage에 올리고 이미지 경로를 받아옴
// 이 이미지 경로를 리덕스에 넣고 싶음
// 이미지가 업로드 중일 때는 파일 선택을 막아주는 액션이 필요
//          => 이미지 업로드 중이라는 것을 표시해줄 액션

import { createAction, hadleActions, handleActions } from "redux-actions";
import produce from "immer";
import { storage } from "../../shared/firebase";



// action
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";



// acrtion creator
const uploading = createAction(UPLOADING, (uploading) => ({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));



// initialState
const initialState = {
    image_url: '',
    uploading: false,
};

    // firebase 에서 실제로 업로드하는 것
const uploadImageFB = (image) => {
    return function(dispatch, getState, {history}){
        // 미리 만들어논 업로드 코드 가져옴  => 이제 리덕스 이미지 모듈안에 있는 state를 바꿔줘야함
                                            // 업로드 시작하면 uploading 을 true로
                                            // 끝나면 false로
                                            // 가지고온 url 도 state에 넣어줘야함
        dispatch(uploading(true));

        const _upload = storage.ref(`images/${image.name}`).put(image);
		
        // 여기는 자세히 설명도 못들음
		_upload.then((snapshot) => {
			console.log(snapshot);
			
            // 업로드가 끝나는 부분 // reducer를 고쳐 uploadImage로 통합
            // dispatch(uploading(false));

			// 이미지의 링크 받아오기    => posting에서 써야하므로 리덕스로 보내기
			snapshot.ref.getDownloadURL().then((url) => {
                dispatch(uploadImage(url)); // 업로드가 끝난시점
				console.log(url);
			});
		});
    }
};


// reducer

export default handleActions({
    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
        // image url 고치기
        draft.image_url = action.payload.image_url;
        draft.uploading = false; // dispatch를 줄이기 위해서 어차피 업로드가 끝난시점이라 그런듯.
        // 사실 이해안됨 아직
    }),

    [UPLOADING]: (state, action) => produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
    }),

}, initialState);


const actionCreators = {
    uploadImageFB,
    // uploading 은 밖에서 호출할 필요가 없으므로 내보낼필요가 없다
};

export {actionCreators};
