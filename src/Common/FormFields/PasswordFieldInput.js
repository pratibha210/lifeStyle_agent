import React, { Component } from "react";
import "./formfield.css";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';

const PasswordFieldInput = (props) => {
    const [values, setValues] = React.useState({
        password: null,
        confirmPassword: null,
        showPassword: false,
    });
    const [error, setError] = React.useState(null);

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };


    ////// function for enter button as mainbutton ////
    const checkLogin = (ev) => {

        if (ev.key === 'Enter') {
            // Do code here
            if (ev.target.name == "password" || ev.target.name == "confirmPassword") {
                ev.preventDefault();
                props.clickLogin()
            }
        }

    }

    //////// onchange function and for fields validation ////
    // const handleChange = prop => event => {
    //     console.log(prop , event.target.value);
    //     if(!event.target.value){

    //         setErrorText('Password Required')


    //     }else{
    //         setValues({ ...values, [prop]: event.target.value });

    //         props.onChange(event.target.name,event.target.value);
    //     }
    // };

    const handleChange = prop => event => {

        console.log(event.target.value, prop);

        setValues({ ...values, [prop]: event.target.value });

        props.onChange( event.target.name, event.target.value);



    }

    // React.useEffect(()=>{

    //     console.log(values);

    //     props.onChange('password',values.password)



    // },[values])



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
                <FilledInput
                    disabled={props.disabled}
                    defaultValue={props.defaultValue}
                    className={"passwordfieldinput" + " " + props.extracls}
                    name={props.textinputname}
                    margin="dense"
                    variant="outlined"
                    fullWidth={props.fullwidthState}
                    placeholder={props.placeholder}
                    InputProps={props.InputProps}
                    error={props.error}
                    InputLabelProps={props.InputLabelProps}
                    value={props.value}
                    inputProps={props.inputProps}
                    id="filled-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    // value={values.password}
                    onChange={handleChange('password')}
                    onKeyPress={(ev) => checkLogin(ev)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {props.errorText ? (
                    <FormHelperText id="component-error-text" className="errormsg">
                        <ErrorOutlinedIcon className="erroricon" />
                        {props.errorText || error}
                    </FormHelperText>
                ) : null}
            </form>
        </div>
    );

}

PasswordFieldInput.propTypes = {
    inputLabel: PropTypes.string,
    extralabelcls: PropTypes.string,
    extracls: PropTypes.string,
    textinputname: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    fullwidthState: PropTypes.bool,
    placeholder: PropTypes.string,
    InputProps: PropTypes.object,
    required: PropTypes.bool,
    value: PropTypes.string,
};

export default PasswordFieldInput;
