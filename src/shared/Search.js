import React from "react";
import _ from "lodash";

const Search = () => {

 



    // const onChange = (e) => {
    //     console.log(e.target.value);
    // }

    // // 기존 debounce와 throttle
    // const debounce = _.debounce((e) => {
    //     console.log(e.target.value);
    // }, 1000);

    // const throttle = _.throttle((e) => {
    //     console.log(e.target.value);
    // }, 1000);



    
    //debounce와 throttle을 onchange에서 발생시켜보기
    const debounce = _.debounce((e) => {
        console.log("debounce :::", e.target.value);
    }, 1000);


    const throttle = _.throttle((e) => {
        console.log("throttle :::", e.target.value);
    }, 1000);
    
    
    // input의 value 가 state에서 관리한다면?
    const [text, setText] = React.useState("");
    // 아래의 리렌더링 문제점을 해결하고 이런상황에서 debounce와 throttle을 사용하기 위해
    const keyPress = React.useCallback(debounce, []); // 함수를 메모리제이션함 (저장하는 듯)*********
                // 컴포넌트를 잘만들고 싶을때 중요!!!
                // 최적화할 때 중요!!!!! 정말 중요


    const onChange = (e) => {
        setText(e.target.value);
        //         // => text가 바뀔때마다 rerendering 이 일어남 (state라서 그런듯)
        // debounce(e);
        //         // 함수형 컴포넌트라 계속 리렌더링 되면서 초기화가 되가지고
        //         // 엉망이 됨.....
        //         // 이런 부분을 해결하기 위해 usecallback 을 활용!!!!!!!!!!@!@!@!@!@!@!@!@!

        // useCallback 활용!!
        keyPress(e);
    }



    return (
        <div>
            <input type="text" onChange={onChange} value={text}></input>
        </div>
    )
}

export default Search;