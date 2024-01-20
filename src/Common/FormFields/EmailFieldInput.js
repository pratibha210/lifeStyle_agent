import React, { Component } from "react";
import "./formfield.css";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import PropTypes from 'prop-types';


const EmailFieldInput = (props) => {

    const [email, setEmail] = React.useState(null);
    const [error, setError] = React.useState(null);

    ////// function for enter button as mainbutton ////
    const checkLogin = (ev) => {

        if (ev.key === 'Enter') {
            // Do code here
            if (ev.target.name == "email") {
                ev.preventDefault();
                props.clickLogin()
            }
        }

    }
    //
    const onChange = (e) => {

        console.log(e.target.value, e.target.name);

        setEmail(e.target.value);


    }

    React.useEffect(() => {


        if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {

            setError(" Invalid Email!!!")
            props.onChange('email', email);

        }
        else {

            setError(null)

            props.onChange('email', email);

        }


    }, [email])

    React.useEffect(() => {

        props.onError('email', error)


    }, [error])


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
                    disabled={props.disabled}
                    defaultValue={props.defaultValue}
                    className={"textfieldclass" + " " + props.textnewclass}
                    type='email'
                    name={props.textinputname}
                    margin="dense"
                    variant="outlined"
                    multiline={false}
                    fullWidth={props.fullwidthState}
                    placeholder={props.placeholder}
                    onChange={(e)=>onChange(e)}
                    inputProps={props.inputProps}
                    error={props.error}
                    value={props.value}
                    onKeyPress={(ev) => checkLogin(ev)}
                />
                {props.errorText ?
                    <FormHelperText id="component-error-text" className="errormsg">
                        <ErrorOutlinedIcon className="erroricon" />
                        {props.errorText || error}
                    </FormHelperText> : null
                }
                {props.emailaRegisterdText &&
                    <FormHelperText id="component-error-text" className="errormsg emailregistartedmsg">
                     <ErrorOutlinedIcon className="erroricon" />
                       Already registered email . <span onClick={props.resendLink}>Resend</span>.
                    </FormHelperText>
                }
            </form>
        </div>
    );

}

EmailFieldInput.propTypes = {
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
    InputProps: PropTypes.object,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    resendLink:PropTypes.func
};

export default EmailFieldInput;
