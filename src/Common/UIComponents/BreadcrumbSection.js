import React, { Component } from "react";
import "./uicomponent.css";
import logo from '../../Images/logo.png'

import PropTypes from 'prop-types';


const BreadcrumbSection = (props) => {


    return (
        <div className={"bredcrumbsectionstart"}>
          <div className="breadcrumbSection">
                <div className="breadcrumbtitle">
                   <p >{props.breadcrumbtitle}</p>
                </div>
                
                    
                </div>
        </div>
    );

}

BreadcrumbSection.propTypes = {
    // online: PropTypes.bool,
    // active: PropTypes.bool,
    // messagenumber: PropTypes.number,
    // firstmessage: PropTypes.string,
    breadcrumbtitle: PropTypes.string,
    // time: PropTypes.string,
    // disabled: PropTypes.bool,
    // defaultValue: PropTypes.string,

    // errorText: PropTypes.string,
    // fullwidthState: PropTypes.bool,
    // placeholder: PropTypes.string,
    // onChange: PropTypes.func,
    // InputProps: PropTypes.object,
    // required: PropTypes.bool,
    // value: PropTypes.string,
};

export default BreadcrumbSection;
