import React from 'react';
import './homesections.css';
import { withRouter } from "react-router-dom";
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent';


const AgentSection = (props) => {

    const redirectLogin = () =>{
        props.history.push('/signup')
    }

    return (
        <div className="agentsection">
            <h1>Welcome New Agent</h1>
            <p>Welcome to the Lifstyl Real Estate! To get you onboarded  click the link below</p>
            <ButtonComponent
            handleButton={redirectLogin}
            buttontext="New Agent Application"/>
        </div>
    );

}

export default withRouter (AgentSection);
