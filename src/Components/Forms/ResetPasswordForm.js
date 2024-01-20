

import React, { useState, useEffect } from "react";
import TextFieldInput from "../../Common/FormFields/TextFieldInput";
import PasswordFieldInput from "../../Common/FormFields/PasswordFieldInput";
import Grid from '@material-ui/core/Grid';
import "./form.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import { useHistory } from 'react-router-dom';
import ErrorComponent from "../../Common/UIComponents/ErrorComponent";

import { __DEV } from "../../isDev";
const ResetPasswordForm = (props) => {
  const history = useHistory();
  const [error, setError] = useState({});
  const [details, setdetails] = useState({});
  const [data, setdata] = useState({});
  // const dispatch = useDispatch()
  const [err, setErr] = useState({ showtexterr: false, texterr: false });
  const [loading, setloading] = useState({ load: false });


  function getQueryStringValue(key) {
    return decodeURIComponent(
      window.location.search.replace(
        new RegExp(
          "^(?:.*[&\\?]" +
          encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") +
          "(?:\\=([^&]*))?)?.*$",
          "i"
        ),
        "$1"
      )
    );
  }

  ///// for email verification //////
  useEffect(() => {

    let key = getQueryStringValue("key");
    __DEV && console.log(key);
    let lock = getQueryStringValue("lock");
    __DEV && console.log(lock);

    if (lock && key) {

      const reqValues = {
        method: "POST",
        body: JSON.stringify(
          {
            lock: lock,
            key: key
          }
        ),
        headers: {
          "Content-Type": "application/json"
        }
      };
      __DEV &&  console.log(reqValues.body);
      fetch(process.env.REACT_APP_apiurl + "user/verifypwReset", reqValues)
        .then(result =>
          // _DEV && console.log(result))
          result.json()
        )
        .then(result => {
          __DEV && console.log(result);
          if (!result.error) {
            setdetails(result.result.email);

          }
          else {
            setErr({

              texterr: 'Email Verification Failed',
              showtexterr: true

            })
          }
        })
        .catch(err => {
          setErr({

            texterr: 'Network Error',
            showtexterr: true

          })
          __DEV && console.log("Error", err);
        });
    }
  }, []);


  /////// onChange function ////////
  const handleChange = (name, value) => {


    __DEV && console.log(name, value);
    setdata(prev => {
      return {
        ...prev,
        [name]: value
      }


    });
    __DEV && console.log(data)

  }

  ////////// onchange finction /////////
  const errorChange = (name, value) => {

    setError(prev => {
      return {
        ...prev,
        [name]: value
      }


    })


  }

  ////// for button disabled true/false/////
  const disableChange = () => {
    __DEV && console.log(error)
    if (Object.keys(error).find(x => error[x] !== null)) {

      return true;

    }

    return false;
  }



  useEffect(() => {

    __DEV && console.log(details);
  }, [details])





  //////// reset Password API call function /////
  const resetPassword = () => {
    if(Object.keys(data).find(x=>data[x]!==null)){


    if (data.password == data.confirmPassword) {

      const reqValues = {
        method: "POST",
        body: JSON.stringify(
          {
            email: details,
            newPassword: data.password
          }
        ),
        headers: {
          "Content-Type": "application/json"
        }
      };
      __DEV && console.log(reqValues.body);
      fetch(process.env.REACT_APP_apiurl + "user/resetPassword", reqValues)
        .then(result =>
          // _DEV && console.log(result))
          result.json()
        )
        .then(result => {
          if (!result.error) {
            __DEV && console.log(result);
            props.history.replace('/resetpasswordsuccess')
          }
          else {
            setErr({

              texterr: 'Password Reset Error',
              showtexterr: true

            })
          }

        })
        .catch(err => {
          __DEV && console.log("Error", err);
          setErr({

            texterr: 'Network Error',
            showtexterr: true

          })
        });
    }
    else {

      setErr({
        texterr: "Password and Confirm Password Should be same.",
        showtexterr: true,

      })

    }
  }
  else{

    setErr({texterr: "Please fill all the required field.",
    showtexterr: true

  })


}
  }





  return (
    <div className='signup-pagestart resetpasword' >
      <div className='signup-innersec'>
        <div className='signup-leftsidesec'>
        </div>
        <div className='signup-rightsidesec'>
          <p className='signup-heading'>Reset Password</p>
          <p className='signup-subtext'>Your password must be at least 8 characters long</p>
          <div className='formareastart'>


            {/**
    * @description: Global error msg start
  */}
            {err.showtexterr &&
              <ErrorComponent errorText={err.texterr} />
            }
            {/**
    * @description: Global error msg end
  */}


            <form>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12} className='signuptextfield'>
                  <PasswordFieldInput inputLabel='New Password'
                   inputProps={{maxLength:"14"}}
                   textinputname='password'
                    onChange={handleChange} onError={errorChange}
                    error={error.textField && error.textField === "password" ? true : false}
                    errorText={
                      error['password']
                    } onError={errorChange} clickLogin={resetPassword} extracls='loginpasswordinput' />
                </Grid>
                <Grid item md={6} xs={12} className='signuptextfield'>
                  <PasswordFieldInput inputLabel='Confirm Password' textinputname='confirmPassword'
                    onChange={handleChange} onError={errorChange}
                    inputProps={{maxLength:"14"}}
                    error={error.textField && error.textField === "confirmPassword" ? true : false}
                    errorText={
                      error['confirmPassword']
                    } clickLogin={resetPassword} onError={errorChange} extracls='loginpasswordinput' />
                </Grid>
              </Grid>

              <Grid container spacing={2} className='signup-bottomgrid'>
                <Grid item md={9} xs={12}>
                  <p className='already-account'><NavLink to='/login'>Back To Login</NavLink></p>
                </Grid>
                <Grid item md={3} xs={12}>
                  <div className='signup-bottom'>
                    <ButtonComponent buttontext='Submit' buttonextraclass='signup-button'
                      // handleButton={() => history.push('/resetpasswordsuccess')}
                      handleButton={resetPassword} loading={loading.load} inactive={disableChange()}
                    />
                  </div>
                </Grid>
              </Grid>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordForm;