import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index";

const Input = (props) => {

	const {label, placeholder, _onChange} = props;

  return (
    <React.Fragment>
			<Grid>
				<Text margin="0px">{label}</Text>
				<InputBox placeholder={placeholder} onChange={_onChange}/>
			</Grid>
		</React.Fragment>
  )
}

// 입력된 텍스트 값을 부모 컴포넌트가 이용하므로 callback 함수를 받아와야한다.
// onChange 이해안됨
Input.defaultProps = {
	label: "아이디",
	placeholder: "아이디를 입력해주세요.",
	_onChange: () => {},
};

const InputBox = styled.input`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	width: 100%;
	border: 1px solid #212121;
	padding: 12px 4px 12px 4px;
	box-sizing: border-box;
`;

export default Input;