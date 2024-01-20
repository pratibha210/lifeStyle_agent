import React, { Component } from 'react';
import './formfield.css';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";

const CreatableSelectInput = (props) => {
    const handleChange = (newValue: any, actionMeta: any) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };
    const handleInputChange = (inputValue: any, actionMeta: any) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    return (
        <div className={"textfieldinput" + " " + props.extacls}>
            <form autoComplete="off">
                {props.inputLabel ? (
                    <InputLabel
                        shrink
                        htmlFor="bootstrap-input"
                        required={props.required}
                        className={"textinputlabel" + " " + props.extralabelcls}
                    >
                        {props.inputLabel}
                    </InputLabel>
                ) : null}
                <CreatableSelect
                    isClearable
                    onChange={(e)=>props.onChange(e)}
                    // onInputChange={(e)=>props.onInputChange(e)}
                    options={props.selectOption}
                    defaultInputValue={props.defaultInputValue}
                />
                {props.errorText ? (
                    <FormHelperText id="component-error-text" className="errormsg">
                        <ErrorOutlinedIcon className="erroricon" />
                        {props.errorText}
                    </FormHelperText>) : null}
            </form>
        </div>
    );
}

CreatableSelectInput.propTypes = {
    extacls: PropTypes.string,
    selectOption: PropTypes.object
};
export default CreatableSelectInput;