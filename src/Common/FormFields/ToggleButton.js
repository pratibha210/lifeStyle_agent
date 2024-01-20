import React, { Component } from 'react';
import './formfield.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';

const ToggleButton = (props) => {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div className={"togglebtn" + " " + props.extacls}>
      {/* <Switch
        checked={state.checkedA}
        onChange={handleChange('checkedA')}
        value="checkedA"
        className="antswitch"
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    */}
      <FormGroup>
      <FormControlLabel
          control={
              <Switch
                  checked={props.checked}
                  onChange={props.onChange}
                  value={props.value}
                  size="small"
                  
              />
          }
          label={props.label}
      />
  </FormGroup>
  </div>
  );
}

ToggleButton.propTypes = {
  extacls: PropTypes.string,
};
export default ToggleButton;