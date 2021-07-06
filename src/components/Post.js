import React from "react";
// import Grid from "../elements/Grid"
// import Image from "../elements/Image";
// import Text from "../elements/Text";
// index.js를 만들어서 묶어서 임포트하기!!!

import { Grid, Text, Image } from "../elements";

const Post = (props) => {

  console.log(props);
  return (
      // 여기의 정보들은 props로 받아오는 것이 좋다(잘 생각해보셈)
      <React.Fragment>             
        <Grid>
          <Grid is_flex padding="4px 16px">
            <Image shape="circle" src={props.src}/>
            <Text bold>{props.user_info.user_name}</Text>
            <Text>{props.insert_dt}</Text>
          </Grid>
          <Grid padding="4px 16px">
            <Text>{props.contents}</Text>
          </Grid>
          <Grid>
            <Image shape="rectangle" src={props.src}/>
          </Grid>
          <Grid padding="16px">
            <Text bold>댓글{props.comment_cnt}개</Text>
          </Grid>
				</Grid>
      </React.Fragment>
  )
}


Post.defaultProps = {
  user_info: {
    user_name: "piggy",
    user_profile: "https://media.vlpt.us/images/pyt4105/post/83f78553-ba38-44c9-aaf8-3f7a715d0701/%EA%B2%B8%EB%91%A5%EC%9D%B4%EB%B2%A4.jpg",
   },
  image_url: "https://media.vlpt.us/images/pyt4105/post/83f78553-ba38-44c9-aaf8-3f7a715d0701/%EA%B2%B8%EB%91%A5%EC%9D%B4%EB%B2%A4.jpg",
  contents: "귀여운 벤이다!",
  comment_cnt: 3,
  insert_dt: "2021-02-27 10:00:00",
};


export default Post;
