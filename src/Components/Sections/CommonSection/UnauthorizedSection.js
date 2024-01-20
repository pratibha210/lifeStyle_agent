

import React, { useState, useEffect } from "react";
import "../../Modules/module.css";
import "../../Forms/form.css";
import './commonsection.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from 'react-router-dom';
import ButtonComponent from "../../../Common/UIComponents/ButtonComponent";

const UnauthorizedSection = (props) =>
{

  const history = useHistory();

  return (
    <div className='signup-pagestart forgotpass-pagestart successfullyreset-start unauthorize-start' >
      <div className='signup-innersec'>
        <div className='signup-leftsidesec'>
        </div>
        <div className='signup-rightsidesec'>
          <p className='signup-heading'>Authorization Required !</p>
          <p className='signup-subtext'>This page is not publically available. To access it please login first.</p>
          <form className="forgetpasswordform resetsuccessform">
            <ButtonComponent buttontext="Login" buttonextraclass='login-button' handleButton={() => history.push('/login')} />
          </form>
          <p className='already-account unauth-alredyacc'>Don't have any account <NavLink to='/signup'>Sign Up</NavLink></p>
        </div>
      </div>
    </div>
  );
};
export default UnauthorizedSection;