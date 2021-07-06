// PostList.js

import React from "react";
import Post from "../components/Post"; 
import { useSelector } from "react-redux";
          // 어떤 역할?????????


const PostList = (props) => {
  const post_list = useSelector((state) => state.post.list);
                                            // 모듕 post에 데이터 가져오기!!!!
  console.log(post_list);

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        return <Post key={p.id} {...p}/>
      })}
    </React.Fragment>
    )
}

export default PostList;