import React, { Component } from "react";
import "./formfield.css";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


const DropDownFieldInput = (props) => {


    const handleClick = (e, item) => {

        props.handleClick(item.value);
    };

    return (
        <div className=" dropdownfieldstart">
            <form autoComplete="off">
                <Popover
                    id={props.id}
                    open={props.open}
                    onClose={props.handleClose}
                    anchorEl={props.anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    disablePortal
                    className={'dropdownancher ' + props.dropdownanchercls}
                >
                    <Paper id='menu-list-grow'>
                        <MenuList className='dropdown-list'>
                            {/* {Array.isArray(props.dropdownOptions) && */}
                            {props.dropdownOptions.map((item, idx) => {
                                return (
                                    <MenuItem
                                        className={'dropcls' + ' ' + item.cls}
                                        onClick={e => handleClick(e, item)}
                                        key={idx}
                                        data-tut={'reactour__' + item.value}
                                    >
                                        {item.imgsrc ? (
                                            <img src={item.imgsrc} alt='' className='dropimg' />
                                        ) : null}
                                        {item.label}
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Paper>
                </Popover>
            </form>
        </div>
    );

}

DropDownFieldInput.propTypes = {
    id: PropTypes.string,
    open:PropTypes.bool,
    handleClose:PropTypes.func,
    anchorEl:PropTypes.string,
    dropdownanchercls:PropTypes.string,
    dropdownOptions:PropTypes.array
};

export default DropDownFieldInput;
