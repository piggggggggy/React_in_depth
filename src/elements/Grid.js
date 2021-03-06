import React from "react";
import styled from "styled-components";

const Grid = (props) => {

  const {is_flex, width, margin, padding, bg, children, center} = props;
	
	//  style 을 담당하는 것과 아닌 것을 구분하기 위해
	const styles = {
		is_flex: is_flex,
		width: width,
		margin: margin,
		padding: padding,
		bg: bg,
    center: center,
	};
  return (
	  <React.Fragment>
			<GridBox {...styles}>
				{children}
			</GridBox>
		</React.Fragment>
  )
}

Grid.defaultProps = {
	children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
}

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding? `padding: ${props.padding}`: '' )};
  ${(props) => (props.margin? `margin: ${props.margin}`: '' )};
  ${(props) => (props.bg? `background-color: ${props.bg}`: '' )};
  ${(props) => (props.is_flex? `display: flex; justify-content: space-between; align-items: center;` : '')};
  ${(props) => (props.center? `text-align: center`: ``)}
`;




export default Grid;