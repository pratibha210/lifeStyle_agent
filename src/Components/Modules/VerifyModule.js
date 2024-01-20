// VerifyPage
import React, {useState, useEffect, Component } from 'react';
import './module.css';

import { __DEV } from "../../isDev";

const VerifyModule = (props) => {

	useEffect(() => {

		let query = getQueryStringValue("key");
		__DEV && 	console.log(query);
		if(!query)
		{
			__DEV && console.log('noquery>>')
		    props.history.push('/')  	
		}
		else{
		const reqValues = {
			method: "POST",
			body: JSON.stringify({
				"key":query
			}),
			headers: {
			  "Content-Type": "application/json"
		  }
	
		  };
		  fetch(process.env.REACT_APP_apiurl + "user/verifyUser", reqValues)
		  .then(result => result.json())
		  .then(result => {
  
			__DEV && console.log(result);
			if (!result.error) {
			  props.history.push('/')
			} 
			else{
				// props.history.push('/')

			} 
		  })
		  .catch(err => {
			__DEV && console.log(err)
		  });

	  }}, []);

	function getQueryStringValue(key) {
		return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key)
		  .replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
	  }
	
		return (
			<div className="verifypagestart bgcoloradjust">
				<div className="iner-verifypage">
					<div className="textchange"></div>
					<div className="progress-bar"
					>
						<div className="loaded" 
							// style={{width:'30%'}}
						>
						</div>
					</div>
                    
				</div>
			</div>
		);
	}

export default VerifyModule;