import React, { Component } from "react";
import "./formfield.css";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';


const TextFieldInput = (props) =>
{

    const [error, setError] = React.useState(null);

    ////// function for enter button as mainbutton ////
    const checkLogin = (ev) =>
    {

        if (ev.key === 'Enter') {
            // Do code here
            if (ev.target.name == "name" || ev.target.name == "title"||ev.target.name == "vimeoLink") {
                ev.preventDefault();
                props.clickLogin()
            }
        }

    }

    const onChange = (e) =>
    {

        console.log(e.target.value, e.target.name);

        props.onChange(e.target.name, e.target.value);

        props.onError(e.target.name, error)


    }


    // React.useEffect(() => {

    //     props.onError(name, error)


    // }, [error])



    return (
        <div className="textfieldinput">
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
                <TextField
                    onKeyPress={(ev) => checkLogin(ev)}
                    disabled={props.disabled}
                    defaultValue={props.defaultValue}
                    className={"textfieldclass" + " " + props.textnewclass}
                    type={props.typeNumber ? 'number' : 'text'}
                    name={props.textinputname}
                    margin="dense"
                    variant="outlined"
                    multiline={false}
                    fullWidth={props.fullwidthState}
                    placeholder={props.placeholder}
                    onChange={(e) => onChange(e)}
                    InputProps={props.inputProps}
                    error={props.error}
                    value={props.value}
                />
                {props.errorText ? (
                    <FormHelperText id="component-error-text" className="errormsg">
                        <ErrorOutlinedIcon className="erroricon" />
                        {props.errorText || error}
                    </FormHelperText>) : null}
            </form>
        </div>
    );

}

TextFieldInput.propTypes = {
    inputLabel: PropTypes.string,
    extralabelcls: PropTypes.string,
    textnewclass: PropTypes.string,
    textinputname: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    fullwidthState: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    inputProps: PropTypes.object,
    required: PropTypes.bool,
    value: PropTypes.string,
};

export default TextFieldInput;
