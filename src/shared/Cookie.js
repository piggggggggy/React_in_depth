import React from "react";




const getCookie = (name) => {

	let value = "; " + document.cookie;
	let parts = value.split(`; ${name}=`)
  
	if(parts.length === 2){
		return parts.pop().split(';').shift();
	}

}

// exp에 기본 값을 주면 받아오지 않아도 기본 값이 적용됨
const setCookie = (name, value, exp=5) => {


  let date = new Date();
  date.setTime(date.getTime()+exp*24*60*60*1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;

};

const deleteCookie = (name) => {

	let date = new Date("2020-01-01").toUTCString();
	
	console.log(date);
	
	document.cookie = name+"=; expires="+date;

}

export {getCookie, setCookie, deleteCookie};