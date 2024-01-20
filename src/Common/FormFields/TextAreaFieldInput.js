import React, { useEffect } from "react";
import "./formfield.css";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import PropTypes from 'prop-types';

const TextAreaFieldInput = (props) =>
{

  const [error, setError] = React.useState(null);

  const [textValue, settextValue] = React.useState('');
  ////// function for enter button as mainbutton ////
  const checkLogin = (ev) =>
  {

    if (ev.key === 'Enter') {
      // Do code here
      console.log(ev.target.name)
      if (ev.target.name == "address" || ev.target.name == "description" || ev.target.name == "question"
        || ev.target.name == "answer") {
        ev.preventDefault();
        props.clickLogin()
      }
      else if(ev.target.name === "chatMessage" )
      {
        ev.preventDefault();
        props.sendChat()
             
      }
    }

  }


  const onChange = (e) =>
  {
    if (props.unResetMe)
    {
      props.unResetMe();
    }

    console.log(e.target.value, e.target.name);
    settextValue(e.target.value); // to actually clear textfield on submission! - should not create any side effects
    props.onChange(e.target.name, e.target.value);

    props.onError(e.target.name, error)


  }

  // const reset= props.reset;

  useEffect(() =>
  {
    console.log(props.reset)
    if (props.reset === 'yup') {
      settextValue('');
      props.onChange(props.textinputname, ''); // disable button when text length is zero
    }

  }, [props.reset])

  useEffect(() =>
  {
    if(props.textinputname!=='chatMessage')
    settextValue(props.value)
  }, [props.value])

  return (
    <div className="textfieldinput">
      <form autoComplete="off">
        {props.inputLabel ? (
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            required={props.required}
            className={"textinputlabel" + " " + props.extraLabelcls}
          >
            {props.inputLabel}
          </InputLabel>
        ) : null}
        <TextField
          disabled={props.disabled}
          value={textValue}
          defaultValue={props.defaultValue}
          className={"textfieldclass" + " " + props.textnewclass}
          type={props.textinputType}
          name={props.textinputname}
          margin="dense"
          variant="outlined"
          multiline={true}
          rowsMax={props.maxRowsnumber}
          rows={props.rowsnumber}
          fullWidth={props.fullwidthState}
          placeholder={props.placeholder}
          onChange={(e) => onChange(e)}
          InputProps={props.InputProps}
          error={props.error}
          inputProps={props.inputProps}
          // value={props.value}  Dis shit!
          // inputProps={props.inputProps}
          onKeyPress={(ev) => checkLogin(ev)}
        // readOnly={props.readOnly?props.readOnly:false}
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

TextAreaFieldInput.propTypes = {
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
  value: PropTypes.string,
  maxRowsnumber: PropTypes.string,
  rowsnumber: PropTypes.string
};
export default TextAreaFieldInput;
