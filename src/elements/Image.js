import React from "react";
import styled from "styled-components";


const Image = (props) => {
    // 이 3가지는 받아와야 한다.???
  const {shape, src, size,} = props;

  const styles = {
    src: src,
    size: size,
  };

  if(shape === "circle"){
    return (
      <ImageCircle {...styles}></ImageCircle>
    )
  }

	if(shape === "rectangle"){
		return (
			<AspectOutter>
        <AspectInner {...styles}/>
      </AspectOutter>
		)
	}
}

Image.defaultProps = {
  shape: "circle",
  src: "https://media.vlpt.us/images/pyt4105/post/83f78553-ba38-44c9-aaf8-3f7a715d0701/%EA%B2%B8%EB%91%A5%EC%9D%B4%EB%B2%A4.jpg",
  size: 36,
}

// 반응형 네모 만들기!!!!!!
const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;

`;
// 너비가 100$ 이므로 4:3을 맞추려고 75%를 줌 (아직 잘모르겠다)
const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

// 사용할 값이 같을 때, css에서도 변수를 사용 가능
// border-radius 값이 반지름을 넘어도 원으로 유지됨
const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;