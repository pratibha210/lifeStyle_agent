/* eslint-disable no-unused-vars */
// ChipFieldInput
import React, { useState, useEffect } from "react";
import "./formfield.css";
import ChipInput from 'material-ui-chip-input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

const ChipFieldInput = (props) => {

    const [error, setError] = React.useState(null);

    const onChange = (e) =>
    {
        console.log(e);

        // console.log(e.target.value, e.target.name);

        props.onChange(e);

        // props.onError(e.target.name, error)


    }
    return (
        <div className={'chipfeild' + ' ' + props.chipnewcls}>
            <form>
                <InputLabel
                    shrink htmlFor="bootstrap-input"
                    className={'textinputlabel' + ' ' + props.chipinputlabelcls}>
                    {props.chiplabel}
                </InputLabel>
                <ChipInput
                shrink={true}
                    blurBehavior={'add'}
                    newChipKeys={['Tab', 'Enter', 'SemiColon', 'Comma', 'Space']}
                    alwaysShowPlaceholder={props.alwaysShowPlaceholder}
                    placeholder={props.placeholder}
                    className={"chipinputdiv"+ ' ' + props.extralabel}
                    onChange={(e) => onChange(e)}
                    name={props.textinputname}
                    error={props.error}
                    defaultValue={props.defaultValue}
                    // value={props.value}
                    // onChange={handleAddChip}
                />
                {/*<span className="chipwritinginfo">
                    (<span className="noteheighlight">Note: </span>
                     After typing email address please press <span className="noteheighlight"> Enter</span>)
                </span>*/}
            </form>
        </div>
    );
}
ChipFieldInput.propTypes = {
    chipnewcls: PropTypes.string,
    chipinputlabelcls: PropTypes.string,
    chiplabel: PropTypes.string,
    placeholder: PropTypes.string,
    handlechange: PropTypes.func,
    alwaysShowPlaceholder: PropTypes.string,
};
export default ChipFieldInput