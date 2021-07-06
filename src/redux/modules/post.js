import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";



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
}

// reducer

export default handleActions(
	{
		[SET_POST]: (state, action) => produce(state, (draft) => {

		}),

		[ADD_POST]: (state, action) => produce(state, (draft) => {

		}),
	}, initialState
)


const actionCreators = {
	setPost,
	addPost,
}

export { actionCreators };