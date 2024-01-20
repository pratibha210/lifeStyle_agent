import React, { useEffect, useState } from "react";
// import MangerCoversationModule from "../../Components/Modules/MangerCoversationModule";
import HeaderSection from "../../Components/Sections/CommonSection/HeaderSection";
import FooterSection from "../../Components/Sections/CommonSection/FooterSection";
import LoginForm from "../../Components/Forms/LoginForm";
import SignUpForm from "../../Components/Forms/SignUpForm";
// import ResetPasswordForm from "../../Components/Forms/ResetPasswordForm";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MarketingModule from "../../Components/Modules/MarketingModule";
// import VerifyModule from "../../Components/Modules/VerifyModule";
import Homemodule from "../../Components/Modules/Homemodule";
import ReferenceModule from "../../Components/Modules/ReferenceModule";
import TrainingModule from "../../Components/Modules/TrainingModule";
import { __DEV } from "../../isDev";
// import ManagerList from "../../Components/Sections/ManagerList";
import ProfileModule from "../../Components/Modules/ProfileModule";
import { useSelector } from "react-redux";
import CompanyStoreModule from "../../Components/Modules/CompanyStoreModule";
import ManagerModule from "../../Components/Modules/ManagerModule";
import UserModule from "../../Components/Modules/UserModule";
import FaqModule from "../../Components/Modules/FaqModule";
import AgentChatSection from "../../Components/Sections/AgentChat/AgentChatSection";
import TrainingDetailModule from "../../Components/Modules/TrainingDetailModule";
// import socket from "../../functions/socket";  //export socket to all protected routes
// import ContactUsSection from "../../Components/Sections/ContactUsSection";
import ContactModule from "../../Components/Modules/ContactModule";
import ForgotPasswordForm from "../../Components/Forms/ForgotPasswordForm";
import BuyerBookModule from "../../Components/Modules/BuyerBookModule";
import Grid from '@material-ui/core/Grid';
import LeftSidebarSection from "../../Components/Sections/CommonSection/LeftSidebarSection";
import '../index.css'
import TrainingVideoList from "../../Components/Sections/TrainingVideoList";
// import { cleanup } from "@testing-library/react";

// import io from "socket.io-client";
// remove socket id on unmount
// var socket = null;
const Protected = () => {
  const userDetail = useSelector(state => state.userDetail);
  // console.log(userDetail,"L40")
  return (
    <div>
      <BrowserRouter>
        <Grid container>
          <Grid md={2} xs={0} className="hidden-xs">
            <LeftSidebarSection />
          </Grid>
          <Grid md={10} xs={12}>
            <div className='headerpaddingadjust'>

              <HeaderSection />
              <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/signup" component={SignUpForm} />
                <Route path="/training" component={TrainingModule}></Route>
                <Route path="/marketing" component={MarketingModule} />
                
                {userDetail.role === 'admin' ?

                  <Route path="/manager" component={ManagerModule} />
                  &&
                  <Route path="/user" component={UserModule} />
                  :
                  userDetail.role === 'manager' && 
                  <Route path="/user" component={UserModule} />

                }

                <Route path="/forgotpassword" component={ForgotPasswordForm}></Route>
                <Route path="/reference" component={ReferenceModule}></Route>
                <Route path="/contact" component={ContactModule}></Route>
                <Route path="/profile" component={ProfileModule}></Route>
                <Route path="/companystore" component={CompanyStoreModule} />
                <Route path="/trainingdetail/:id" component={TrainingDetailModule} />
                <Route path="/buyerbooks" component={BuyerBookModule} />
                <Route path="/trainingvideolist/:id" component={TrainingVideoList} />

                <Route path="/faq" component={FaqModule}></Route>
                {/* <Route path="/conversation" component={MangerCoversationModule} /> */}
                <Route path="/home" 
                render={() => <Homemodule role={userDetail.role}/>}></Route>
                {/* <Route path="/signup" component={SignUpForm} /> */}
                <Route path="/" render={() => <Redirect to="/home" />}></Route>
              </Switch>
              {userDetail.role === "agent" && <FooterSection />}
             { localStorage.getItem('auth_token') && userDetail.role === "agent" ? <AgentChatSection />:null}

            </div>
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
};

export default (Protected);
