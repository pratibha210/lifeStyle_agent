

import React, { useState, useEffect } from "react";
import TextFieldInput from "../../Common/FormFields/TextFieldInput";
import EmailFieldInput from "../../Common/FormFields/EmailFieldInput";
import PasswordFieldInput from "../../Common/FormFields/PasswordFieldInput";
import Grid from '@material-ui/core/Grid';
import "./form.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import { __DEV } from "../../isDev";
import ErrorComponent from "../../Common/UIComponents/ErrorComponent";
import {useDispatch,useSelector} from 'react-redux';
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';



const LoginForm = (props) => {
  const [error, setError] = useState({});
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch()
  const [err, setErr] = useState({ showtexterr: false, texterr: false });
  const [loading, setloading] = useState({ load: false });
  const [alertMessage, setAlertMessage] = useState({open: false,message:'',alertType:''});




  /////// onChange function ////////
  const handleChange = (name, value) => {


    __DEV && console.log(name, value);
    setLoginData(prev => {
      return {
        ...prev,
        [name]: value
      }


    });
    __DEV && console.log(loginData)

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



  useEffect(() => {  // use cleanup please!

    __DEV && console.log(loginData);
  }, [loginData])




  ////// API call function for login //////
  const loginClick = () => {

    __DEV && console.log(loginData);
    if (Object.keys(loginData).find(x => loginData[x] !== null)) {

      setloading({ load: true })
      ///////// API calling from here//////
      const reqValues = {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json"
      }

      };
      __DEV && console.log(reqValues.body);
      fetch(process.env.REACT_APP_apiurl + "user/login", reqValues)
        .then(result => result.json())
        .then(result => {

          __DEV && console.log(result.token);
          setloading({ load: false })
          if (!result.error) {
            __DEV && console.log(result.result);
            localStorage.setItem('auth_token', result['token']);
            // setAlertMessage({ open: true, message: "You Have Been LOGGEDIN", alertType: 'success' })

          
            dispatch({type:'LOGGED_USER_DETAILS',data:result.result});
            setErr({

              texterr: null,
              showtexterr: false

            })

            props.history.replace('/home');

          } else {
            ///// useState for show result's err message///
            setErr({

              texterr: result.message,
              showtexterr: true

            })

          }
        })
        .catch(err => {
          setloading({ load: false })
          ///// useState for show  err message///
          setErr({

            texterr: err.message,
            showtexterr: true

          })
          __DEV && console.log(err)
        });
    }else{

       ///// useState for show  err message///
       setErr({

        texterr: "Kindly provide us login credential",
        showtexterr: true

      })


    }

  };


  return (
    <div className='signup-pagestart loginpage-start' >
      <div className='signup-innersec'>
        <div className='signup-leftsidesec'>
        </div>
        <div className='signup-rightsidesec'>
          <p className='signup-heading'>Existing User ?</p>
          <p className='signup-subtext'>Use the form below to explore the website</p>
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
                <Grid item md={6} xs={12} className='signuptextfield emailformfieldgrid'>
                  <EmailFieldInput inputLabel='Email' 
                  inputProps={{maxLength:"40"}}
                  textnewclass='emailinput' textinputname='email'
                    onChange={handleChange} onError={errorChange}
                    error={error.textField && error.textField === "email" ? true : false}
                    errorText={
                      error['email']
                    } clickLogin={loginClick} />
                </Grid>
                <Grid item md={6} xs={12} className='signuptextfield password-login'>
                 
                  <PasswordFieldInput inputLabel='Password' extracls='loginpasswordinput' textinputname='password'
                    onChange={handleChange} onError={errorChange}
                    error={error.textField && error.textField === "password" ? true : false}
                    errorText={
                      error['password']
                    } clickLogin={loginClick} />
                     <p className='forgot-password'>Forgot? <NavLink to='/forgotPassword'>Click here</NavLink></p>
                </Grid>
              </Grid>

              <Grid container spacing={2} className='signup-bottomgrid'>
                <Grid item md={9} xs={12}>
                  <p className='already-account'>Don't have any account <NavLink to='/signup'>Sign Up</NavLink></p>
                </Grid>
                <Grid item md={3} xs={12}>
                  <div className='signup-bottom'>
                    <ButtonComponent buttontext='Login' buttonextraclass='signup-button'
                      handleButton={loginClick} inactive={disableChange()} loading={loading.load} />

                  </div>
                  
                </Grid>
              </Grid>

            </form>
          </div>
        </div>
      </div>
      
                  <NotifiedMessageComponent
                    messageOpen={alertMessage.open}
                    notifiactionText={ alertMessage.message}
                    alertType={alertMessage.alertType} />
                  
    </div>
  );
};
export default LoginForm;