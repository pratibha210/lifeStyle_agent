import React from 'react';
import './uicomponent.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import DropDownFieldInput from '../FormFields/DropDownFieldInput';
import { DROPDOWN_MENU } from "../../Components/AppConfig";
import { useDispatch, useSelector } from 'react-redux';
import editicon from '../../Images/hoveredit.png';
import deleteicon from '../../Images/hoverdelete.png';
import Popover from '@material-ui/core/Popover';
import attach from '../../Images/multimedia-option.png';

const CardComponent = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [trainingOption, setTrainingOption] = React.useState(DROPDOWN_MENU.training_dropdown)
    const userDetail = useSelector(state => state.userDetail);
    const [fileAnchorEl, setFileAnchorEl] = React.useState(null)

    const handlePopoverOpen = (event) => {
        setFileAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setFileAnchorEl(null);
    };

    const fileopen = Boolean(fileAnchorEl);

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


    return (
        <div className="cardComponent">
            {/* {userDetail.role !== 'agent' && props.moreIcon ?
                <div className="menuIconArea">
                    <MoreVertIcon
                        onClick={event => openCardDropdown(event)}
                    />
                </div>
                : null} */}
            {userDetail.role !== 'agent' &&
                <div className="actionsicondiv">
                    <div className="actionicon" onClick={props.editOptionCalled}> <img src={editicon} />
                        <div className="edithovertxt"> <p >Edit</p></div></div>


                    <div className="actionicon" onClick={props.deleteCalled}> <img src={deleteicon} />
                        <div className="dlthovertxt"> <p >Delete</p></div>
                    </div>

                </div>}
            {props.options && <DropDownFieldInput
                id={anchorEl ? "simple-popover" : ''}
                open={anchorEl}
                anchorEl={anchorEl}
                handleClick={handleOption}
                handleClose={closeCardDropdown}
                dropdownOptions={trainingOption.options}
                dropdownextracls="cardDropdown"
                dropdownanchercls="cardDropdwonCls"
            />}
            <Card
                className={"trainingCard" + " " + props.extraCls}
                onClick={props.cardClick}
            >

                <CardMedia className="cardMediaCls">
                    <div className="videoimagediv">
                        {props.cardImg &&
                            <img src={props.cardImg} alt="video1" />}
                    </div>

                    <div className="videoOverlay">
                        <span>
                            <PlayArrowIcon />
                        </span>
                    </div>
                    {/* ----tags start here---*/}
                    {/* ----Queued tags start here---*/}
                    {props.queued &&
                        <span className='tranningtags queuedtag'>Queued</span>
                    }
                    {/* ----Queued tags end here---*/}

                    {/* ----Processing tags start here---*/}
                    {props.Processing &&
                        <span className='tranningtags processingtag'> Processing</span>
                    }
                    {/* ----Processing tags end here---*/}
                    {/* ----Processed tags start here---*/}
                    {props.Processed &&
                        <span className='tranningtags processedtag'> Processed</span>
                    }
                    {/* ----Processed tags start here---*/}
                    {/* ----tags end here---*/}
                </CardMedia>
                <CardContent>

                    {props.trainingText &&
                        <span className="cardType">Training </span>
                    }

                    <h2 className="cardHeading">{props.cardHeading}</h2>
                    <p className="cardDetail">{props.cardDetl}</p>
                    <div className="cardFooter">
                        <p className="cardDate">  {props.category &&
                            <span className="cardType">{props.category}</span>
                        } {props.videoDate} </p>

                    </div>
                    {props.files && props.files.length > 0 && 
                    <div className="attachmentfilesec">
                        {/* <p className="attachtitle">Attachments:</p> */}
                        <div className="attachicondiv"><img src={attach}/></div>
                        <span>{props.files[0].name}</span>
                        <div className="morehoverdiv">
                       {props.files.length > 1 && <p className="moretext"
                            // aria-owns={fileopen ? 'mouse-over-popover' : undefined}
                            // aria-haspopup="true"
                            // onMouseEnter={handlePopoverOpen}
                            // onMouseLeave={handlePopoverClose}
                        >+{props.files.length - 1} more</p>}

                        <div className="popovercntnt">
                        {props.files.map(file =>
                            <p>{file.name}</p>
                        )}
                            {/* <p>file0123.docx</p>
                            <p>file0123.docx</p> */}
                        </div>
                        
                        </div>
                         
                    </div>}
                    {/* <Popover
                        id="mouse-over-popover"
                        className={"moreattachfiles"}
                        // classes={{
                        //     paper: classes.paper,
                        // }}
                        open={fileopen}
                        anchorEl={fileAnchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    > */}
                       
                    {/* </Popover> */}
                </CardContent>
                {/* <div className="cardFooter">
                    <p className="cardDate"> {props.videoDate} </p>
                </div> */}
            </Card>
        </div>
    );

}

CardComponent.prototype = {
    cardImg: PropTypes.string,
    cardHeading: PropTypes.string,
    cardDetl: PropTypes.string,
    videoDate: PropTypes.string,
    editOptionCalled: PropTypes.func,
    deleteCalled: PropTypes.func,
    trainingCard: PropTypes.string,
    cardClick: PropTypes.string,
}

export default CardComponent;
