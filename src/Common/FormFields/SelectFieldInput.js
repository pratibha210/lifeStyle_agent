import React, { Component } from 'react';
import './formfield.css';
// import chroma from 'chroma-js';
import PropTypes from 'prop-types';

import Select from 'react-select';



const SelectFieldInput = (props) => {
    return (
        <div className="selectfieldinputstart">
        <Select
            defaultValue={props.defaultValue}
            value = {props.value}
            label={props.label}
            options={props.slelectOptions}
            className={"singleselect" + " " + props.extraselectcls}
            onChange={props.onChange}
        />
        </div>
    );

}
SelectFieldInput.propTypes = {
    extraselectcls: PropTypes.string,
    slelectOptions: PropTypes.object,
    label: PropTypes.string,
    defaultValue:  PropTypes.string,
    value:PropTypes.object,
    onChange: PropTypes.func
};
export default SelectFieldInput;