import React from 'react';
import './uicomponent.css';
import PropTypes from 'prop-types';


const ErrorComponent = (props) => {


        return (
            <div className="error-componentstart">
               <p>{props.errorText}</p>
            </div>
        );

}

ErrorComponent.prototype={
    errorText: PropTypes.string,
}

export default ErrorComponent;
