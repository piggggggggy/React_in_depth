import React from "react";
import { Image, Text, Btn, Grid } from "../elements";
import Permit from "../shared/Permit";

const CommentList = (props) => {



  return (
    <React.Fragment>
			<Grid is_flex padding="4px 16px">
	      <Grid is_flex>
  	      <Image shape="circle" src={props.src} />
    	    <Text bold>{props.user_info.user_name}</Text>
      	  <Text>{props.contents}</Text>
		    </Grid>
    	  <Permit>
     	    <Btn is_mini text="삭제"/>
    	  </Permit>
			</Grid>
    </React.Fragment>        

  )
}

CommentList.defaultProps = {
	user_info: {
    user_name: "piggy",
    user_profile: "https://media.vlpt.us/images/pyt4105/post/83f78553-ba38-44c9-aaf8-3f7a715d0701/%EA%B2%B8%EB%91%A5%EC%9D%B4%EB%B2%A4.jpg",
   },
	contents: "귀여운 벤이다!",
  comment_cnt: 3,
  insert_dt: "2021-02-27 10:00:00",
};

export default CommentList;