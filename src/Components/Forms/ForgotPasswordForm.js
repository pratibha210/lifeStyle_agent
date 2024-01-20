

import React, { useState, useEffect } from "react";
import EmailFieldInput from "../../Common/FormFields/EmailFieldInput";
import Grid from '@material-ui/core/Grid';
import "./form.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import { useHistory } from 'react-router-dom';
import ErrorComponent from "../../Common/UIComponents/ErrorComponent";
import { __DEV } from "../../isDev";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import AlertComponent from '../../Common/UIComponents/AlertComponent';




const initialState = {
  // error.textField = ""
 
  email: "",
 
}


    // setAlertMessage({ open: true, message: "Please Check Your Email", alertType: 'success' })

const ForgotPasswordForm = (props) => {

  const history = useHistory();

  const [error, setError] = useState({});
  const [details, setdetails] = useState(initialState);
  // const dispatch = useDispatch()
  const [err, setErr] = useState({ showtexterr: false, texterr: false });
  const [loading, setloading] = useState({ load: false });
  const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
  const [openAlert, setOpenAlert] = useState(false)



  const clearState = () => {
    setdetails({ ...initialState });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // signUpClick().then(clearState());
    clearState()
  };



  /////// onChange function ////////
  const handleChange = (name, value) => {


    __DEV && console.log(name, value);
    setdetails(prev => {
      return {
        ...prev,
        [name]: value
      }


    });
    __DEV && console.log(details)

  }


  ////////// onchange function /////////
  const errorChange = (name, value) => {

    setError(prev => {
      return {
        
        ...prev,
        [name]: value
      }


    })


  }

  ////// for button 0 true/false/////
  const disableChange = () => {
    __DEV && console.log(error)
    if (Object.keys(error).find(x => error[x] !== null)) {

      return true;

    }

    return false;
  }

  const notificationClose = () =>
  {
      setAlertMessage({ open: false })
  }

  const closeDelete = () =>
  {
      setOpenAlert(false)
  }



  useEffect(() => {

    __DEV && console.log(details);
  }, [details])




  ////// API call function for fogotpassword //////
  const forgotPasswordFunction = (e) => {

    __DEV && console.log(details);
    if (Object.keys(details).find(x => details[x] !== null)) {

      setloading({ load: true })
      ///////// API calling from here//////
      const reqValues = {
        method: "POST",
        body: JSON.stringify(details),
        headers: {

          "Content-Type": "application/json"
      }
      };
      __DEV && console.log(reqValues.body);
      fetch(process.env.REACT_APP_apiurl + "user/forgotPassword", reqValues)

        .then(result => result.json())
        .then(result => {

          __DEV && console.log(result);
          setloading({ load: false })

          if (!result.error) {
            __DEV && console.log(result.result);
            
            setAlertMessage({ open: true, message: "Please Check Your Email", alertType: 'success' })
            handleSubmit(e);
            // props.history.push('/resetpassword');
            // setErr({

            //   texterr: result.message,
            //   showtexterr: true

            // })

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
      setErr({

        texterr: 'Kindly provide Email',
        showtexterr: true

      })

    }

  };




  return (
    <div className='signup-pagestart forgotpass-pagestart' >
      <div className='signup-innersec'>
        <div className='signup-leftsidesec'>
        </div>
        <div className='signup-rightsidesec'>
          <p className='signup-heading'>Forgot your password?</p>
          <p className='signup-subtext'>Please enter your registered email address and follow instructions.</p>
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
                <Grid item md={8} xs={12} className='signuptextfield emailformfieldgrid'>
                  <EmailFieldInput inputLabel='Email' textinputname='email' textnewclass='emailinput'
                  inputProps={{maxLength:"40"}}
                    onError={errorChange}
                    error={error.textField && error.textField === "email" ? true : false}
                    errorText={
                      error['email']
                    } clickLogin={forgotPasswordFunction} value={details.email} onChange={handleChange} />
                </Grid>

                <Grid item md={4} xs={12} className='signuptextfield password-login'>
                  <ButtonComponent buttontext='Submit' buttonextraclass='forgot-button'
                    handleButton={(e)=>forgotPasswordFunction(e)} inactive={disableChange()}loading={loading.load}
                  //  handleButton={() => history.push('/resetpassword')}
               onClick={setAlertMessage}   />
                </Grid>
                <AlertComponent alertOpen={openAlert} alertClose={closeDelete}/>
                <NotifiedMessageComponent
                    messageOpen={alertMessage.open}
                    notifiactionText={alertMessage.message}
                    alertType={alertMessage.alertType}
                    messageClose={notificationClose} />

              </Grid>



              {/**
    * @description: After Entering the register email start
	*/}
              {/* <div className='resetpasswordmsgcls'>
                <p>A mail with a reset link has been sent to <span> abc@gmail.com</span></p>
              </div> */}
              {/**
    * @description: After Entering the register email end
  */}


              <p className='backtologin'><NavLink to='/login'>Back To Login</NavLink></p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordForm;