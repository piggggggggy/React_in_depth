import React from "react";
import styled from "styled-components";

const Btn = (props) => {


	const {is_header, text, _onClick} = props;


	if(is_header) {
		return(
			<React.Fragment>
				<HeaderBtn onClick={_onClick}>{text}</HeaderBtn>
			</React.Fragment>
		)
	}else{
		return (
			<React.Fragment>
				<SignBtn onClick={_onClick}>{text}</SignBtn>
			</React.Fragment>
		)
	}
}

Btn.defaultProps = {
	is_header: false,
	text: "회원가입",
	_onClick: () => {},
};


const HeaderBtn = styled.button`
	background-color: gray;
	color: black;
	width: 80px;
	padding: 12px 0px;
	box-sizing: border-box;
	border: none;
`;

const SignBtn = styled.button`
	background-color: #212121;
	color: #ffffff;
	padding: 12px 0px;
	width: 100%;
	box-sizing: border-box;
	border: none;
`;

export default Btn;