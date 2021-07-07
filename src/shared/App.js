import React from "react";
import styled from "styled-components";
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Detail from "../pages/Detail";
import Posting from "../pages/Posting";
import Search from "./Search"
import Notification from "../pages/Notification";
import { actionCreators as userActions } from "../redux/modules/user";

import { useDispatch } from "react-redux";
import { apiKey } from "./firebase";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import Permit from "./Permit";
import { Btn } from "../elements";

function App() {

  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
	const is_session = sessionStorage.getItem(_session_key)? true: false;


    // 굳이 따지자면 컴포넌트 라이프사이클에 didmount랑 didupdate를 동시에 수행하는 친구
  React.useEffect(() => {
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment> 
      <ConnectedRouter history={history}>
        <Route path="/" exact component={PostList}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/detail/:id" exact component={Detail}/>
        <Route path="/posting" exact component={Posting}/>
        <Route path="/posting/:id" exact component={Posting}/>
        <Route path="/search" exact component={Search}/>
        <Route path="/noti" exact component={Notification}/>
      </ConnectedRouter>
      <Permit>
        <Btn is_float text="+" _onClick={(props) => {history.push('/posting');}}/>
      </Permit>
    </React.Fragment>
  );
}



export default App;
