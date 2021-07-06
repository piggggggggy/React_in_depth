// PostList.js

import React from "react";
import Post from "../components/Post"; 
import { useSelector, useDispatch } from "react-redux";
          // 어떤 역할?????????
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
  const post_list = useSelector((state) => state.post.list);
                                            // 모듕 post에 데이터 가져오기!!!!
  console.log(post_list);

  const dispatch = useDispatch();

  React.useEffect(() => {

    // list 페이지에 들어오는 순간 post를 가져오고 있어서
    // post_list 길이가 0일 때만 post를 부르는 것으로,,,
    // 사실 이해가 잘ㄷ 안된...............??????????????????????????
    // 나중에 최신으로 정렬하면서 해결될 문제
    if(post_list.length === 0){
      dispatch(postActions.getPostFB());
    }

  }, []); // 여기 부분도 이해가 안되요.,,,,,

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        return <Post key={p.id} {...p}/>
      })}
    </React.Fragment>
    )
}

export default PostList;