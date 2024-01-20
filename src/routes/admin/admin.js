///vdvdvddvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvdvd
//Admin Header
//Routing
//Admin Footer 


import React, { Component } from 'react';
import MangerCoversationModule from '../../Components/Modules/MangerCoversationModule';
import HeaderSection from '../../Components/Sections/CommonSection/HeaderSection';
import LoginForm from "../../Components/Forms/LoginForm";
import SignUpForm from "../../Components/Forms/SignUpForm";
import ResetPasswordForm from '../../Components/Forms/ResetPasswordForm';
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import MarketingModule from '../../Components/Modules/MarketingModule';
import VerifyModule from '../../Components/Modules/VerifyModule';
import Homemodule from "../../Components/Modules/Homemodule";
import ReferenceModule from "../../Components/Modules/ReferenceModule";
import TrainingModule from '../../Components/Modules/TrainingModule';
import { __DEV } from '../../isDev';
import ManagerList from '../../Components/Sections/ManagerList';
import ProfileModule from '../../Components/Modules/ProfileModule';
import { useSelector } from 'react-redux';
import CompanyStoreModule from '../../Components/Modules/CompanyStoreModule';
import ManagerModule from '../../Components/Modules/ManagerModule';
import UserModule from '../../Components/Modules/UserModule';
import FaqModule from '../../Components/Modules/FaqModule';
import AgentChatSection from '../../Components/Sections/AgentChat/AgentChatSection';
import TrainingDetailModule from '../../Components/Modules/TrainingDetailModule';
import ContactModule from '../../Components/Modules/ContactModule';
import Grid from '@material-ui/core/Grid';
import ForgotPasswordForm from "../../Components/Forms/ForgotPasswordForm";
import LeftSidebarSection from "../../Components/Sections/CommonSection/LeftSidebarSection";
import BuyerBookModule from '../../Components/Modules/BuyerBookModule';
import TrainingVideoList from "../../Components/Sections/TrainingVideoList";

import '../index.css'

const Admin = props => {

    const userDetail = useSelector(state => state.userDetail)
    return (
        <div>
              <BrowserRouter>
            <Grid container>
                <Grid md={2} xs={0} className="hidden-xs">
                    <LeftSidebarSection />
                </Grid>
                <Grid md={10} xs={12}>
                    <div className='headerpaddingadjust' >
                      
                            <HeaderSection />
                            <Switch>
                                <Route path="/login" component={LoginForm} />
                                <Route path="/signup" component={SignUpForm} />
                                <Route path="/training" component={TrainingModule}></Route>
                                <Route path="/marketing" component={MarketingModule} />
                                <Route path="/manager" component={ManagerModule} />
                                <Route path="/user" component={UserModule} />
                                <Route path="/reference" component={ReferenceModule}></Route>
                                <Route path="/profile" component={ProfileModule}></Route>
                                <Route path="/companystore" component={CompanyStoreModule} />
                                <Route path="/trainingdetail/:id" component={TrainingDetailModule} />

                                <Route path="/trainingvideolist/:id" component={TrainingVideoList} />
                                <Route path="/contact" component={ContactModule} />
                                <Route path="/faq" component={FaqModule}></Route>
                                {/* <Route path="/conversation" component={MangerCoversationModule} /> */}
                                <Route path="/home"  render={() => <Homemodule role={props.role}/>}></Route>
                                <Route path="/buyerbooks" component={BuyerBookModule} />
                                {/* <Route path="/signup" component={SignUpForm} /> */}
                                <Route path="/forgotpassword" component={ForgotPasswordForm}></Route>
                                <Route path="/" render={() => (<Redirect to='/home' />)}></Route>

                            </Switch>
                      
                    </div>
                </Grid>
            </Grid>
            </BrowserRouter>
        </div>
    );
}

export default Admin;