// VerifyPage
import React, { Component } from 'react';
import './uicomponent.css';
import nodata from '../../Images/no_data_icon.png';

const NoDataFoundComponent = (props) => {

        return (
            <div className="nodatafoundstart">
            <img src={nodata} className='nodataimg'/>
                <p className="nodatatext">No Data Found</p>
            </div>
        );
    }

export default NoDataFoundComponent;