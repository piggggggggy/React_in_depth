import React from "react";
import { Image, Text, Btn, Grid } from "../elements";
import Permit from "../shared/Permit";

const CommentList = (props) => {



  return (
    <React.Fragment>
			<Grid padding="4px 16px">
				<CommentItem/>
				<CommentItem/>
				<CommentItem/>
				<CommentItem/>
				<CommentItem/>
				<CommentItem/>
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

const CommentItem = (props) => {

	const {user_profile, user_name, user_id, post_id, insert_dt, contents} = props;

	return (
		<React.Fragment>
			<Grid>
				<Grid is_flex>
  	      <Grid is_flex width="auto">
						<Image shape="circle"/>
    	    	<Text bold>{props.user_name}</Text>
      	  </Grid>
		    	<Grid is_flex margin="0px 4px">
						<Text margin="0px">{contents}</Text>
						<Text margin="0px">{insert_dt}</Text>
					</Grid>
    	  	<Permit>
     	    	<Btn is_mini text="삭제"/>
    	  	</Permit>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

CommentItem.defaultProps = {
	user_profile: "",
	user_name: "piggy",
	user_id: "",
	post_id: 1,
	contents: "벤이 젤루 귀여워.",
	insert_dt: '2021-01-01 19:00:00',
}