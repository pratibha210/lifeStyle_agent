// VerifyPage
import React, { Component } from 'react';
import './uicomponent.css';
import logo from '../../Images/logo.png';

const Preloading = (props) => {

        return (
            <div className="preloader_overlay">
                <div id="preloader">
                    <div id="preloader-box">
                        <img src={logo} className="preloadericon" />
                    </div>
                    <div className="preloader-extracls preloader-center">
                        <div className="preloader-loading">
                            <div className="preloading-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

export default Preloading;