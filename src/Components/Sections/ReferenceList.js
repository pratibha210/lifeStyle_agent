import React, { Component, useState, useEffect } from "react";
import "./section.css";

import PropTypes from 'prop-types';
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import MarketingReferenceCard from "../../Common/UIComponents/MarketingReferenceCard";
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DetailCardComponent from "../../Common/UIComponents/DetailCardComponent";
import SearchFieldInput from "../../Common/FormFields/SearchFieldInput";
import { __DEV } from "../../isDev";
import { useDispatch, useSelector } from 'react-redux'
import * as moment from 'moment';
import ppt from '../../Images/ppt.png';
import pdf from '../../Images/pdf.png';
import doc from '../../Images/doc.png';
import xls from '../../Images/xls.png';
import txt from '../../Images/txt.png';
import pfimage from '../../Images/profileimg.jpg';
import NoDataFoundComponent from "../../Common/UIComponents/NoDataFoundComponent";
import GlobalPagination from "../../Common/UIComponents/GlobalPagination";
// import FaqSkeleton from '../../Common/UIComponents/FaqSkeleton';
import CompanyStoreCardSkeleton from '../../Common/UIComponents/CompanyStoreCardSkeleton';
import UnauthorizedSection from "../Sections/CommonSection/UnauthorizedSection";
import filter from '../../Images/filter.png'
import DropDownFieldInput from '../../Common/FormFields/DropDownFieldInput';
import Popover from '@material-ui/core/Popover';

const ReferenceList = (props) => {

    const [openInfo, setOpenInfo] = React.useState(false);
    const [collapse, setCollapse] = React.useState(false);
    const userDetail = useSelector(state => state.userDetail);
    const [referenceData, setData] = useState(null);
    const [cardData, setCardData] = useState(null);
    const [flag, setFlag] = useState(true);
    const [pageNumber, setPagenumber] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [spage, setSpage] = useState(1);
    const categoryArr = useSelector(state => state.referenceCatList);
    const [catData, setcatdata] = useState(null);

    //////// send card data to details page //////
    const openInformation = (data) => {
        __DEV && console.log(data);
        setCardData(data);

        setOpenInfo(!openInfo)
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        __DEV && console.log(props.referenceList);
        setData(props.referenceList);
    }, [props])

    useEffect(() => {
        __DEV && console.log(referenceData);

    }, [referenceData]);

    const openFilerDropdown = event => {
        setAnchorEl(event.currentTarget);
    };
    const closeFilterDropdown = event => {
        setAnchorEl(null);
    };



    const allReference = (e) => {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + "reference/getAll?page=1&resPerPage=12" + "&category=" + e, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result.result);
                if (!result.error) {
                    setData(result.result)
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });

    }

    {/* =============Pagination forallReference=============== */ }
    const changePage = (page) => {
        __DEV && console.log(page, 'L214')

        if (!(searchText.length > 0)) {

            setPagenumber(page);

            const reqValues = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem('auth_token')
                }

            };
            fetch(process.env.REACT_APP_apiurl + 'reference/getAll?resPerPage=12&page=' + page, reqValues)
                .then(result => result.json())
                .then(result => {

                    __DEV && console.log(result);
                    if (!result.error) {
                        setData(result.result);
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

        searchReference(searchText);


    }, [spage])


    {/*================ Function for count total pages================= */ }

    const totalPages = () => {

        var mPages = userDetail.obj && userDetail.obj.nReferences

        let total = parseInt(mPages / 12);

        let rem = mPages % 12;

        if (rem > 0)
            return total + 1;

        else
            return total;
    }



    // {==================Serach function start=====================}
    const onsearchChange = (e) => {

        __DEV && console.log(e);

        setSearchText(e);

        if (e.length > 0) {

            searchReference(e);

        } else {

            allReference();

        }

    }


    const searchReference = (data) => {
        __DEV && console.log(data, 'data')
        setData(null);

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + "reference/search?searchString=" + data + "&resPerPage=12&page=" + spage, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {

                    setData(result.result)
                }
                else {

                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });


    }

    const handleDropDown = (e) => {
        console.log(e);
        if (e) {
            setcatdata(e);
            // allReference(e);
        }

    }
    const handleSubmit = () => {

        allReference(catData);
        // closeFilterDropdown();
    }


    const handleReset = () => {

        allReference();
        setcatdata(null);
        closeFilterDropdown();

    }




    return (
        <div className={"marketinglistectionstart referencelist"}>
            <div className="marketinglistSection">
                <div className="marketingtitlesec forsearchbaraligenment">
                    <div className='marketingtitlesearchbardiv'>
                        <p >Reference List
                    {userDetail.role != 'agent' && localStorage.getItem('auth_token') ?
                                < ButtonComponent
                                    buttontext='Add Reference' buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-md hiddeniPad'
                                     handleButton={props.addFormCalled} />
                                : null}
                        </p>
                        <SearchFieldInput onChange={onsearchChange} />
                    </div>
                    <div className="listtopheader">
                        {userDetail.role != 'agent' && localStorage.getItem('auth_token') ?
                            < ButtonComponent
                                buttontext='Add Reference' buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-xs visibleiPad'
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
                                    <p className={catData === (x.name) && 'activeflitercls'}  onClick={() => handleDropDown(x.name)}>{x.name}</p>
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
                    // dropdownOptions={filterOptions.options}
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

                                {referenceData && referenceData.length > 0 ? referenceData.map(data => {
                                    __DEV && console.log(data);
                                    return (
                                        // <FaqSkeleton /> &&
                                        <Grid item md={4} xs={12} sm={6}>

                                            <MarketingReferenceCard
                                                downloadOption
                                                // src={data.document.length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + data.document[0].key : null}
                                                src={data.document[0].mimetype.includes('png') || data.document[0].mimetype.includes('jpeg') || data.document[0].mimetype.includes('jpg') ?
                                                    process.env.REACT_APP_apiurl + 'getFile?key=' + data.document[0].key : data.document[0].mimetype.includes('pdf') ?
                                                        pdf : data.document[0].mimetype.includes('text/plain') ? txt : data.document[0].mimetype.includes('application/vnd.ms-powerpoint') ? ppt : (data.document[0].mimetype.includes('xls') || data.document[0].mimetype.includes('sheet')) ? xls : (data.document[0].mimetype.includes('doc') || data.document[0].mimetype.includes('word')) ? doc : null}
                                                category={data.category}
                                                cardData={data}
                                                // date={moment(parseInt(data.createdDate)).format("DD-MMM-YYYY")}
                                                description={data.description}
                                                title={data.title}
                                                openCard={() => openInformation(data)}
                                                editOptionCalled={() => props.addFormCalled(data, flag)}
                                                deleteCalled={() => props.deleteCalled(data)} />
                                            {/* <FaqSkeleton/> */}
                                        </Grid>
                                    )
                                })

                                    : (referenceData && referenceData.length == 0) ? <NoDataFoundComponent /> :
                                        (<Grid item md={4} xs={12} sm={6}>
                                            <CompanyStoreCardSkeleton />
                                        </Grid>)}

                            </Grid>


                        </div> : <UnauthorizedSection />}

                </div>

            </div>
            <Dialog className='carddetaildialog'
                onClose={openInformation} aria-labelledby="simple-dialog-title" open={openInfo}>
                <div>
                    <DetailCardComponent cardData={cardData} deatilsClose={openInformation} />
                </div>
            </Dialog>
            {localStorage.getItem('auth_token') &&
                <GlobalPagination total={totalPages()} pageChange={changePage} />}
        </div>
    );

}

ReferenceList.propTypes = {

    addFormCalled: PropTypes.func,

};

export default ReferenceList;
