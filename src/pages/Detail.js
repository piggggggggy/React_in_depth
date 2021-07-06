import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommnetList";
import CommentPost from "../components/CommentPost";
import { Grid } from "../elements";


const Detail = (props) => {
    
  return (
    <React.Fragment>
			<Grid>
        <Post/>
        <CommentPost/>
        <CommentList/>
      </Grid>
    </React.Fragment>
  )
}

export default Detail;