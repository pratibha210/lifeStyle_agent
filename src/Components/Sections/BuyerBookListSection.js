/* eslint-disable no-lone-blocks */
import React, { Component, useEffect, useState } from "react";
import "./section.css";
import Grid from '@material-ui/core/Grid';
import pfimage from '../../Images/unnamed.png'
import menuicon from '../../Images/menumb.png'
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import SearchFieldInput from "../../Common/FormFields/SearchFieldInput";
import BuyerBooksCard from "../../Common/UIComponents/BuyerBooksCard";
import filter from '../../Images/filter.png'
import FilterForm from "../Forms/FilterForm";
import { useHistory, NavLink } from 'react-router-dom';
import GlobalPagination from '../../Common/UIComponents/GlobalPagination';
import NoDataFoundComponent from "../../Common/UIComponents/NoDataFoundComponent";
import { __DEV } from "../../isDev";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UnauthorizedSection from "../Sections/CommonSection/UnauthorizedSection";
import TextAreaFieldInput from "../../Common/FormFields/TextAreaFieldInput";
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const BuyerBookListSection = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  

    const handleChange = (event, newValue) => {

        setValue(newValue);
    };
    const history = useHistory();
    const [buyerselectClick, setBuyerselectClick] = useState(false);
    const [filterstate, setFilterstate] = useState(false);
    const [buyerData, setbuyerData] = useState([]);
    const [pages,setPages] = useState(props.totalBuyerCount)
    const [flag, setFlag] = useState(true);
    const [listid, setId] = useState([]);
    const userDetail = useSelector(state => state.userDetail);
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [loading, setloading] = useState(false);
    const [messageAgents, setMessageAgents] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [filterData, setFilterData] = React.useState({});

    const massageAgentOpen = () => {
        setMessageAgents(true);
    };
    const massageAgentClose = () => {
        setMessageAgents(false);
    };


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
    // useEffect(() => {
    //     console.log(listid);

    // }, [listid])



    const changeMessage = (e, val) => {
        setMessage(val);
    }

    const showfilterForm = () => {
        setFilterstate(!filterstate)
    }
    const closeFilterForm = () => {

        setFilterData({})
        setFilterstate(false)
        changePage();

    }

    useEffect(() => {
        // __DEV && console.log(props.totalBuyerCount);

        setbuyerData(props.buyerList);
    }, [props]);


    useEffect(() => {
        __DEV && console.log(buyerData, '52L');
    }, [buyerData])

    useEffect(()=>{

        if(value == 0){

            if(Object.keys(filterData).length > 0 && filterstate){

                applyFilter(filterData)

            }else{

                getBuyerList('buyer')
            }

        }else{

            if(Object.keys(filterData).length > 0 && filterstate){

                applyFilter(filterData)

            }else{

                getBuyerList('listing')
            }
        }

    },[value])

    {/*================== API call for get Buyer list ====================== */ }
    const getBuyerList = (params) => {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'buyer/get?resPerPage=12&page=1&type='+params, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    setbuyerData(result.result);
                    setPages(result.nBuyers);
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });

    }



    const goToMyBuyer = () => {
        history.push('/buyerbooks/mybuyer')
    }

    const totalPages = () => {

        // __DEV && console.log(props.totalBuyerCount);
        var mPages =pages

        let total = parseInt(mPages / 12);

        let rem = mPages % 12;

        if (rem > 0)
            return total + 1;

        else
            return total;
    }

    {/* =============Pagination for marketing list=============== */ }
    const changePage = (page) => {
        __DEV && console.log(page, 'L214')
        // setPagenumber(page);

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };

        if(value == 0){
        fetch(process.env.REACT_APP_apiurl + 'buyer/get?resPerPage=10&page=' + page+"&type=buyer", reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    setbuyerData(result.result);
                   
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });
        }else{

            fetch(process.env.REACT_APP_apiurl + 'buyer/get?resPerPage=10&page=' + page+"&type=listing", reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    setbuyerData(result.result);
                   
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });


        }


    }

    

    const applyFilter = (data) => {
        __DEV && console.log(data);

        setFilterData(data)

        var params ='';

        if(value == 0){

            params = "buyer"
 
          
        }else{

            params = "listing";


        }

        let url = process.env.REACT_APP_apiurl + 'buyer/get?resPerPage=20&page=' + 1 +"&type="+params

        if (data.location) {
            url = `${url}&location=${data.location}`
        }
        if (data.minPriceRange) {
            url = `${url}&minPriceRange=${data.minPriceRange}`
        }
        if (data.maxPriceRange) {
            url = `${url}&maxPriceRange=${data.maxPriceRange}`
        }
        if (data.minBathrooms) {
            url = `${url}&minBathrooms=${data.minBathrooms}`
        }
        if (data.maxBathrooms) {
            url = `${url}&maxBathrooms=${data.maxBathrooms}`
        }
        if (data.minBedrooms) {
            url = `${url}&minBedrooms=${data.minBedrooms}`
        }
        if (data.maxBedrooms) {
            url = `${url}&maxBedrooms=${data.maxBedrooms}`
        }
        if (data.minArea) {
            url = `${url}&minArea=${data.minArea}`
        }
        if (data.maxArea) {
            url = `${url}&maxArea=${data.maxArea}`
        }
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(url, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    setbuyerData(result.result);
                    // closeFilterForm();
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });

    }


    ///////// API call from here for send //////////
    const sendmessage = () => {

        __DEV && console.log(listid);

        setloading(true)

        const reqValues = {
            method: "POST",
            body: JSON.stringify({ message: message, buyers: listid }),

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }
        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "buyer/sendmessage", reqValues)
            .then(result => result.json())
            .then(result => {
                __DEV && console.log(result);
                setloading(false)
                setMessage('')
                massageAgentClose()


                if (!result.error) {
                    __DEV && console.log(result.result);
                    setAlertMessage({ open: true, message: "Message sent Sucessfully ", alertType: 'success' })

                }
                else {
                    setAlertMessage({ open: true, message: "Please Select BuyerBook", alertType: 'error' })


                }
            })
            .catch(err => {
                __DEV && console.log(err);
                setloading(false)


            })


    };

    const notificationClose = () => {
        setAlertMessage({ open: false })
    }



    return (
        <div className={"marketinglistectionstart buyerlistsection"}>
            <div className="marketinglistSection">

                {/* {userDetail.role === 'agent' ? */}

                <div className="marketingtitlesec">
                    <p>Buyer books List
                        {localStorage.getItem('auth_token') &&
                            userDetail.role === 'agent' &&
                            <ButtonComponent
                                buttontext='My Buyer' buttonextraclass='buyerbooknavigationbtn' handleButton={goToMyBuyer} />
                        }
                        {localStorage.getItem('auth_token') && userDetail.role === 'agent' &&
                            <ButtonComponent
                                disabled={listid.length > 0 ? false : true}
                                buttontext='Message Agents'
                                buttonextraclass='addmaketing-btn messageagentbtn hideformobile'
                                mainbuttonextra='hideformobile'
                                handleButton={massageAgentOpen}
                                loading={loading} />
                        }

                    </p>
                    {/* <div className="">*/}
                    <div className="listtopheader">
                    {localStorage.getItem('auth_token') && userDetail.role === 'agent' &&
                            <ButtonComponent
                                disabled={listid.length > 0 ? false : true}
                                buttontext='Message Agents'
                                buttonextraclass='addmaketing-btn messageagentbtn hidefordesktop'
                                // mainbuttonextra='hideformobile'
                                handleButton={massageAgentOpen}
                                loading={loading} />
                        }
                        <ButtonComponent
                            buttontext='filter' btnimg={filter} buttonextraclass='filterbutton' handleButton={showfilterForm}
                        // buttontext='filter' btnimg={filter} buttonextraclass='filterbutton' handleButton={props.filtercalled} 
                        />
                        {userDetail.role !== 'agent' &&
                            <ButtonComponent
                                buttontext='Delete' buttonextraclass='buyerbookdeletebtn' handleButton={props.deleteCalled} />
                        }
                    </div>

                </div>
                {/* } */}
                <Dialog onClose={massageAgentClose} aria-labelledby="customized-dialog-title" open={messageAgents} className='msgagentdialg'>
                    {/* <DialogTitle id="customized-dialog-title" onClose={massageAgentClose}>
                    Message Agents
        </DialogTitle> */}
                    <div className="addformtitle">
                        <p>Message</p>

                        <CloseIcon className="closeimg" onClick={massageAgentClose} />
                    </div>
                    <DialogContent>
                        <TextAreaFieldInput rowsnumber={4} inputLabel='Content'
                            textinputname='content'
                            onChange={changeMessage}
                            onError={(err) => console.log(err)}
                        // // error={props.taError}
                        // // errorText={props.taErrorText}
                        // // clickLogin={props.clickLogin}
                        // // defaultValue={props.desValue}
                        //  onError={() => console.log('function called')} onChange={() => console.log('function called')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <ButtonComponent
                            buttontext='Send'
                            buttonextraclass='addmaketing-btn messageagentbtn dialogsendbtnmsgagent'
                            handleButton={sendmessage}
                            loading={loading} />
                    </DialogActions>
                </Dialog>


                {/* <div className="marketingtitlesec hidden-md">
                    <p>Buyer books List
                            <ButtonComponent
                            buttontext='My Buyer' buttonextraclass='buyerbooknavigationbtn' handleButton={goToMyBuyer} />
                    </p>
                    <div className="listtopheader">
                        <ButtonComponent
                            buttontext='Message Agents' buttonextraclass='addmaketing-btn messageagentbtn' handleButton={props.addFormCalled} />

                        <ButtonComponent
                            buttontext='filter' btnimg={filter} buttonextraclass='filterbutton' handleButton={showfilterForm}
                        // buttontext='filter' btnimg={filter} buttonextraclass='filterbutton' handleButton={props.filtercalled} 
                        />
                    </div>
                    

                </div> */}
                {/* : <div className="marketingtitlesec"><p>Buyer books List</p></div>} */}

                <hr className="borderline" />
                <div className="marketinglist">
                    <div className={(filterstate ? 'filterOpen' : 'filterClose') + ' ' + 'filterformdiv'}>
                        {filterstate && <FilterForm handleButton={applyFilter} handleClose={closeFilterForm} />}
                    </div>



                    {localStorage.getItem('auth_token') ?
                        <div>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                                className='resturentdetailstabs'
                            >
                                <Tab label="Buyer Book" {...a11yProps(0)} />
                                <Tab label="Listing" {...a11yProps(1)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <Grid container spacing={2}>
                                    {buyerData && buyerData.length > 0 ?
                                        buyerData.map(data => {
                                            return (

                                                <Grid item md={4} sm={6} xs={12}>
                                                    <BuyerBooksCard buyerName='Agent Name'
                                                        address={data.locations}
                                                        // editClicked={() => props.editClicked(data, flag)}
                                                        minarea={data.area.min}
                                                        maxarea={data.area.max}
                                                        name={data.name}
                                                        maxprice={data.priceRange.max}
                                                        minprice={data.priceRange.min}
                                                        minbedroom={data.bedrooms.min}
                                                        maxbedroom={data.bedrooms.max}
                                                        minbathroom={data.bathrooms.min}
                                                        maxbathroom={data.bathrooms.max}
                                                        dataId={data._id}
                                                        selectBuyer={() => props.selectBuyerCalled(data)}

                                                        buyerSelectText={props.listid && props.listid.findIndex(x => x == data._id) == -1 ? 'Select' : 'Unselect'}
                                                        activeclass={props.listid && props.listid.findIndex(x => x == data._id) == -1 ? ' ' : 'selectedcardcls'}
                                                        buyerSelectCls={props.listid && props.listid.findIndex(x => x == data._id) == -1 ? 'buyerselectbordercls' : 'buyerselectedbtncls'} />
                                                </Grid>
                                            )
                                        })
                                        : (<NoDataFoundComponent />)}

                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Grid container spacing={2}>
                                    {buyerData && buyerData.length > 0 ?
                                        buyerData.map(data => {
                                            return (

                                                <Grid item md={4} sm={6} xs={12}>
                                                    <BuyerBooksCard buyerName='Agent Name'
                                                        address={data.locations}
                                                        // editClicked={() => props.editClicked(data, flag)}
                                                        minarea={data.area.min}
                                                        maxarea={data.area.max}
                                                        name={data.name}
                                                        maxprice={data.priceRange.max}
                                                        minprice={data.priceRange.min}
                                                        minbedroom={data.bedrooms.min}
                                                        maxbedroom={data.bedrooms.max}
                                                        minbathroom={data.bathrooms.min}
                                                        maxbathroom={data.bathrooms.max}
                                                        dataId={data._id}
                                                        selectBuyer={() => props.selectBuyerCalled(data)}

                                                        buyerSelectText={props.listid && props.listid.findIndex(x => x == data._id) == -1 ? 'Select' : 'Unselect'}
                                                        activeclass={props.listid && props.listid.findIndex(x => x == data._id) == -1 ? ' ' : 'selectedcardcls'}
                                                        buyerSelectCls={props.listid && props.listid.findIndex(x => x == data._id) == -1 ? 'buyerselectbordercls' : 'buyerselectedbtncls'} />
                                                </Grid>
                                            )
                                        })
                                        : (<NoDataFoundComponent />)}

                                </Grid>
                            </TabPanel>
                        </div>
                        : <UnauthorizedSection />}
                </div>
            </div>
            <GlobalPagination
                total={totalPages()}
                pageChange={changePage}
            />
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                messageClose={notificationClose}
                alertType={alertMessage.alertType} />
        </div>
    );


}
BuyerBookListSection.propTypes = {

    addFormCalled: PropTypes.func,
    deleteCalled: PropTypes.func,
    editClicked: PropTypes.func
};

export default BuyerBookListSection;
