// ContactUsSection
import React, { Component, useEffect, useState } from "react";
import './homesections.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextFieldInput from '../../../Common/FormFields/TextFieldInput';
import TextAreaFieldInput from '../../../Common/FormFields/TextAreaFieldInput';
import EmailFieldInput from '../../../Common/FormFields/EmailFieldInput';
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FaqCollapsibleComponent from '../../../Common/UIComponents/FaqCollapsibleComponent';
import ContactForm from '../../Forms/ContactForm';
import { __DEV } from "../../../isDev";
import { useHistory } from 'react-router-dom';
import homefaqimg from '../../../Images/faqhome.jpeg'

var moment = require('moment');
const ExpansionPanel = withStyles({
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    expanded: {},
}
)(MuiExpansionPanelSummary);
const ExpansionPanelDetails = withStyles(theme => ({
}))(MuiExpansionPanelDetails);



const ContactUsSection = (props, state) => {
    const [expanded, setExpanded] = React.useState(false);
    const [faqList, setfaq] = useState([]);
    const [image, setimage] = useState(null);
    const history = useHistory();

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    useEffect(() => {
        getAllFaq();

    }, [])

    const goToFaq = () => {
        history.push('/faq');
    }
    const getAllFaq = () => {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'faq/get?resPerPage=4&page=1', reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    setfaq(result.result)
                }
                else {
                    __DEV &&  console.log("no data.found");
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });
    }

    return (

        <div className="contactusSec">
            <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                    <div className="faqAccordian">
                        <h2 className="contactHeading">FAQ</h2>
                        {faqList && faqList.length > 0 && faqList.map(data => {
                            return (


                                <FaqCollapsibleComponent faq_question={data.question}
                                    faq_answer={data.answer} imgsrc={image} textTime={moment(data.createdDate).format("DD-MMM-YYYY HH:mm")} />
                            )
                        })}
                        <ButtonComponent buttontext="See More" handleButton={goToFaq} />
                    </div>
              {/* ---When faq hide below div will show-- */}
                    {/* <div className='homefaqimgdiv'>
                    <img src={homefaqimg} className='homepagefaqimg'/>
                    </div> */}
             {/* ---When faq hide up div will show-- */}
                </Grid>
                <Grid item md={6} xs={12} className="rightSideBorder">
                    <div className="contactusPart">
                        <h2 className="contactHeading">Contact Us</h2>
                        <h4>Send Message</h4>
                        <ContactForm />
                    </div>
                </Grid>
            </Grid>
        </div>
    );


}

export default ContactUsSection;
