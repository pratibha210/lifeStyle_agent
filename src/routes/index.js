

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

import HOC from "../functions/hoc";
import Protected from "./protected/protected";
import Homemodule from "../Components/Modules/Homemodule";
import LoginForm from "../Components/Forms/LoginForm";
import SignUpForm from "../Components/Forms/SignUpForm";
import HeaderSection from "../Components/Sections/CommonSection/HeaderSection";
import FooterSection from "../Components/Sections/CommonSection/FooterSection";
import ForgotPasswordForm from "../Components/Forms/ForgotPasswordForm";
import ResetPasswordForm from "../Components/Forms/ResetPasswordForm";
import ResetPasswordSuccessModule from "../Components/Modules/ResetPasswordSuccessModule";
import VerifyModule from "../Components/Modules/VerifyModule";
import TrainingModule from "../Components/Modules/TrainingModule";
import MarketingModule from "../Components/Modules/MarketingModule";
import ReferenceModule from "../Components/Modules/ReferenceModule";
import ManagerList from "../Components/Sections/ManagerList";
import CompanyStoreModule from "../Components/Modules/CompanyStoreModule";
import ProfileModule from "../Components/Modules/ProfileModule";
import ManagerModule from "../Components/Modules/ManagerModule";
import UserModule from "../Components/Modules/UserModule";
import FaqModule from "../Components/Modules/FaqModule";
import TrainingDetailModule from "../Components/Modules/TrainingDetailModule";
import Admin from "./admin/admin";
import ContactUsSection from "../Components/Sections/ContactUsSection";
import ContactModule from "../Components/Modules/ContactModule";
import Grid from '@material-ui/core/Grid';
import LeftSidebarSection from "../Components/Sections/CommonSection/LeftSidebarSection";
import FilterForm from "../Components/Forms/FilterForm";
import BuyerBookModule from "../Components/Modules/BuyerBookModule";
import TrainingVideoList from '../Components/Sections/TrainingVideoList';
import Preloading from '../Common/UIComponents/PreLoader';
import './index.css'

const LoaderComponent = props => {

  useEffect(() => {
    // console.log(props.data);
    return function cleanup(){
      console.log('stupid unmount')
    }
  }, [props.data]);

  return (
    <div style={{ height: '100%' }}>
      {/* <p>Loaded</p> */}
      {/* {props.data} */}
      {props.data === null && 
      <Preloading/>
      // <p style={{ color: "red" }}>Loading..</p>
      }
      {props.data &&
        (props.data.role == "admin" || props.data.role == "superadmin") && (
          // <p style={{ backgroundColor: "cyan" }}>Admin</p>
          <Admin />
        )}
      {/* {props.data && props.data.role === "user" && (
        <div>
          <HeaderSection />
          <Protected />
          <FooterSection />
        </div>
      )} */}
      {props.data && (props.data.role == "manager" || props.data.role == 'agent') && (
        // <div>
        <Protected  />
        // </div>
      )}
      {props.data && props.data.role === "login" && (
        <div>
           <BrowserRouter>
          <Grid container>
            <Grid md={2} xs={0} className="hidden-xs">
              <LeftSidebarSection />
            </Grid>
            <Grid md={10} xs={12}>
              <div className='headerpaddingadjust'>  
                  <HeaderSection role={props.data.role}/>
                  <Switch>
                    {/* <Route path="/login" component={LoginPage}></Route> */}
                    <Route path="/home"  render={() => <Homemodule role={props.data.role}/>}></Route>
                    <Route path="/training" component={TrainingModule}></Route>
                    <Route path="/trainingdetail/:id" component={TrainingDetailModule}></Route>
                    <Route path="/reference" component={ReferenceModule}></Route>
                    <Route path="/marketing" component={MarketingModule} />
                    <Route path="/manager" component={ManagerModule} />
                    <Route path="/user" component={UserModule} />
                    <Route path="/companystore" component={CompanyStoreModule} />
                    <Route path="/faq" component={FaqModule}></Route>
                    <Route path="/profile" component={ProfileModule}></Route>
                    <Route path="/login" component={LoginForm}></Route>
                    <Route path="/contact" component={ContactModule}></Route>
                    <Route path="/signup" component={SignUpForm}></Route>
                    <Route path="/forgotpassword" component={ForgotPasswordForm}></Route>
                    <Route path="/resetpassword" component={ResetPasswordForm}></Route>
                    <Route path="/resetpasswordsuccess" component={ResetPasswordSuccessModule}></Route>
                    <Route path="/buyerbooks" component={BuyerBookModule} />
                    <Route path="/trainingvideolist/:id" component={TrainingVideoList}></Route>

                    <Route path="/" render={() => (<Redirect to='/home' />)}></Route>
                  </Switch>
                  <FooterSection />
               
              </div>
            </Grid>
          </Grid>
          </BrowserRouter>
        </div>
        // <p style={{ backgroundColor: "cyan" }}>Login</p>
        // <LoginPage>
      )}
      {/* <p>error
      </p> */}
    </div>
  );
};
export default HOC(LoaderComponent);
