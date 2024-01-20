import React, { useEffect } from 'react';
import './section.css';
import PropTypes from 'prop-types';
import { useHistory, NavLink } from 'react-router-dom';
import ContactForm from '../Forms/ContactForm';
import Grid from '@material-ui/core/Grid';
import mail from '../../Images/mail.png';
import call from '../../Images/phonecall.png';
import location from '../../Images/pin.png';

const ContactUsSection = (props) => {


    return (
        <div>
             <div className="marketingtitlesec">
                <p >Get In Touch With Us</p>
            </div>
            <hr className="borderline" />
        <div className="contactsectionstart">
            <Grid container spacing={4}>
                <Grid item md={8} xs={12}>
                    <ContactForm />
                </Grid>
                <Grid item md={4} xs={12} style={{ borderLeft: '1px solid #dedede' }}>
                    <div className='contactrightsection'>
                        <div className='contactinfosec'>
                            <div className='contactimagsec'>
                                <img src={mail} />
                            </div>
                            <p>lifstylky@gmail.com</p>
                        </div>
                        <div className='contactinfosec'>
                            <div className='contactimagsec'>
                                <img src={call} />
                            </div>
                            <p>(859) 278-7501</p>
                        </div>
                        <div className='contactinfosec'>
                            <div className='contactimagsec'>
                                <img src={location} />
                            </div>
                            <p>114 Pasadena Drive, Lexington, Kentucky 40503, United States</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
        </div>
    );

}

ContactUsSection.propTypes = {

    addFormCalled: PropTypes.func,

};
export default ContactUsSection;
