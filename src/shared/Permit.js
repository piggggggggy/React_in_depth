import React from "react";
import { useSelector, userSelector } from "react-redux";
    // is_login 봐야하기 때문

import { apiKey } from "./firebase";

const Permit = (props) => {
  const is_login = useSelector(state => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true: false;

		// children 이 안에 자식노드가 있으면 그 자식노드 그대로 내보내주는 것
		if(is_session && is_login) {
			return (
				<React.Fragment>
					{props.children}
				</React.Fragment>
		)}else{
			return null;
		};

}
		
    


export default Permit;