/* eslint-disable no-mixed-spaces-and-tabs */
// PhoneFieldInput

import React, { Component } from 'react';
import './formfield.css';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import Input from '@material-ui/core/Input';
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import InputMask from 'react-input-mask';

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            // mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}
TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};
    const PhoneFieldInput = (props) => {

    const [phone, setphoneNumber] = React.useState(null);
    const [error, setError] = React.useState(null);


///// oncahnge function and for fields validation///
    // const handleChange = (e) => {

    //     console.log(e.target.value);

    //     setphoneNumber(e.target.value);

    //     if (!phone) {
    //         setErrorText('phoneNumber Required!!!')

    //     }

    //     else {

    //         setErrorText('');
    //         props.onChange(e.target.name, phone);

    //     }

    // };
    // const onChange =(e) =>{

    //     console.log(e.target.value,e.target.name);

    //     setphoneNumber(e.target.value);

       
    // }

    //     React.useEffect(()=>{

    //             setError(null)
    
    //             props.onChange('phone',phone);
         
    //     },[phone])

    //     React.useEffect(()=>{

    //         props.onError('phone',error)

          
    //     },[error])

    const onChange = (e) =>
    {

        console.log(e.target.value, e.target.name);

        props.onChange(e.target.name, e.target.value);

        props.onError(e.target.name, error)


    }
     ////// function for enter button as mainbutton ////

    const checkLogin = (ev) => {

        if (ev.key === 'Enter') {
          // Do code here
          if (ev.target.name == "phoneNumber") {
            ev.preventDefault();
            props.clickLogin()
          }
        }
    
      }


    return (
        <div className={'textfieldinput phonefieldinput' + ' ' + props.textnewclass}>
            <form autoComplete="off">
                {props.inputLabel ? (
                    <InputLabel
                        shrink
                        htmlFor="bootstrap-input"
                        required={props.required}
                        className={'textinputlabel' + ' ' + props.extralabelcls}

                    >
                        {props.inputLabel}
                    </InputLabel>
                ) : null}
                <InputMask
                    type='number'
                    onKeyPress={(ev) => checkLogin(ev)}
                    onChange={(e) => onChange(e)}
                    name={props.textinputname}
                    defaultValue={props.defaultValue}
                    value={props.value}
                    //  {...this.state} onChange={this.onChange} 
                    className={'textfieldclass' + ' ' + props.textnewclass + ' ' + (props.errorText && 'inputmaskerror')}
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

PhoneFieldInput.propTypes = {
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
    InputProps: PropTypes.object,
    required: PropTypes.bool,
    value: PropTypes.string,
};

export default PhoneFieldInput;