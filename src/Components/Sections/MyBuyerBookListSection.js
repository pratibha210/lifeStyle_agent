/* eslint-disable no-lone-blocks */
import React, { Component, useEffect, useState } from "react";
import "./section.css";
import Grid from '@material-ui/core/Grid';
import pfimage from '../../Images/unnamed.png'
import menuicon from '../../Images/menumb.png'
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import SearchFieldInput from "../../Common/FormFields/SearchFieldInput";

import BuyerBooksCard from "../../Common/UIComponents/BuyerBooksCard";
import filter from '../../Images/filter.png'
import { useHistory, NavLink } from 'react-router-dom';
import GlobalPagination from '../../Common/UIComponents/GlobalPagination';
import NoDataFoundComponent from "../../Common/UIComponents/NoDataFoundComponent";
import { __DEV } from "../../isDev";
import UnauthorizedSection from "../Sections/CommonSection/UnauthorizedSection";
import TrainingCardSkeleton from "../../Common/UIComponents/TrainingCardSkeleton";
const MyBuyerBookListSection = (props) => {

    // console.log(props.buyerList, 'Line 19');

    const history = useHistory();
    const [buyerselectClick, setBuyerselectClick] = useState(false)
    const [list, myList] = useState([])
    const [flag, setFlag] = useState(true);
    const [mybuyer, setmybuyer] = useState(true);
    const [listid, setId] = useState([]);
    const [agentbuyer, setagentbuyer] = useState(null);

    // const selectBuyerCalled = (data) => {
    //     console.log(data);
    //     let arr = [...listid];

    //     if (arr.findIndex(x => x == data._id) > -1) {
    //         // do splice here
    //         let newArr = arr.findIndex(x => { return x === data._id });
    //         arr.splice(newArr, 1);
    //         setId(arr);
    //     }
    //     else {

    //         arr.push(data._id);
    //         setId(arr);
    //     }
    //     // setBuyerselectClick(!buyerselectClick)
    // }

    const goBack = () => {
        history.push('/buyerbooks')
    }

    useEffect(() => {
        __DEV &&  console.log(props.agentBuyerList);
        setagentbuyer(props.agentBuyerList)
    }, [props.agentBuyerList])

    // {/*================== API call for get Buyer list ====================== */ }
    const onchangePage = (page) => {
        __DEV &&  console.log(page, 'L214')
        // setPagenumber(page);

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'buyer/getbyagent?resPerPage=12&page=' + page, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    setagentbuyer(result.result);
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });


    }

    const totalPages = () => {

        __DEV && console.log(props.totalBuyerCount);
        var mPages = props && props.totalBuyerCount

        let total = parseInt(mPages / 12);

        let rem = mPages % 12;

        if (rem > 0)
            return total + 1;

        else
            return total;
    }


    return (
        <div className={"marketinglistectionstart buyerlistsection"}>
            <div className="marketinglistSection">
                <div className="marketingtitlesec">
                    <div className="leftsideTopheader">
                        <p>My Buyer List  </p>
                        <ButtonComponent
                            buttontext='Back to Buyer Book' buttonextraclass='buyerbooknavigationbtn' handleButton={goBack} />
                    </div>
                    <div className="listtopheader">
                        <ButtonComponent
                            buttontext='Add Buyer' buttonextraclass='addmaketing-btn' handleButton={props.addbuyerCalled} />
                        <ButtonComponent
                            buttontext='Delete' buttonextraclass='buyerbookdeletebtn' handleButton={()=> props.deleteCalled('true')} />
                    </div>
                </div>
                <hr className="borderline" />
                <div className="marketinglist">
                    {localStorage.getItem('auth_token') ?
                        <div>
                            {agentbuyer && agentbuyer.length > 0 ?
                                <Grid container spacing={2}>
                                    {/* {props.buyerList&& props.buyerList.length > 0 ? */}
                                    {agentbuyer.map(data => {
                                        return (
                                            <Grid item md={4} sm={6} xs={12}>
                                                <BuyerBooksCard buyerName='Buyer Name'
                                                    address={data.locations}
                                                    editClicked={() => props.editClicked(data, flag, mybuyer)}
                                                    minarea={data.area.min}
                                                    maxarea={data.area.max}
                                                    name={data.name}
                                                    maxprice={data.priceRange.max}
                                                    minprice={data.priceRange.min}
                                                    minbedroom={data.bedrooms.min}
                                                    maxbedroom={data.bedrooms.max}
                                                    minbathroom={data.bathrooms.min}
                                                    maxbathroom={data.bathrooms.max}

                                                    // selectBuyer={selectBuyerCalled}
                                                    myBuyerList={list}
                                                    selectBuyer={() => props.selectBuyerCalled(data)}

                                                    buyerSelectText={props.listid && props.listid.findIndex(x => x == data._id) == -1 ? 'Select' : 'Unselect'}
                                                    activeclass={props.listid && props.listid.findIndex(x => x == data._id) == -1 ? ' ' : 'selectedcardcls'}
                                                    buyerSelectCls={props.listid && props.listid.findIndex(x => x == data._id) == -1 ? 'buyerselectbordercls' : 'buyerselectedbtncls'} />
                                           
                                            </Grid>
                                        )
                                    })}
                                    
                                </Grid> : (agentbuyer && agentbuyer.length == 0) ? <NoDataFoundComponent /> :
                                    (<Grid item lg={4} md={6} sm={6} xs={12}>
                                        <TrainingCardSkeleton extraCls="traningskeleton" />
                                    </Grid>)
                            }
                        </div>
                        : <UnauthorizedSection />}
                </div>

            </div>
            <GlobalPagination
                total={totalPages()}
                pageChange={onchangePage}
            />
        </div>
    );

}

MyBuyerBookListSection.propTypes = {

    addFormCalled: PropTypes.func,
    deleteCalled: PropTypes.func,
    editClicked: PropTypes.func
};

export default MyBuyerBookListSection;
