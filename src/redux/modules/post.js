import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";
import { storage } from "../../shared/firebase";

import { actionCreators as imageActions } from "./post";
import _ from "lodash";


// action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

// action creator
const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}));


// initialState
const initialState = {
  list: [],
}

const initialPost = {
	// id: 0,
  // user_info: {
  //   user_name: "piggy",
  //   user_profile: "https://media.vlpt.us/images/pyt4105/post/83f78553-ba38-44c9-aaf8-3f7a715d0701/%EA%B2%B8%EB%91%A5%EC%9D%B4%EB%B2%A4.jpg",
  // },
  image_url: "https://media.vlpt.us/images/pyt4105/post/83f78553-ba38-44c9-aaf8-3f7a715d0701/%EA%B2%B8%EB%91%A5%EC%9D%B4%EB%B2%A4.jpg",
  contents: "귀여운 벤이다!",
  comment_cnt: 6,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
  // insert_dt: "2021-02-27 10:00:00",
};



// firestore에 데이터를 추가하는 함수
const addPostFB = (contents="") => {
  return function (dispatch, getState, {history}){
    
    // 콜렉션 선택
    const postDB = firestore.collection("post");

    // user 정보 가져오기
    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),

    }
    // firestore에 이미지 url을 업로드 하기 위해서는 
    // storage에 일단 이미지를 저장
    // - 다운로드 url 가져오기
    // - 이 url이 가져와지면 그때 firestore에 저장


      //preview 가져오기
    const _image = getState().image.preview;

    console.log(_image);
    console.log(typeof _image);


    // 다운로드 url을 업로드 하는 과정????? url 가져오는거?????????
                                              // 중복값을 방지하기 위해 아이디와 시간을 더해서 만들어줌
    const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, "data_url");

    // 아직도 여긴 잘 모르겠다....?????????????????????
    _upload.then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        console.log(url);
        
        return url;
      }).then(url => {
            // 정말 컬렉션에 넣을 만한 정보인지 확인하기
        // console.log({...user_info, ..._post});

        // ~~~.add({dddddd})
        postDB.add({...user_info, ..._post, image_url: url }).then((doc) => {
          // 여기서도 리덕스와 firestore에서의 데이터 모양이 다르기 때문에 변형해서 넣어줘야함
          let post = {user_info, ..._post, id: doc.id, image_url: url,};

          dispatch(addPost(post)); 

          history.replace('/');

          // 업로드가 잘 끝났으면 // preview 를 null 값으로 바꿔주기 // 너무 복잡하다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ
          dispatch(imageActions.setPreview(null));

        }).catch((err) => {
          window.alert("앗! 포스트 작성이 문제가 있어요!");
          console.log("post 작성에 실패했어요!", err)
        });

      }).catch((err) => {
        window.alert("앗! 이미지 업로드에 문제가 있어요!!");
        console.log("앗! 이미지 업로드에 문제가 있어요!!", err); // 오류 후처리작업을 catch에서 해주기도 함, dispatch나 history 등으로
      })
    });
  }
} // 다 합쳐준것!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// firestore 연결  /  middleware
const getPostFB = () => {
  return function (dispatch, getState, {history}){
    const postDB = firestore.collection("post");

    postDB.get().then((docs) => {
      let post_list = [];

      docs.forEach((doc) => {

        // 처음에 이방법으로 했지만 좀 더 고수다운 방법으로 수정!!! 아래로!!
        // let _post = {
        //   id: doc.id,
        //   ...doc.data() // 들어있는 것을 모두 여기에 넣어줌
        // };

        // let post = {
        //   id: doc.id,
        //   user_info: {
        //     user_name: _post.user_name,
        //     user_profile: _post.user_profile,
        //     user_id: _post.user_id,
        //   },
        //   image_url: _post.image_url,
        //   contents: _post.contents,
        //   comment_cnt: _post.comment_cnt,
        //   insert_dt: _post.insert_dt,
        // };
        
        


        // 더 고수다운 방법!!
        let _post = doc.data(); // firestore 에서 가져온 값들
        
        // dictionary 의 key 값을 배열로!! // 내장 함수 reduce 사용!!!
        let post = Object.keys(_post).reduce((acc, cur) => {
          
          if (cur.indexOf("user_") !== -1){
            return {...acc, user_info: {...acc.user_info, [cur]: _post[cur]},};
          }
          return {...acc, [cur]: _post[cur]};
        }, {id: doc.id, user_info: {}}); // 뒤의 {} 는 기본값을 의미하는 것 같음

        post_list.push(post);
  
      })

      console.log(post_list);

      dispatch(setPost(post_list));  // 이것도 무슨의미인지????????????????????
                // setPost는 뭐지,,,
                // action 을 부르는거??
    })
  }
};

// 수정 함수 - 파이어스토어 수정
const editPostFB = (post_id=null, post={}) => {
  return function (dispatch, getState, {history}){
    
    if(!post_id){
      console.log('게시물 정보가 없어요!!@')
      return; 
    }
    
    // 포스트에 이미 있었던 링크랑  프리뷰에 저장되어 있는 값이랑 비교해서 
    // 이미지가 수정되었는지 아닌지 판단
    const _image = getState().image.preview;
    // 이 게시글 하나의 정보도 알아와야함
    const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    console.log(_post);
    // text
    const postDB = firestore.collection("post");

    if(_image === _post.image_url){  // 어렵다... 
      postDB.doc(post_id).update(post).then(doc => {
        dispatch(editPost(post_id, {...post}));
        history.replace('/');
      });
      return;
    }else{
      const user_id = getState().user.user.uid;
      // upload 가져옴
      const _upload = storage.ref(`images/${user_id}_${new Date().getTime()}`).putString(_image, "data_url");

      // 아직도 여긴 잘 모르겠다....?????????????????????
      _upload.then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          console.log(url);
          
          return url;
        }).then(url => {
              // 정말 컬렉션에 넣을 만한 정보인지 확인하기
          // console.log({...user_info, ..._post});
          postDB.doc(post_id).update({...post, image_url: url}).then(doc => {
            dispatch(editPost(post_id, {...post, image_url: url}));
            history.replace('/');
          });
        }).catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!!");
          console.log("앗! 이미지 업로드에 문제가 있어요!!", err); // 오류 후처리작업을 catch에서 해주기도 함, dispatch나 history 등으로
        })
      });
    }
  }
};


// reducer
// reducer 는 리덕스에 데이터를 추가해주는 역할을 하는 것 같다...
export default handleActions(
	{
		[SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list = action.payload.post_list; // draft.list를 post_list로 갈아끼우기!!!!!
		}),

		[ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post);
      // 앞에다 붙여주기 위해서,,,
		}),
    
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
      // firebase 에서 가져온 리스트에서 몇번째 것을 고칠 것인지 알아야함 //  수정하기 다시한번 보기,,, 넘어렵다.
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
      draft.list[idx] = {...draft.list[idx], ...action.payload.post};
    }),
	}, initialState
)


const actionCreators = {
	setPost,
	addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
}

export { actionCreators };