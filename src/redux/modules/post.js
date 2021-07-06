import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";



// action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// action creator
const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));


// initialState
const initialState = {
  list: [],
}

const initialPost = {
	id: 0,
  user_info: {
    user_name: "piggy",
    user_profile: "https://media.vlpt.us/images/pyt4105/post/83f78553-ba38-44c9-aaf8-3f7a715d0701/%EA%B2%B8%EB%91%A5%EC%9D%B4%EB%B2%A4.jpg",
  },
  image_url: "https://media.vlpt.us/images/pyt4105/post/83f78553-ba38-44c9-aaf8-3f7a715d0701/%EA%B2%B8%EB%91%A5%EC%9D%B4%EB%B2%A4.jpg",
  contents: "귀여운 벤이다!",
  comment_cnt: 6,
  insert_dt: "2021-02-27 10:00:00",
};

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
}

// reducer

export default handleActions(
	{
		[SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list = action.payload.post_list; // draft.list를 post_list로 갈아끼우기!!!!!
		}),

		[ADD_POST]: (state, action) => produce(state, (draft) => {

		}),
	}, initialState
)


const actionCreators = {
	setPost,
	addPost,
  getPostFB,
}

export { actionCreators };