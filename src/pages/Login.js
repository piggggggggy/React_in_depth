import React from "react";
import { Text, Btn, Input, Grid } from "../elements";

import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {

	const dispatch = useDispatch();
	
	const login = () => {
		dispatch(userActions.loginAction({user_name: "ben"}));
		  


		// setCookie("user_id", "ben", 3);
		// setCookie("user_pwd", "xox", 3) 퀴즈였음
	}



  return (
		<React.Fragment>
			<Grid padding="16px">
				<Text bold size="32px">로그인</Text>
				<Grid padding="16px 0px">
					<Input label="아이디" placeholder="아이디를 입력해주세요." _onChange={() => {console.log("아이디 입력했어!")}}/>
				</Grid>
				<Grid padding="16px 0px">
					<Input label="비밀번호" placeholder="비밀번호를 입력해주세요." _onChange={() => {console.log("비밀번호 입력했어!")}}/>
				</Grid>
				<Btn text="로그인하기" _onClick={() => {
					console.log("로그인했어");
					login();
					}}/>
			</Grid>
			
		</React.Fragment>
  )
}

export default Login;