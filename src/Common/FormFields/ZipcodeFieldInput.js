import React, { Component } from "react";
import "./formfield.css";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import PropTypes from 'prop-types';

// type Props = { 
//     inputLabel: String, 
//     extralabelcls: String, 
//     textnewclass:String,
//     textinputname:String,
//     disabled: Boolean,
//     defaultValue:any, 
//     error: boolean,
//     errorText:String,
//     fullwidthState:Boolean,
//     placeholder:String,
//     onChange:Function,
//     InputProps:Object,
//     required:Boolean,
//     value:any
// };
// // type State = { username: string, password: string, spin:boolean, }


const ZipcodeFieldInput = (props) => {

    const [error, setError] = React.useState(null);
    const [zipcode, setzipcode] = React.useState(null);


    //// onchange function and for fields validation ///
   
    const onChange = (e) => {

        console.log(e.target.value, e.target.name);

        setzipcode(e.target.value);


    }

    React.useEffect(() => {

        setError(null)

        props.onChange('zipcode', zipcode);

    }, [zipcode])

    React.useEffect(() => {

        props.onError('zipcode', error)


    }, [error])

    ////// function for enter button as mainbutton ////
    const checkLogin = (ev) => {

        if (ev.key === 'Enter') {
          // Do code here
          if (ev.target.name == "zipcode") {
            ev.preventDefault();
            props.clickLogin()
          }
        }
    
      }



    
   
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
                    type='number'
                    name={props.textinputname}
                    margin="dense"
                    variant="outlined"
                    multiline={false}
                    fullWidth={props.fullwidthState}
                    placeholder={props.placeholder}
                    onChange={(e)=>onChange(e)}
                    InputProps={props.InputProps}
                    error={props.error}
                    value={props.value}
                    onKeyPress={(ev) => checkLogin(ev)}
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

ZipcodeFieldInput.propTypes = {
    inputLabel: PropTypes.string, 
    extralabelcls: PropTypes.string, 
    textnewclass:PropTypes.string,
    textinputname:PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue:PropTypes.string, 
    error:PropTypes.bool,
    errorText:PropTypes.string,
    fullwidthState:PropTypes.bool,
    placeholder:PropTypes.string,
    onChange:PropTypes.func,
    InputProps:PropTypes.object,
    required:PropTypes.bool,
    value: PropTypes.string,
  };

export default ZipcodeFieldInput;
