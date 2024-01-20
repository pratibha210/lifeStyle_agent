import React from 'react';
import './homesections.css';
import { Slide } from 'react-slideshow-image';
import slide2 from '../../../Images/slide_2.jpg'
import slide3 from '../../../Images/slide_3.jpg'
import slide4 from '../../../Images/slide_4.jpg'
import slider from '../../../Images/slider.jpg'
import logo from '../../../Images/logo.png'

const slideImages = [
    'images/slide_2.jpg',
    'images/slide_3.jpg',
    'images/slide_4.jpg'
];

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
        // console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
}

const AboutSection = (props) => {
    return (
        <div className="aboutsection">
            <Slide {...properties}>
                <div className="each-slide">
                    <img src={slider} alt="slide2" />
                    <div className="sliderOverlay">
                        <img src={logo} alt="logo" className="sliderContent" />
                    </div>
                </div>
                <div className="each-slide">
                    <img src={slider} alt="slide3" />
                    <div className="sliderOverlay">
                        <img src={logo} alt="logo" className="sliderContent" />
                    </div>
                </div>
                <div className="each-slide">
                    {/* <div 
                    style={{ 'backgroundImage': `url(${slideImages[2]})` }} > */}
                    <img src={slider} alt="slide4" />
                    <div className="sliderOverlay">
                        <img src={logo} alt="logo" className="sliderContent" />
                    </div>
                    {/* </div> */}

                </div>
            </Slide>
        </div>
    );

}

export default AboutSection;
