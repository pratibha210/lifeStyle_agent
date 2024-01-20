import React from 'react';
import './uicomponent.css';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import pfimage from '../../Images/profileimg.jpg'
import menuicon from '../../Images/menu.png'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ButtonComponent from './ButtonComponent';
import download from '../../Images/download.png';
import DropDownFieldInput from '../FormFields/DropDownFieldInput';
import { DROPDOWN_MENU } from '../../Components/AppConfig';
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton';

const MarketingReferenceCard = (props) =>
{
    // console.log(props.cardData.document, '16LL');
    const userDetail = useSelector(state => state.userDetail)
    const [collapse, setCollapse] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuOption, setMenuOption] = React.useState(DROPDOWN_MENU.training_dropdown)
    

    const moreBtnClick = () =>
    {
        setCollapse(true);
    }
    const lessBtnClick = () =>
    {
        setCollapse(false);
    }
    const openMenuDropdown = event =>
    {
        setAnchorEl(event.currentTarget);
    };
    const closeMenuDropdown = event =>
    {
        setAnchorEl(null);
    };
    const handleOption = (e) =>
    {
        closeMenuDropdown()
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
    const downloads = () =>
    {
        console.log(props.cardData && props.cardData.document[0].name, 'L99>>');

        // https://api.lifeagent.agiantidea.com/getFile?key='key_here

        const url = process.env.REACT_APP_apiurl + "getFile?key=" + props.cardData.document[0].key;
        const a = document.createElement('a');
        a.href = url;
        a.download = props.cardData && props.cardData.document[0].name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    const openMenu = { anchorEl };
    const id = openMenu ? "simple-popover" : undefined;
    return (
        <div className="marketingreferencecard">
            <div className="listcard">
                <Grid container spacing={2} className='marketingcardstart'>
                    <Grid item md={4} xs={4} sm={4} className='marketinginfo'>
                        
                        <div className="pfimagediv marketcardimg">
                            {/* {props.doc.length == null?
                            <Skeleton width={'100%'} height={'100%'} />
                            :
                            props.doc.length >=0? */}
                            <img src={props.src} className="cardimage" />
                            {/* <Skeleton /> */}
                            {/* :
                            null
                            } */}

                        </div>  
                    </Grid>
                    <Grid item md={8} xs={8} sm={8} className='marketinginfo'>
                        <p className="cardtitle"> {props.title} </p>
                        {/* <p className="uploadeddate">{props.date}</p> */}
                        <p className="uploadeddate cardcategory">Catergory : <span> {props.category}</span></p>
                        <p className={"carddesc"}>
                            {props.description}
                        </p>
                    </Grid>

                </Grid>
                <div className="cardfooterdiv">
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={6} sm={6}>
                            {props.downloadOption &&
                               
                                    <ButtonComponent btnimg={download}
                                        buttontext='Download File'
                                        buttonextraclass='download-btn'
                                        handleButton={downloads}
                                    />
                                
                            }
                        </Grid>
                        <Grid item md={6} xs={6} sm={6} className="marketreferviewbtnGrid">
                            <ButtonComponent buttontext='View Details' buttonextraclass='download-btn detailbtn' handleButton={props.openCard} />
                        </Grid>

                    </Grid>
                </div>
                {userDetail.role === 'manager' || userDetail.role === 'admin' ?
                    <div className="menuIconArea formanagermenu" aria-describedby={anchorEl ? "simple-popover" : ''}
                        onClick={event => openMenuDropdown(event)}>
                        <MoreVertIcon />
                    </div> : null}
            </div>
            <DropDownFieldInput
                id={anchorEl ? "simple-popover" : ''}
                open={anchorEl}
                anchorEl={anchorEl}
                handleClose={closeMenuDropdown}
                dropdownOptions={menuOption.options}
                handleClick={handleOption}
                dropdownanchercls="cardDropdwonCls"
                // dropdownOptions={[
                //     { label: 'My Account' },
                //     { label: 'Logout' }
                // ]}
                dropdownextracls="headerdropdown"
            // dropdownanchercls="profilredropdown"
            // dropdownextracls="dropdownnavbar albumdropdownextra"
            // dropdownanchercls="navbarancher albumdropdownancher"
            />
        </div>
    );

}

MarketingReferenceCard.prototype = {
    errorText: PropTypes.string,
    openCard: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    downloadOption: PropTypes.bool
}

export default MarketingReferenceCard;
