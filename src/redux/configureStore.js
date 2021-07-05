import { createStore, combineReducers, applyMiddleware, compose  } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";

// 스토어에 히스토리 넣어주기
export const history = createBrowserHistory();

// root reducer
const rootReducer = combineReducers({
  user: User,
	router: connectRouter(history),   // 히스토리 연결하기
});

// middlewares
// const middlewares = [thunk];
const middlewares = [thunk.withExtraArgument({history: history})];
														// 다른인수를 넘겨줄게!

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
};

// redux devtools  => 굉장히 편한 프로그램
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;


// 미들웨어 묶기
const enhancer = composeEnhancers(
	applyMiddleware(...middlewares)
);

// 미들웨어와 루트 리듀서를 엮어서 스토어 만들기 (항상 복붙해도 상관없음)
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();