import React, { Component, useState, useEffect } from "react";
import { __DEV } from '../isDev'
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';


const higherOrderComponent = WrappedComponent => {
  const HOC = props => {

    const history = useHistory()
    const initialData = {};
    const [authData, setAuthData] = useState(initialData);
    const dispatch = useDispatch()

    useEffect(() => {
      if (localStorage.getItem("auth_token")) {
        const reqValues = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': localStorage.getItem('auth_token')
          }
        };
        fetch(process.env.REACT_APP_apiurl + 'user/refreshLogin', reqValues)
          .then(
            result =>
              result.json()
          )

          .then(result => {
            __DEV && console.log(result)
            if (!result.error) {
              // props.history.push('/');

              setAuthData({ role: result.result.role })
              dispatch({ type: 'LOGGED_USER_DETAILS', data: result.result });

            } else {
              // props.history.push('/');
              setAuthData({ role: 'login' })
              // setAuthData();
            }
          })
          .catch(err => {
            // props.history.push('/');
            __DEV &&  console.log(err);
            setAuthData({ role: 'login' })
          });
      }
      else {
        setAuthData({ role: 'login' })
      }
    }
      , []);

    return <WrappedComponent {...props} data={Object.keys(authData).length > 0 ? authData : null} />;
  };

  return withRouter(HOC);
};

export default (higherOrderComponent);