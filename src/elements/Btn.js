import React from "react";
import styled from "styled-components";

const Btn = (props) => {


	const {is_header, text, _onClick, is_float, is_mini} = props;


	if(is_header) {
		return(
			<React.Fragment>
				<HeaderBtn onClick={_onClick}>{text}</HeaderBtn>
			</React.Fragment>
		)
	}else if (is_float){
		return (
			<React.Fragment>
				<FloatBtn onClick={_onClick}>{text}</FloatBtn>
			</React.Fragment>
		)
	}else if (is_mini){
		return (
			<React.Fragment>
				<MiniBtn onClick={_onClick}>{text}</MiniBtn>
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
	is_float: false,
	is_mini: false,
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

const FloatBtn = styled.button`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	border: none;
	background-color: yellow;
	color: black;

	font-size: 36px;
	font-weight: 800;
	text-align: center;
	vertical-align: middle;

	position: fixed;
	bottom: 50px;
	right:16px;
`;

const MiniBtn = styled.button`
	width: 50px;
	height: 30px;
	border: none;
	`;

export default Btn;