import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index";

const Input = (props) => {

	const {label, placeholder, _onChange, type, multiLine} = props;

	if (multiLine) {
		return(
			<React.Fragment>
				<Grid>
					{label ? <Text margin="0px">{label}</Text> : ''}
					<TextArea rows={10} placeholder={placeholder} onChange={_onChange}/>
				</Grid>
			</React.Fragment>
		)
	}else{
  		return (
    		<React.Fragment>
				<Grid>
					{label ? <Text margin="0px">{label}</Text> : ''}
					<InputBox type={type} placeholder={placeholder} onChange={_onChange}/>
				</Grid>
			</React.Fragment>
  		)
	}
}

// 입력된 텍스트 값을 부모 컴포넌트가 이용하므로 callback 함수를 받아와야한다.
// onChange 이해안됨
Input.defaultProps = {
	multiLine: false,
	label: "아이디",
	placeholder: "아이디를 입력해주세요.",
	_onChange: () => {},
	type: '',
};

const InputBox = styled.input`

	width: 100%;
	border: 1px solid #212121;
	padding: 12px 4px 12px 4px;
	box-sizing: border-box;
`;

const TextArea = styled.textarea`
	width: 100%;
	border: 1px solid #212121;
	padding: 12px 4px 12px 4px;
	box-sizing: border-box;
`;


export default Input;