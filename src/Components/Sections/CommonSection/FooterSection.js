import React from 'react';
import './commonsection.css';
import logo from '../../../Images/logo.png'
import Grid from '@material-ui/core/Grid';
import CallIcon from '@material-ui/icons/Call';
import RoomIcon from '@material-ui/icons/Room';
import { NavLink } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const FooterSection = (props) => {
    return (
        <div>
            <div className="footerSection">
                <Grid container spacing={6}>
                    <Grid item md={4} xs={12}>
                        <div className="footerlogo">
                            <img src={logo} alt="logo" />
                        </div>
                        <p className="footerParagraph">For more information about becoming a lifstyl real estate agent, check out our company page at <a href='https://lifstylrealestate.info/join/' target='_'>lifstylrealestate.info/join</a></p>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <div className="footerInnerSec">
                            <h2 className="footerHeading">Follow us on</h2>
                            {/* <p className="footerParagraph"><span><RoomIcon /></span>
                                114 Pasadena Drive, Lexington, Kentucky
                            40503, United States</p>
                            <p className="footerParagraph"><span><CallIcon /></span>
                                (859) 278-7501</p> */}
                                <div className='scocillinks'>
                                <InstagramIcon/>
                                <FacebookIcon/>
                                </div>
                        </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <h2 className="footerHeading">Hours</h2>
                        <p className="footerParagraph">Open today 9:00 am - 5:00 pm</p>
                        <p className="footerParagraph">Monday - Friday: 9am - 5pm</p>
                        <p className="footerParagraph">Saturday: By Appointment</p>
                        <p className="footerParagraph">Sunday: Closed</p>
                    </Grid>
                </Grid>
            </div>
            <div className="copyRightsec">
                <p>© Copyright 2020 Lifstyl Agent, All Rights Reserved Designed & Developed by
                <a
                href="https://underscoretec.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
              Team Underscore
              </a></p>
            </div>
            
        </div>
    );

}

export default FooterSection;
