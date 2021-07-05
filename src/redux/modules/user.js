import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";


// actions
// const LOG_IN = "LOG_IN";  // 로그인이든 회원가입이든 유저정보가 리덕스에 들어가므로 SET_USER로!!
const LOG_OUT = "LOG_OUT"
const GET_USER = "GET_USER"
const SET_USER = "SET_USERE"



// action creators

// 객체를 반환해주는 기존 action creator
// const logIn = (user) => {
//     return {
//         type: LOG_IN,
//         user
//     }
// }    



    // createAction 을 사용하면 이렇게 간단해진다.
// const logIn = createAction(LOG_IN, (user) => ({user}));
                                    // 파라미터 받아온 것을 넘겨주는 것
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));
const setUser = createAction(SET_USER, (user) => ({user}));

// initialState
const initialState = {
	user: null,
	is_login: false,
};

const user_initial = {   // 정말 user의 객체를 담는 initailState
	user_name: "piggy",
	user_email: null,
	user_pwd: null,
}


// middleware actions : 페이지 이동을 위해 미들웨어 chunk를 이용
const loginAction = (user) => {
	return function (dispatch, getState, {history}){
		console.log(history);
		dispatch(setUser(user));
		history.push('/');
	}
};

	// auth에서 함수를 호출하는 역할
const signupFB = (id, pwd, user_name) => {
	return function (dispatch, getState, {history}){
		
		auth
			.createUserWithEmailAndPassword(id, pwd)
			.then((user) => {

				console.log(user);

				auth.currentUser.updateProfile({
					displayName: user_name,

				}).then(() => { // setUser 아직 이해가 안됨??????????????????????
					dispatch(setUser({user_name: user_name, id: id, user_profile: ''}));
					history.push('/');
				}).catch((error) => {
					console.log(error);
				});
  			// Signed in
    		// ...
  		})
			.catch((error) => {
    		var errorCode = error.code;
    		var errorMessage = error.message;
    		
				console.log(errorCode, errorMessage);
				// ..
  		});
	}
}




// 기존방식의 reducer  
// const reducer = (state={}, action={} ) => {
// 	switch(action.type){
// 		case "LOG_IN" : {
// 			state.user = action.user;
// 		}
// 	}
// }

		// handleActions 를 사용하면 이렇게 간단해진다.
// const reducer = hadleActions({
// 	[LOG_IN]: (state, action) => {
		
// 	},
// }, initialState = {});


// immer는 어떻게 불변성을 유지하는가??
// => a를 a'로 만든다. a를 어떻게 사용하든지 a'를 만들어 사용하기 때문에
// 알아서 불변성 유지가 됨

// reducer // 여기서 immer를 씀 // 불변성 유지를 위해서
// createAtion 쓰게되면 중간에 payload 라는 단계가 추가됨 
export default handleActions({
	// 로그인이든 회원가입이든 유저정보가 리덕스에 들어가므로 SET_USER로!!
	[SET_USER]: (state, action) => produce(state, (draft) => {
		setCookie("is_login", "success"); // setCookie 왜해줌?????????????????????
		draft.user = action.payload.user;
		draft.is_login = true;
	}),
	[LOG_OUT]: (state, action) => produce(state, (draft) => {
		deleteCookie("is_login");
		draft.user = null;
		draft.is_login = false; 
	}),
	[GET_USER]: (state, action) => produce(state, (draft) => {}),
}, initialState
);


// action creators export

const actionCreators = {
	// logIn,
	logOut,
	getUser,
	loginAction,
	signupFB,
};

export { actionCreators };