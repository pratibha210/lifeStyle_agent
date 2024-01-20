import React, { Component } from "react";
import "./formfield.css";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';


const SearchFieldInput = (props) => {

    // const [error, setError] = React.useState(null);
    // const [name, setName] = React.useState(null);

    // ////// function for enter button as mainbutton ////
    // const checkLogin = (ev) => {

    //     if (ev.key === 'Enter') {
    //         // Do code here
    //         if (ev.target.name == "name") {
    //             ev.preventDefault();
    //             props.clickLogin()
    //         }
    //     }

    // }

    // const onChange = (e) => {

    //     console.log(e.target.value, e.target.name);

    //     setName(e.target.value);


    // }

    // React.useEffect(() => {

    //     setError(null)

    //     props.onChange('name', name);

    // }, [name])

    // React.useEffect(() => {

    //     props.onError('name', error)


    // }, [error])



    return (
        <div className="textfieldinput serachfieldinputstart">
            <form autoComplete="off">
                <TextField
                onChange={(e)=>props.onChange(e.target.value)}
                    id="standard-start-adornment"
                    placeholder="Search"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                       <SearchIcon/>
                      </InputAdornment>,
                    }}
                    className={"searchfieldinput"}
                />
            </form>
        </div>
    );

}

// TextFieldInput.propTypes = {
//     inputLabel: PropTypes.string,
//     extralabelcls: PropTypes.string,
//     textnewclass: PropTypes.string,
//     textinputname: PropTypes.string,
//     disabled: PropTypes.bool,
//     defaultValue: PropTypes.string,
//     error: PropTypes.bool,
//     errorText: PropTypes.string,
//     fullwidthState: PropTypes.bool,
//     placeholder: PropTypes.string,
//     onChange: PropTypes.func,
//     InputProps: PropTypes.object,
//     required: PropTypes.bool,
//     value: PropTypes.string,
// };

export default SearchFieldInput;
