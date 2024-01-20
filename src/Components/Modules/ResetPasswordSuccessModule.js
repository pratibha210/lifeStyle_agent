

import React, { useState, useEffect } from "react";
import "./module.css";
import "../Forms/form.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import { useHistory } from 'react-router-dom';

const ResetPasswordSuccessModule = (props) => {

  const history = useHistory();

  return (
    <div className='signup-pagestart forgotpass-pagestart successfullyreset-start bgcoloradjust' >
      <div className='signup-innersec'>
        <div className='signup-leftsidesec'>
        </div>
        <div className='signup-rightsidesec'>
          <p className='signup-heading'>Successful password reset!</p>
          <p className='signup-subtext'>You can now use your new password to log in to your account!</p>
              <form className="forgetpasswordform resetsuccessform">
                    <ButtonComponent buttontext="Log in" buttonextraclass='login-button' handleButton={() => history.push('/login')}/>
              </form>
      </div>
    </div>
    </div>
  );
};
export default ResetPasswordSuccessModule;