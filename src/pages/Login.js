import React from "react";
import { Text, Btn, Input, Grid } from "../elements";

import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Login = (props) => {

	const dispatch = useDispatch();

	const [id, setId] = React.useState('');
	const [pwd, setPwd] = React.useState('');

	const login = () => {

		// 정규표현식
		console.log(id);

		// aa_-.12Aaa@aa.com
		// let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
		// console.log(_reg.test(id));
		
		if (id === '' || pwd === ''){
			window.alert('아이디 혹은 비밀번호가 공란입니다! 입력해주세욧!');
			return;
		};

		if(!emailCheck(id)){
			window.alert("이메일 형식이 맞지 않습니다!");
			return;
		}

		dispatch(userActions.loginFB(id, pwd));
		// setCookie("user_id", "ben", 3);
		// setCookie("user_pwd", "xox", 3) 퀴즈였음
	}



  return (
		<React.Fragment>
			<Grid padding="16px">
				<Text bold size="32px">로그인</Text>
				<Grid padding="16px 0px">
					<Input label="아이디" placeholder="아이디를 입력해주세요." 
					_onChange={(e) => {setId(e.target.value)}}/>
				</Grid>
				<Grid padding="16px 0px">
					<Input type="password" label="비밀번호" placeholder="비밀번호를 입력해주세요." 
					_onChange={(e) => {setPwd(e.target.value)}}/>
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