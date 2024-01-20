import React, { Component, useEffect, useState } from 'react';
import './uicomponent.css';
import PropTypes from 'prop-types';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Avatar from 'react-avatar';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DropDownFieldInput from '../FormFields/DropDownFieldInput';
import { DROPDOWN_MENU } from "../../Components/AppConfig";
import { useDispatch, useSelector } from 'react-redux';
const FaqCollapsibleComponent = (props) => {
    const [expanded, setExpanded] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [trainingOption, setTrainingOption] = React.useState(DROPDOWN_MENU.training_dropdown)
    const userDetail = useSelector(state => state.userDetail);

    console.log(userDetail)


    const openCardDropdown = event => {
        setAnchorEl(event.currentTarget);
    };
    const closeCardDropdown = event => {
        setAnchorEl(null);
    };
    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const handleOption = (e) => {
        closeCardDropdown()
        switch (e) {
            case ('edit'): {
                console.log('edit called');
                props.editOptionCalled()
            }
                break;
            case ('delete'): {
                console.log('delete called')
                props.deleteCalled()
            }
        }
    }

    useEffect(()=>{
        console.log(userDetail)
    },[localStorage.getItem('auth_token')])
   

    return (
        <div className="faqsectionstart">
            { localStorage.getItem('auth_token') && userDetail.role !=="agent" ?
            props.moreIcon &&
                <div className="menuIconArea">
                    <MoreVertIcon
                        onClick={event => openCardDropdown(event)}
                    />
                </div>
            :null}
            <DropDownFieldInput
                id={anchorEl ? "simple-popover" : ''}
                open={anchorEl}
                anchorEl={anchorEl}
                handleClick={handleOption}
                handleClose={closeCardDropdown}
                dropdownOptions={trainingOption.options}
                dropdownextracls="cardDropdown"
                dropdownanchercls="cardDropdwonCls"
            />
            <MuiExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <MuiExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                    <div className="expansionheader">
                        <div className="avatarholder">
                            {props.imgsrc !==null ?
                            <img src={props.imgsrc}/>
                            :
                            <Avatar colors={['#fea34c', '#1b1f28', '#b9aafd', '#fecd3c', '#30b9b9', '#ef4d4a', '#f8a3d0']} name='Jason Anthony' size="45" />
                            }
                            </div>
                        <div style={{width:'82%'}}>
                            <p className='faqheading'>{props.faq_question}</p>
                            <p className='faqsubhead'><ScheduleRoundedIcon /> <span>{props.textTime} </span></p>
                        </div>
                    </div>
                </MuiExpansionPanelSummary>
                <MuiExpansionPanelDetails>
                    <p className='faqdetails'>
                        {props.faq_answer}
          </p>
                </MuiExpansionPanelDetails>
            </MuiExpansionPanel>
        </div>
    );

}

FaqCollapsibleComponent.prototype = {
    errorText: PropTypes.string,
    imgsrc:PropTypes.string,
    faq_answer:PropTypes.string,
    faq_question:PropTypes.string,
    editOptionCalled:PropTypes.func,
    deleteCalled:PropTypes.func
}

export default FaqCollapsibleComponent;
