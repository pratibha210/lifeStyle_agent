import React from 'react';
import HeaderSection from '../Sections/CommonSection/HeaderSection';
import FooterSection from '../Sections/CommonSection/FooterSection';
import AboutSection from '../Sections/HomeSections/AboutSection';
import AgentSection from '../Sections/HomeSections/AgentSection';
import ContactUsSection from '../Sections/HomeSections/ContactUsSection';
import TrainingSection from '../Sections/HomeSections/TrainingSection';
import AgentChatSection from "../Sections/AgentChat/AgentChatSection";
import { useSelector } from "react-redux";

const Homemodule = (props) => {

    const userDetails = useSelector(state => state.userDetail);
    console.log(props);
    return (
        <div className="homepage">
        {(props.role === "agent" || props.role === "login") &&
            <AboutSection />}
            <TrainingSection />
            <AgentSection />
            <ContactUsSection />
           {userDetails && userDetails.role == "agent" && <AgentChatSection/>}
        </div>
    );

}

export default Homemodule;
