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


const CompanyStoreCard = (props) =>
{
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [trainingOption, setTrainingOption] = React.useState(DROPDOWN_MENU.training_dropdown);
    const userDetail = useSelector(state => state.userDetail);


    const openCardDropdown = event =>
    {
        setAnchorEl(event.currentTarget);
    };
    const closeCardDropdown = event =>
    {
        setAnchorEl(null);
    };
    const handleOption = (e) =>
    {
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
        <div className="cardComponent ">
            {userDetail.role !== 'agent' && props.moreIcon ?
                <div className="menuIconArea">
                    <MoreVertIcon
                        onClick={event => openCardDropdown(event)}
                    />
                </div>
                : null}
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
            <Card className={"CompanystoreCard" + " " + props.extraCls}>

                <CardMedia className="companycard-MediaCls">
                    <img src={props.cardImg} alt="video1" />
                </CardMedia>
                <CardContent>
                    <div className='comapnycard-innerdiv'>
                        <h2 className="company-cardHeading">{props.CompanyTitle}</h2>
                        <p className="company-cardType">{props.CompanyPrice}</p>
                    </div>

                    <p className="company-deatail">{props.ProductDertails}</p>
                </CardContent>
            </Card>
        </div>
    );

}

CompanyStoreCard.prototype = {
    cardImg: PropTypes.string,
    CompanyPrice: PropTypes.string,
    ProductDertails: PropTypes.string,
    extraCls: PropTypes.string,
    moreIcon: PropTypes.bool,
    CompanyTitle: PropTypes.string,
}

export default CompanyStoreCard;
