import React, { Component, useState, useEffect } from "react";
import "./section.css";

import PropTypes from 'prop-types';
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import MarketingReferenceCard from "../../Common/UIComponents/MarketingReferenceCard";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DetailCardComponent from "../../Common/UIComponents/DetailCardComponent";
import SearchFieldInput from "../../Common/FormFields/SearchFieldInput";
import { useDispatch, useSelector } from 'react-redux'
import NoDataFoundComponent from "../../Common/UIComponents/NoDataFoundComponent";
import pfimage from '../../Images/profileimg.jpg';
import ppt from '../../Images/ppt.png';
import pdf from '../../Images/pdf.png';
import doc from '../../Images/doc.png';
import xls from '../../Images/xls.png';
import txt from '../../Images/txt.png';
import GlobalPagination from "../../Common/UIComponents/GlobalPagination";
import CompanyStoreCardSkeleton from '../../Common/UIComponents/CompanyStoreCardSkeleton';
import UnauthorizedSection from "../Sections/CommonSection/UnauthorizedSection";
import { __DEV } from "../../isDev";
import filter from '../../Images/filter.png'
import DropDownFieldInput from '../../Common/FormFields/DropDownFieldInput';
import { DROPDOWN_MENU } from "../AppConfig";
import { getAllCategory, addCategory } from "../../redux/action";
import Popover from '@material-ui/core/Popover';

var moment = require('moment');

const MarketingList = (props) => {
    const dispatch = useDispatch()
    const [openInfo, setOpenInfo] = useState(false);
    const userDetail = useSelector(state => state.userDetail);
    const [marketingListData, setMarketingData] = useState({});
    const [flag, setFlag] = useState('true');
    const [searchText, setSearchText] = useState('');
    const [spage, setSpage] = useState(1);
    const [page, setPage] = useState(1);
    const [listData, setMarketingListData] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [filterOptions, setFilterOptions] = React.useState(DROPDOWN_MENU.filetr_dropdown)
    const [categoryArrData, setcategoryArr] = useState([]);
    const categoryArr = useSelector(state => state.marketCatList);
    const [catData, setcatdata] = useState(null);

    console.log(categoryArr);

    const openInformation = (marketingData) => {

        setMarketingData(marketingData);

        setOpenInfo(!openInfo)

    }

    useEffect(() => {
        setMarketingListData(props.marketList);

    }, [props]);

    const getAllMarketingList = (e) => {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'marketing/getAll?page=' + page + '&resPerPage=12' + '&category=' + e, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result.result);
                if (!result.error) {
                    setMarketingListData(result.result)
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });

    }


    {/*================ Function for count total pages================= */ }
    const totalPages = () => {

        var mPages = userDetail.obj && userDetail.obj.nMarketing

        let total = parseInt(mPages / 12);

        let rem = mPages % 12;

        if (rem > 0)
            return total + 1;

        else
            return total;
    }

    {/* =============Pagination for marketing list=============== */ }
    const changePage = (page) => {

        if (!(searchText.length > 0)) {
            __DEV && console.log(page, 'L214');

            setPage(page);

            const reqValues = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem('auth_token')
                }

            };
            fetch(process.env.REACT_APP_apiurl + 'marketing/getAll?resPerPage=12&page=' + page, reqValues)
                .then(result => result.json())
                .then(result => {

                    __DEV && console.log(result);
                    if (!result.error) {
                        setMarketingListData(result.result);
                    }
                    else {

                    }
                })
                .catch(err => {
                    __DEV && console.log(err)
                });

        } else {

            setSpage(page);
        }


    }

    useEffect(() => {

        if (searchText != '') {

            searchMarket(searchText);
        }


    }, [spage])


    /////// onChange function ////////
    const handleChange = (e) => {

        __DEV && console.log(e);

        setSearchText(e);

        if (e.length > 0) {

            searchMarket(e);

        } else {

            getAllMarketingList();

        }

    }

    const searchMarket = (data) => {
        __DEV && console.log(data, 'data');

        setMarketingListData(null);

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + "marketing/search?searchString=" + data + "&resPerPage=12&page=" + spage, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {

                    setMarketingListData(result.result)
                }
                else {

                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });

    }
    const openFilerDropdown = event => {
        setAnchorEl(event.currentTarget);
    };
    const closeFilterDropdown = event => {
        setAnchorEl(null);
    };


    ///////// filter handleclick function ////

    const handleDropDown = (e) => {
        console.log(e);
        if (e) {
            setcatdata(e);
            // allReference(e);
        }

    }

    //// handle submi function /////
    const handleSubmit = () => {

        getAllMarketingList(catData);
        // closeFilterDropdown();
    }


    //////filter reset function /////
    const handleReset = () => {

        getAllMarketingList();
        setcatdata(null);
        closeFilterDropdown();


    }


    return (
        <div className={"marketinglistectionstart forMarketingSectionCls"}>
            <div className="marketinglistSection">
                <div className="marketingtitlesec forsearchbaraligenment">
                    <div className='marketingtitlesearchbardiv'>

                        <p >Marketing
                  {userDetail && userDetail.role !== 'agent' && localStorage.getItem('auth_token') ?
                                <ButtonComponent
                                    buttontext='Add Marketing' buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-md hiddeniPad' handleButton={props.addFormCalled} />
    : null}
                        </p>
                        <SearchFieldInput onChange={handleChange} />
                    </div>
                    <div className="listtopheader">
                        {userDetail && userDetail.role !== 'agent' && localStorage.getItem('auth_token') ?
                            <ButtonComponent
                                buttontext='Add Marketing' buttonextraclass='addmaketing-btn' 

                                mainbuttonextra='hidden-xs visibleiPad' 
                                handleButton={props.addFormCalled} /> : null}
                        <div aria-describedby={anchorEl ? "simple-popover" : ''}>
                            <ButtonComponent
                                buttontext='filter' btnimg={filter} buttonextraclass='filterbutton' handleButton={event => openFilerDropdown(event)}
                            />
                        </div>
                    </div>
                </div>
                <Popover
                    id={anchorEl ? "simple-popover" : ''}
                    open={anchorEl}
                    anchorEl={anchorEl}
                    onClose={closeFilterDropdown}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    className="filterdropdown"
                >
                    <div className='fliterpopover'>
                        <div className='popoverinner'>
                            {categoryArr.map(x => {
                                return (
                                    <p className={catData === (x.name) && 'activeflitercls'} 
                                    onClick={() => handleDropDown(x.name)}
                                    >{x.name}</p>
                                )
                            })
                            }
                        </div>
                        <div className='popoverfooter'>
                            <ButtonComponent
                                buttontext='reset' handleButton={handleReset} buttonextraclass='fliterinnerbtn resetfilterbtn'
                            />
                            <ButtonComponent
                                buttontext='Submit' handleButton={handleSubmit} buttonextraclass='fliterinnerbtn submitfliter'
                            />
                        </div>

                    </div>

                </Popover>
                {/* <DropDownFieldInput
                    id={anchorEl ? "simple-popover" : ''}
                    open={anchorEl}
                    anchorEl={anchorEl}
                    handleClose={closeFilterDropdown}
                    // dropdownOptions={categoryArrData}
                    dropdownOptions={categoryArr.map(x=>{
                        return(
                            {label:x.name,value:x.name}
                        )
                        
                    })}

                    handleClick={handleDropDown}
                    dropdownanchercls="filterdropdown"
                /> */}

                <hr className="borderline" />
                <div className="marketinglist">

                    {localStorage.getItem('auth_token') ?
                        <div>

                            <Grid container spacing={2}>
                                {listData && listData.length > 0 ? listData.map(x => {
                                    return (
                                        <Grid item md={4} xs={12} sm={6}>
                                            <MarketingReferenceCard
                                                downloadOption
                                                doc={x.document}
                                                src={x.document[0].mimetype.includes('png') || x.document[0].mimetype.includes('jpeg') || x.document[0].mimetype.includes('jpg') ?
                                                    process.env.REACT_APP_apiurl + 'getFile?key=' + x.document[0].key : x.document[0].mimetype.includes('pdf') ?
                                                        pdf : x.document[0].mimetype.includes('text/plain') ? txt : x.document[0].mimetype.includes('application/vnd.ms-powerpoint') ? ppt : (x.document[0].mimetype.includes('xls') || x.document[0].mimetype.includes('sheet')) ? xls : (x.document[0].mimetype.includes('doc') || x.document[0].mimetype.includes('word')) ? doc : null}
                                                category={x.category}
                                                // date={moment(x.createdDate).format("MMMM Do YYYY")}
                                                description={x.description}
                                                title={x.title}
                                                cardData={x}
                                                openCard={() => openInformation(x)}
                                                editOptionCalled={() => props.addFormCalled(x, flag)}
                                                deleteCalled={() => props.deleteCalled(x)} />
                                        </Grid>)
                                }) : (listData && listData.length == 0) ? <NoDataFoundComponent /> : (<Grid item md={4} xs={12} sm={6}>
                                    <CompanyStoreCardSkeleton />
                                </Grid>)}
                            </Grid>
                        </div> : <UnauthorizedSection />}
                </div>
            </div>
            <Dialog className='carddetaildialog'
                onClose={openInformation} aria-labelledby="simple-dialog-title" open={openInfo}>
                <div>
                    <DetailCardComponent cardData={marketingListData} deatilsClose={openInformation} downloadbutton />
                </div>
            </Dialog>
            {localStorage.getItem('auth_token') &&
                <GlobalPagination total={totalPages()} pageChange={changePage} />}
        </div>
    );

}

MarketingList.propTypes = {

    addFormCalled: PropTypes.func,

};

export default MarketingList;
