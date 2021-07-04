import React from "react";
import { Text, Btn, Input, Grid } from "../elements";

const Login = (props) => {

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
				<Btn text="로그인하기" _onClick={() => {console.log("로그인했어")}}/>
			</Grid>
			
		</React.Fragment>
  )
}

export default Login;