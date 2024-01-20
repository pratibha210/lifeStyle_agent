import React, { Component, useEffect, useState } from "react";
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
import bed from '../../Images/bed.png'
import resize from '../../Images/resize.png'
import bath from '../../Images/bath.png'
import ButtonComponent from './ButtonComponent';
import min from '../../Images/minsign.png';
import max from '../../Images/maxsign.png';
import edit from '../../Images/course_edit.png';
import { __DEV } from "../../isDev";
import location from '../../Images/marker.png';
import user from '../../Images/propertyuser.png';

const BuyerBooksCard = (props) => {

    __DEV && console.log(props.myBuyerList, 'Lone 22');


    const [anchorEl, setAnchorEl] = React.useState(null)
    const [trainingOption, setTrainingOption] = React.useState(DROPDOWN_MENU.training_dropdown)
    const userDetail = useSelector(state => state.userDetail);
    const [buyerList, setBuyerList] = useState([])

    // if (userDetail.role === 'agent') {

    // } else {
    //     setBuyerList([])
    // }

    // useEffect(() =>
    // {
    //     if (props.allBuyerList) {
    //         console.log(props.allBuyerList);
    //         setBuyerList(props.allBuyerList)
    //     } else {
    //         console.log(props.myBuyerList, 'Lone 22');
    //         setBuyerList(props.myBuyerList)
    //     }
    // }, [props])



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
        <div className="buyercardComponent">

            <Card
                className={"buyerCard" + " " + props.extraCls}
                onClick={props.cardClick}
            >
                <CardContent>
                    <div className='locationrow'>
                        <img src={location} />
                        {props.address ? props.address.map((x,i,l)=>{ return(<p>{x}{i===(l.length-1)?'':', '}</p>)}):null}
                    </div>
                    {userDetail.role=='agent'&&
                    <div className='editoption' onClick={props.editClicked}>
                        <img src={edit} />
                        {/* <p>Edit</p> */}
                    </div>
                    }
                    <div className='buyerbookcotent'>
                        <div className='buyercardfirstsec'>
                            <div className='buyercardinner'>
                                <p className="price">$ {props.minprice ? props.minprice : '--'}<span>Min</span></p>
                                <p className="price subprice">$ {props.maxprice ? props.maxprice : '--'}<span>Max</span></p>
                            </div>
                            <div className='buyercardinner'>
                                <p className='buyercounthead'>{props.minbedroom ? props.minbedroom : '--'}<span>Min</span></p>
                                <p className='buyercounthead'>{props.maxbedroom ? props.maxbedroom : '--'}<span>Max</span></p>
                                <div className="facilities">
                                    <img src={bed} className='buyercardimg bedimg' /><span>Beds</span>
                                </div>
                            </div>
                        </div>

                        <div className='buyercardfirstsec'>
                            <div className='buyercardinner'>
                                <p className='buyercounthead'>{props.minarea ? props.minarea : '--'}<span>Min</span></p>
                                <p className='buyercounthead'>{props.maxarea ? props.maxarea : '--'}<span>Max</span></p>
                                <div className="facilities">
                                    <img src={resize} className='buyercardimg' /><span>sq/ft</span>
                                </div>
                            </div>
                            <div className='buyercardinner'>
                                <p className='buyercounthead'>{props.minbathroom ? props.minbathroom : '--'}<span>Min</span></p>
                                <p className='buyercounthead'>{props.maxbathroom ? props.maxbathroom : '--'}<span>Max</span></p>
                                <div className="facilities">
                                    <img src={bath} className='buyercardimg bathimg' /><span className="bathtext">Bath</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </CardContent>
                <div className={"buyerbookfooter" + ' ' + props.activeclass}>

                    <div className='leftfooter'>
                        {/* <div className='locationrow'>
                        <img src={location} />
                        <p>Location</p>
                    </div> */}
                        <div className='locationuser'>
                            <img src={user} />
                            <p className="buyername">{props.name}</p>
                        </div>
                    </div>
                    {/* <p className="buyername"> Select </p> */}

                    <ButtonComponent buttontext={props.buyerSelectText}
                        dataId={props.dataId}
                        //  value={props.value}
                        handleButton={props.selectBuyer}
                        buttonextraclass={'buyerselectbtncls' + ' ' + props.buyerSelectCls} />
                </div>
            </Card>

        </div >
    );

}

BuyerBooksCard.prototype = {
    cardImg: PropTypes.string,
    cardHeading: PropTypes.string,
    cardDetl: PropTypes.string,
    videoDate: PropTypes.string,
    editOptionCalled: PropTypes.func,
    deleteCalled: PropTypes.func,
    trainingCard: PropTypes.string,
    cardClick: PropTypes.string,
    editClicked: PropTypes.func,
    address:PropTypes.string
    // minprice: PropTypes.string,
    // maxprice: PropTypes.string,
    // minbedroom: PropTypes.string,
    // maxbedroom: PropTypes.string,
    // minbathroom: PropTypes.string,
    // maxbathroom: PropTypes.string,
}

export default BuyerBooksCard;
