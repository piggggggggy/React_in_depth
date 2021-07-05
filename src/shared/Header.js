import React,{useState} from "react";

import { Btn, Grid, Text } from "../elements";
import { getCookie, deleteCookie } from "./Cookie";
 
import { useSelector, useDispatch } from "react-redux";
					// store에 있는 값을 가져와서 쓸 수 있게 해주는 친구
					// 로그아웃을 하면 로그아웃 액션을 호출해주기 위해 useDispatch 부르기
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
	// const [is_login, setIsLogin] = React.useState(false);
	// store 에서 가져올거니까 지우기
	
	const is_login = useSelector((state) => state.user.is_login);
	const dispatch = useDispatch();

	// React.useEffect(() => {

	// 	let cookie = getCookie("user_id");
	// 	console.log(cookie);

	// 	if(cookie){
	// 		setIsLogin(true);
	// 	}else{
	// 		setIsLogin(false);
	// 	}
	// });

	if(is_login){
		return (
			<React.Fragment>
				<Grid is_flex padding="4px 16px">
					<Grid>
						<Text bold size="24px" margin="0px">안뇽?</Text>
					</Grid>
					<Grid is_flex>
						<Btn is_header text="내정보"/>
						<Btn is_header text="알림"/>
						<Btn is_header text="로그아웃" _onClick={() => {dispatch(userActions.logOut({}))}}/>
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}else{
		return (
			<React.Fragment>
				<Grid is_flex padding="4px 16px">
					<Grid>
						<Text bold size="24px" margin="0px">안뇽?</Text>
					</Grid>
					<Grid is_flex>
						<Btn is_header text="회원가입"/>
						<Btn is_header text="로그인"/>
					</Grid>
				</Grid>
			</React.Fragment>
  )
	}
	

  
}

Header.defaultProps = {}


export default Header;