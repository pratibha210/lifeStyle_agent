import { __DEV } from "../isDev";


export function userDetails(data) {
	__DEV && console.log(data, ".5");
	return {
		type: 'LOGGED_USER_DETAILS',
		data: data
	};
}


export function categoryList(data) {
	__DEV && console.log(data);
	return {
		type: 'CATEGORY_LIST',
		data: data
	};
}



export function marketCatList(data) {
	__DEV && console.log(data);
	return {
		type: 'MARKETCAT_LIST',
		data: data
	};
}


export function referenceCatList(data) {
	__DEV && console.log(data);
	return {
		type: 'REFERENCECAT_LIST',
		data: data
	};
}



export function getAllCategory(data) {
	return function(dispatch) {
	const reqValues = {
	method: "GET",
	headers: {
	"Content-Type": "application/json",
	'Authorization': localStorage.getItem('auth_token')
	}
	
	};
	return fetch(process.env.REACT_APP_apiurl + 'category/get?type=' + data, reqValues)
	.then(result => result.json())
	.then(result => {
	// dispatch
	__DEV && console.log(result);
	if(localStorage.getItem('auth_token') && data ==="training"){
	dispatch(categoryList(result.result));
	}
	else if(localStorage.getItem('auth_token') && data ==="marketing"){
		dispatch(marketCatList(result.result));
	}
	else{
		if(localStorage.getItem('auth_token') && data==="reference"){
		dispatch(referenceCatList(result.result));
		}
		
	}
	});
	};
	}


//add category function //////
export function addCategory(value,type) {
	__DEV && console.log(value,type);
	return (dispatch, getState) => {
		const reqValues = {
			method: 'POST',
			body: JSON.stringify({
				name: value,
				type: type,

			}),
			headers: {
				"Content-Type": "application/json",
				'Authorization': localStorage.getItem('auth_token')
			}
		};
		fetch(process.env.REACT_APP_apiurl + 'category/create', reqValues)
			.then(result => result.json())
			.then(result => {
				__DEV && console.log(result);
				if (!result.error) {
					let arr = [...getState().categoryList];
                               
					arr.push(result.result);

					dispatch(categoryList(arr));
				}
				else {
					__DEV && console.log(result.message);
				}
			})
			.catch(err => {
				__DEV && console.log('Error' > err);
			});
	};
}