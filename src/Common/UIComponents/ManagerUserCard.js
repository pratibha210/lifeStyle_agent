import React from 'react';
import './uicomponent.css';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from 'react-avatar';
import DropDownFieldInput from '../FormFields/DropDownFieldInput';
import { DROPDOWN_MENU } from "../../Components/AppConfig";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ToggleButton from '../FormFields/ToggleButton';
import ButtonComponent from './ButtonComponent';
import edit from '../../Images/course_edit.png';
import { __DEV } from "../../isDev";

const ManagerUserCard = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [trainingOption, setTrainingOption] = React.useState(DROPDOWN_MENU.training_dropdown)
    const [ToggleState, setToggleState] = React.useState({
        toggleChecked: true,
    });

    const ActiveOnChange = name => event => {
        setToggleState({ ...ToggleState, [name]: event.target.checked });
    };

    const openCardDropdown = event => {
        setAnchorEl(event.currentTarget);
    };
    const closeCardDropdown = event => {
        setAnchorEl(null);
    };
    const handleOption = (e) => {
        closeCardDropdown()
        switch (e) {
            case ('edit'): {
                __DEV && console.log('edit called');
                props.editOptionCalled()
            }
                break;
            case ('delete'): {
                __DEV && console.log('delete called')
                props.deleteCalled()
            }
        }
    }

    return (
        <div className="managerlistcard">
            {props.moreIcon &&
                <div className="menuIconArea formanagermenu">
                    <MoreVertIcon
                        onClick={event => openCardDropdown(event)}
                    />
                </div>
            }
            <DropDownFieldInput
                id={anchorEl ? "simple-popover" : ''}
                open={anchorEl}
                anchorEl={anchorEl}
                handleClick={handleOption}
                handleClose={closeCardDropdown}
                dropdownOptions={trainingOption.options}
                dropdownextracls="cardDropdown"
            />
            {/* user & manager card header start */}
            <div className="usermanagercardheader">
                <div className="togglebtn">
                    {props.UserToggle &&
                        <div className='userbuttonsdiv'>
                            <ButtonComponent btnimg={edit}
                                buttontext='Edit'
                                buttonextraclass='usereditbtn'
                                handleButton={props.editCalled}
                            />
                            <div className='usertogglebutton'>
                                <ToggleButton extacls='togglbtn-extracls'
                                    onChange={ActiveOnChange('toggleChecked')}
                                    checked={ToggleState.toggleChecked}
                                    value='toggleChecked'
                                    label={ToggleState.toggleChecked === true ? 'Active' : 'Deactive'} />
                            </div>
                        </div>
                    }
                </div>
                <div className="userprofileimage" >
                    {props.cardImg !== null ?
                        <div className="dpimagediv">
                            <img src={props.cardImg} className="managerimage" />
                        </div> :
                        <Avatar round="4px" colors={['#fea34c', '#1b1f28', '#b9aafd', '#fecd3c', '#30b9b9', '#ef4d4a', '#f8a3d0']} name={props.userName} size="75" />
                    }
                </div>
            </div>
            {/* user & manager card header end */}

            {/* user & manager card content start */}
            <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12} className='managerleft-card'>

                    <p className="managertitle"> {props.userName} </p>
                    <p className="managerdesc managerEmail"><span>Email:</span>{props.userEmail}</p>
                    <p className="managerdesc"><span>Phone:</span>{props.userPhone}</p>
                    {/* <p className="managerdesc managerAddress"><span>Address:</span>{props.userAddress}</p> */}
                </Grid>
            </Grid>
            {/* user & manager card content end */}
        </div >
    );

}
ManagerUserCard.prototype = {
    cardImg: PropTypes.string,
    UserToggle: PropTypes.string,
    editCalled:PropTypes.func
}

export default ManagerUserCard;
