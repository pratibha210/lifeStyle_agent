import React, { useState, useEffect } from "react";
import BreadcrumbSection from '../../Common/UIComponents/BreadcrumbSection';
import BuyerBookListSection from "../Sections/BuyerBookListSection";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import MyBuyerBookListSection from "../Sections/MyBuyerBookListSection";
import ChipFieldInput from "../../Common/FormFields/ChipFieldInput";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import AddBuyerForm from "../Forms/AddBuyerForm";
import FilterForm from "../Forms/FilterForm";
import { __DEV } from "../../isDev";
import { useDispatch, useSelector } from 'react-redux';

import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import AlertComponent from "../../Common/UIComponents/AlertComponent";

const BuyerBookModule = (props) => {
    const [filterstate, setFilterstate] = useState(false);
    const [buyformOpen, setBuyformOpen] = useState(false);
    const [buyerList, setData] = useState([])


    const [loading, setloading] = useState(false);

    const userDetail = useSelector(state => state.userDetail);
    const [error, setError] = useState({ showerror: false, textField: null, message: null });
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [openAlert, setOpenAlert] = useState(false)

    const [addForm, setAddForm] = useState({});
    // const [error, setError] = useState({});

    const [showJoinMessage, showMsg] = useState(false);
    const [emailMsg, showMail] = useState(false);
    const [locationForm, setlocation] = useState([]);
    const [list, myList] = useState([]);
    const [totalBuyerCount, setBuyerCount] = useState(0)

    const [tempeditData, seteditData] = useState({});
    const [tempFlag, setFlag] = useState(false);
    const [myflag, setmyFlag] = useState(false);
    const [listid, setId] = useState([]);
    const [selectData, setSelectData] = useState(null);
    const [deleteFlag, setseleteFlag] = useState('false');
    const [value,setValue] = useState('');

    

    const notificationClose = () => {
        setAlertMessage({ open: false })
    }

    ///////delete data recevied function///////////
    const openDelete = (flag) => {

        // if(selectData ===null){
        //     setOpenAlert(false)
        //  setAlertMessage({ open: true, message: "Please Select BuyerBook for Delete", alertType: 'error' })

        // }
        // else{
            __DEV &&  console.log('delete called',flag);
        // setdeleteId(data);
        setseleteFlag(flag);
        setOpenAlert(true)
        // }
    }

    const closeDelete = () => {
        setOpenAlert(false)
    }

    const addbuyerCalled = (data, flag, mybuyer) => {
        __DEV && console.log(data, flag, mybuyer);
        if (Object.keys(data).length > 0) {

            seteditData(data);
            setFlag(flag);
            setmyFlag(mybuyer);
            setBuyformOpen(true)
        }
        else {
            seteditData({});
            setFlag(false);
            setBuyformOpen(true)

        }
        setError({

            message: null,
            textField: null,
            showerror: false

        })

    }



    /////////////////////// Select option function ///////


    const selectBuyer = (data) => {
        __DEV && console.log(data);
        setSelectData(data);
        let arr = [...listid];

        if (arr.findIndex(x => x == data._id) > -1) {
            // do splice here
            let newArr = arr.findIndex(x => { return x === data._id });
            arr.splice(newArr, 1);
            setId(arr);
        }
        else {

            arr.push(data._id);
            setId(arr);
        }
        // setBuyerselectClick(!buyerselectClick)
    }
    useEffect(() => {
        __DEV && console.log(listid);

    }, [listid])

    //////////////////////


 {/*================== API call for delete buyer books ====================== */ }
 const deleteBuyerbook = () =>
 {
     setloading(true)
     __DEV && console.log(listid);
     const reqValues = {
         method: "DELETE",
         body: JSON.stringify({
            buyerId: listid
          }),

         headers: {
             'Authorization': localStorage.getItem('auth_token'),
             "Content-Type": "application/json"
         }

     };
     __DEV && console.log(reqValues.body);
     fetch(process.env.REACT_APP_apiurl + "buyer/delete", reqValues)
         .then(result => result.json())
         .then(result =>
         {

             __DEV && console.log(result);
             setloading(false);

             setOpenAlert(false);

             if (!result.error) {
                 __DEV && console.log(result.result);
                 setAlertMessage({ open: true, message: "BuyerBooks Deleted Sucessfully", alertType: 'success' })
                 // getAllMarketingList();


                 let arr = [...buyerList];
                 let newArr = arr.filter(x => x._id !== listid.id)
                 setData(newArr);
                 if(deleteFlag !=='true'){
                    getBuyerList();
                
                 }
                 else{
                    getBuyerListbyAgent();
                 }

             } else {
                 
                setAlertMessage({ open: true, message: "Something went wrong... Please try again", alertType: 'error' })


             }
         })
         .catch(err =>
         {
             setloading(false)
             ///// useState for show  err message///
            
             __DEV && console.log(err)
         });

 }



    useEffect(() => {

        __DEV && console.log(tempeditData);

    }, []);


    const buyerformClose = () => {

        setBuyformOpen(false)
        setValue('');
        seteditData({});
        setError({

            message: null,
            textField: null,
            showerror: false

        })

    }


    useEffect(() => {
        // myList(props.buyerList)
        getBuyerListbyAgent();

    }, [localStorage.getItem('auth_token')])

    {/*================== API call for get Buyer list for agent ====================== */ }
    const getBuyerListbyAgent = () => {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'buyer/getbyagent?resPerPage=10&page=1', reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result.result);
                if (!result.error) {
                    myList(result.result)
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });

    }


    useEffect(() => {

        getBuyerList();

    }, [localStorage.getItem("auth_token")])


    {/*================== API call for get Buyer list ====================== */ }
    const getBuyerList = () => {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'buyer/get?resPerPage=12&page=1&type=buyer', reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    setData(result.result)
                    setBuyerCount(result.nBuyers)
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });

    }


    ////////// onchange finction /////////

    const handleChange = (name, value) => {


        __DEV && console.log(name, value);


        setAddForm(prev => {
            return {
                ...prev,
                [name]: value
            }


        });
        __DEV && console.log(addForm)



    }
    ////////// onchange finction /////////

    const locationChange = (e) => {


        __DEV && console.log(e);
        setlocation(e);

        __DEV && console.log(locationForm)

    }


    ////////// onchange finction /////////
    const errorChange = (name, value) => {

        setError(prev => {
            return {
                ...prev,
                [name]: value
            }


        })


    }

    useEffect(() => {
        __DEV &&  console.log(error);
    })

    ////// for button disabled true/false/////
    const disableChange = () => {
        __DEV && console.log(error)
        if (Object.keys(error).find(x => error[x] !== null)) {

            return true;

        }

        return false;
    }



    useEffect(() => {

        __DEV && console.log(addForm);
    }, [addForm])



    //////// API call function for signup /////////

    const createbuyerBook = () => {


        if (tempFlag == true) {
            if (addForm.minPrice && addForm.maxPrice || addForm.maxBed && addForm.minBed || addForm.maxBath && addForm.minBath || addForm.maxSQ && addForm.minSQ  ) {

                if( addForm.minPrice > addForm.maxPrice){
                setError({

                    message: "It should be minimum",
                    // + addForm.maxPrice,
                    textField: "minPrice",
                    showerror: true

                }, () => {
                    __DEV && console.log(error);
                })
                }

                else if (addForm.maxPrice < addForm.minPrice) {

                    setError({
    
                        maxPrice: "It should be maximum",
                        // + addForm.minPrice,
                        textField: "maxPrice",
                        showerror: true
    
                    }, () => {
                        __DEV && console.log(error);
                    })
    
    
                } else if (addForm.minBed > addForm.maxBed) {
    
    
                    setError({
    
                        message: "It should be minimum",
                        // +addForm.maxBed,
                        textField: "minBed",
                        showerror: true
    
                    }, () => {
                        __DEV && console.log(error);
                    })
    
    
    
                } else if (addForm.maxBed < addForm.minBed) {
    
                    setError({
    
                        message: "It should be maximum",
                        // +addForm.minBed,
                        textField: "maxBed",
                        showerror: true
    
                    }, () => {
                        __DEV &&  console.log(error);
                    })
    
    
                } else if (addForm.minBath > addForm.maxBath) {
    
    
                    setError({
    
                        message: "It should be minimum",
                        // +addForm.maxBath,
                        textField: "minBath",
                        showerror: true
    
                    }, () => {
                        __DEV && console.log(error);
                    })
    
    
    
                } else if (addForm.maxBath < addForm.minBath) {
    
                    setError({
    
                        message: "It should be maximum",
                        // +addForm.minBath,
                        textField: "maxBath",
                        showerror: true
    
                    }, () => {
                        __DEV && console.log(error);
                    })
    
    
                } else if (addForm.minSQ > addForm.maxSQ) {
    
    
                    setError({
    
                        message: "It should be maximum",
                        textField: "minSQ",
                        showerror: true
    
                    }, () => {
                        __DEV && console.log(error);
                    })
    
    
                }else{

                    editBuyerbookks();
                }



            }  else {

                editBuyerbookks();
            }
        }
        else {
            __DEV && console.log(addForm);

            if (Object.keys(addForm).find(x => addForm[x] !== null)) {

                ///////// API call from here for add buyer book //////////

                if (addForm.minPrice && addForm.maxPrice || addForm.maxBed && addForm.minBed || addForm.maxBath && addForm.minBath || addForm.maxSQ && addForm.minSQ ) {

                    if( addForm.minPrice > addForm.maxPrice){


                    setError({

                        message: "It should be minimum",
                        // +addForm.maxPrice,
                        textField: "minPrice",
                        showerror: true

                    })
                    }

                    else if (addForm.maxPrice < addForm.minPrice) {

                        setError({
    
                            message: "It should be maximum",
                            // + addForm.minPrice,
                            textField: "maxPrice",
                            showerror: true
    
                        }, () => {
                            __DEV &&  console.log(error);
                        })
    
                    } else if (addForm.minBed > addForm.maxBed) {
    
    
                        setError({
    
                            message: "It should be minimum",
                            // +addForm.maxBed ,
                            textField: "minBed",
                            showerror: true
    
                        }, () => {
                            __DEV &&  console.log(error);
                        })
    
    
    
                    }
                    else if (addForm.maxBed < addForm.minBed) {
    
                        setError({
    
                            message: "It should be maximum",
                            // +  addForm.minBed,
                            textField: "maxBed",
                            showerror: true
                        }, () => {
                            __DEV && console.log(error);
                        })
    
    
                    } else if (addForm.minBath > addForm.maxBath) {
    
    
                        setError({
    
                            message: "It should be minimum",
                            // +addForm.maxBath,
                            textField: "minBath",
                            showerror: true
                        })
    
    
    
                    } else if (addForm.minBath < addForm.minBath) {
    
                        setError({
    
                            message: "It should be maximum",
                            // +addForm.minBath,
                            textField: "maxBath",
                            showerror: true
                        }, () => {
                            __DEV && console.log(error);
                        })
    
    
    
                    } else if (addForm.minSQ > addForm.maxSQ) {
    
    
                        setError({
    
                            message: "It should be minimum",
                            // +addForm.maxSQ,
                            textField: "minSQ",
                            showerror: true
    
                        })
                        setErr({ showtexterr: false })
    
    
    
                    } else if (addForm.maxSQ < addForm.minSQ) {
    
                        setError({
    
                            message: "It should be maximum",
                            // +addForm.minSQ,
                            textField: "maxSQ",
                            showerror: true
    
                        })
                        setErr({ showtexterr: false })
    
    
                    } else{

                        setloading(true)

                        const reqValues = {
                            method: "POST",
                            body: JSON.stringify({
    
    
                                name: addForm.name,
                                locations: locationForm,
                                priceRange: {
                                    max: addForm.maxPrice,
                                    min: addForm.minPrice
                                },
                                bedrooms: {
                                    max: addForm.maxBed,
                                    min: addForm.minBed
                                },
                                bathrooms: {
                                    max: addForm.maxBath,
                                    min: addForm.minBath
                                },
                                area: {
                                    min: addForm.maxSQ,
                                    max: addForm.minSQ
                                },
    
                                role: 'agent',
                                type:value.value
    
    
                            }),
                            headers: {
                                Authorization: localStorage.getItem('auth_token'),
                                "Content-Type": "application/json"
                            }
                        };
                        __DEV && console.log(reqValues.body);
                        fetch(process.env.REACT_APP_apiurl + "buyer/add", reqValues)
                            .then(result => result.json())
                            .then(result => {
                                __DEV && console.log(result);
                                setloading(false)
    
    
    
                                if (!result.error) {
                                    __DEV && console.log(result.result);
    
                                    setAlertMessage({ open: true, message: "Buyer added Sucessfully ", alertType: 'success' })
    
    
                                    let arr = [result.result,...list];
                                    myList(arr);
    
                                    showMsg(true)
                                    setErr({ texterr: null, showtexterr: false })
                                    buyerformClose();
    
                                } else {
    
                                    ///// useState for show result's err message///
                                    setErr({
                                        texterr: result.message,
                                        showtexterr: true,
    
                                    })
                                    setError({
    
                                        message: null,
                                        textField: null,
                                        showerror: false
    
                                    })
                                    showMail(true);
                                }
                            })
                            .catch(err => {
                                setloading(false)
                                setError({
    
                                    message: null,
                                    textField: null,
                                    showerror: false
    
                                })
                                buyerformClose();
                            })
                    


                    }



                } 
                else {

                    setloading(true)

                    const reqValues = {
                        method: "POST",
                        body: JSON.stringify({


                            name: addForm.name,
                            locations: locationForm,
                            priceRange: {
                                max: addForm.maxPrice,
                                min: addForm.minPrice
                            },
                            bedrooms: {
                                max: addForm.maxBed,
                                min: addForm.minBed
                            },
                            bathrooms: {
                                max: addForm.maxBath,
                                min: addForm.minBath
                            },
                            area: {
                                min: addForm.maxSQ,
                                max: addForm.minSQ
                            },

                            role: 'agent',
                            type:value.value


                        }),
                        headers: {
                            Authorization: localStorage.getItem('auth_token'),
                            "Content-Type": "application/json"
                        }
                    };
                    __DEV && console.log(reqValues.body);
                    fetch(process.env.REACT_APP_apiurl + "buyer/add", reqValues)
                        .then(result => result.json())
                        .then(result => {
                            __DEV && console.log(result);
                            setloading(false)



                            if (!result.error) {
                                __DEV && console.log(result.result);

                                setAlertMessage({ open: true, message: "Buyer added Sucessfully ", alertType: 'success' })


                                let arr = [...list];
                                arr.push(result.result);
                                myList(arr);

                                showMsg(true)
                                setErr({ texterr: null, showtexterr: false })
                                buyerformClose();

                            } else {

                                ///// useState for show result's err message///
                                setErr({
                                    texterr: result.message,
                                    showtexterr: true,

                                })
                                setError({

                                    message: null,
                                    textField: null,
                                    showerror: false

                                })
                                showMail(true);
                            }
                        })
                        .catch(err => {
                            setloading(false)
                            setError({

                                message: null,
                                textField: null,
                                showerror: false

                            })
                            buyerformClose();
                        })
                }


            } else {

                setErr({
                    texterr: "Please fill all the required field.",
                    showtexterr: true,

                })
                setError({

                    message: null,
                    textField: null,
                    showerror: false

                })


            }

            if (setloading !== true) {
                window.scrollTo(0, 0);
            }
        }

    };



    //////// API call function for edit reference //////
    const editBuyerbookks = () => {
        setloading(true)
        const reqValues = {
            method: "PUT",
            body: JSON.stringify({

                name: addForm ? addForm.name : tempeditData && tempeditData.name,
                locations: locationForm && locationForm.length > 0 ? locationForm : tempeditData && tempeditData.locations,
                priceRange: {
                    max: addForm ? addForm.maxPrice : tempeditData && tempeditData.priceRange.max,
                    min: addForm ? addForm.minPrice : tempeditData && tempeditData.priceRange.min
                },
                bedrooms: {
                    max: addForm ? addForm.maxBed : tempeditData && tempeditData.bedrooms.max,
                    min: addForm ? addForm.minBed : tempeditData && tempeditData.bedrooms.min
                },
                bathrooms: {
                    max: addForm ? addForm.maxBath : tempeditData && tempeditData.bathrooms.max,
                    min: addForm ? addForm.minBed : tempeditData && tempeditData.bathrooms.min

                },
                area: {
                    max: addForm ? addForm.maxSQ : tempeditData && tempeditData.area.max,
                    min: addForm ? addForm.maxSQ : tempeditData && tempeditData.area.min


                },

                role: 'agent',
                type:value.value

            }),

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "buyer/update?buyerId=" + tempeditData._id, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                setloading(false)
                if (!result.error) {
                    __DEV && console.log(result.result);
                    setAlertMessage({ open: true, message: "buyer Updated Sucessfully", alertType: 'success' })
                    if (myflag !== true) {
                        let buyerbooks = [...buyerList];


                        __DEV && console.log(buyerbooks);
                        buyerbooks.map((buyerbooksDATA, i) => {

                            __DEV && console.log(buyerbooksDATA);

                            if (buyerbooksDATA._id == result.result._id) {

                                buyerbooks[i] = result.result
                                __DEV && console.log(buyerbooks);
                                setData(buyerbooks);
                            }
                        })
                    } else {
                        let mybuyerbooks = [...list];


                        __DEV && console.log(mybuyerbooks);
                        mybuyerbooks.map((mybuyerbooksDATA, i) => {

                            __DEV && console.log(mybuyerbooksDATA);

                            if (mybuyerbooksDATA._id == result.result._id) {

                                mybuyerbooks[i] = result.result
                                __DEV && console.log(mybuyerbooks);
                                myList(mybuyerbooks);
                            }
                        })

                    }

                    setAddForm(false)

                    setErr({

                        texterr: null,
                        showtexterr: false

                    })
                    setError({

                        message: null,
                        textField: null,
                        showerror: false

                    })
                    buyerformClose();
                } else {
                    ///// useState for show result's err message///
                    setErr({

                        texterr: 'Something Went Wrong!!',
                        showtexterr: true

                    })
                    setError({

                        message: null,
                        textField: null,
                        showerror: false

                    })

                }
            })
            .catch(err => {
                setloading(false)
                ///// useState for show  err message///
                setErr({

                    texterr: "Network Error",
                    showtexterr: true

                })
                setError({

                    message: null,
                    textField: null,
                    showerror: false

                })

                buyerformClose();
                __DEV && console.log(err)
            });

    }



    useEffect(() => {
        __DEV && console.log(buyerList);

    }, [buyerList]);

    useEffect(()=>{


        if(tempeditData.type == "listing"){

            setValue({label:'Listing',value:'listing'})
            
        }else if(tempeditData.type == "buyer") {

            setValue({label:'Buyer',value:'buyer'})
        }
        


    },[tempeditData])

    const selectFunc = (x)=>{

        setValue(x);

    }



    return (
        <div className="marketingmodulestart bgcoloradjust">
            {/* <BreadcrumbSection breadcrumbtitle="Buyer Books" /> */}
            <Switch>
                <Route exact path={`${props.match.url}`}
                    render={() => (
                        //  component={BuyerBookListSection}
                        <BuyerBookListSection
                        listid={listid}
                        selectBuyerCalled={selectBuyer}
                        deleteCalled={openDelete}
                            editClicked={addbuyerCalled}
                            // addFormCalled={addbuyerCalled} 
                            buyerList={buyerList} totalBuyerCount={totalBuyerCount} />
                    )}>
                </Route>
                {/* {userDetail.role=='agent'&& */}
                <Route exact path={`${props.match.url}/mybuyer`}
                    render={() => (
                        <MyBuyerBookListSection
                        listid={listid}
                        selectBuyerCalled={selectBuyer}
                            editClicked={addbuyerCalled}
                            addbuyerCalled={addbuyerCalled}
                            agentBuyerList={list}
                            deleteCalled={openDelete}  totalBuyerCount={totalBuyerCount}/>
                    )}></Route>
                {/* } */}
            </Switch>
            {/* <BuyerBookListSection /> */}

            <Dialog className='addformdialogdiv'
                onClose={buyerformClose}
                aria-labelledby="simple-dialog-title" open={buyformOpen}>
                <div>
                    <div className="addformtitle">
                        {tempFlag == true ? <p>Update Buyer</p> : <p>Register New Buyer</p>}

                        <CloseIcon className="closeimg" onClick={buyerformClose} />
                    </div>

                    <AddBuyerForm
                        //////buyer name///////
                        //  onCloseData={addFormCalled}
                        // addbuyerCalled={addbuyerCalled}
                        tempname={tempeditData && tempeditData.priceRange && tempeditData.name}
                        onChange={handleChange}
                        onError={errorChange} error={error.textField && error.textField === "name" ? true : false}
                        errtextname={error['name']} clickLogin={createbuyerBook}

                        ////////price range//////

                        /*=== max price range */
                        tempmaxp={tempeditData && tempeditData.priceRange && tempeditData.priceRange.max}
                        onChangemaxPrice={handleChange}
                        onMaxprice={errorChange}
                        errMaxprice={error.textField && error.textField === "maxPrice" ? true : false}
                        errtextmax={error.showerror == true && error.textField && error.textField === "maxPrice" ? error.message : null} clickmaxPrice={createbuyerBook}

                        /*=== min price range */
                        tempminp={tempeditData && tempeditData.priceRange && tempeditData.priceRange.min}
                        onChangeminPrice={handleChange}
                        onMinprice={errorChange} errMinprice={error.textField && error.textField === "minPrice" ? true : false}
                        errtextmin={error.showerror == true && error.textField && error.textField === "minPrice" ? error.message : null} clickminPrice={createbuyerBook}

                        //////bathrooms//////

                        /*=== max bathrooms */
                        tempmaxbath={tempeditData && tempeditData.priceRange && tempeditData.bathrooms.max}
                        onChangemaxbath={handleChange}
                        onMaxbath={errorChange}
                        errMaxbath={error.textField && error.textField === "maxBath" ? true : false}
                        errtextmaxBath={error.showerror == true && error.textField && error.textField === "maxBath" ? error.message : null} clickmaxBath={createbuyerBook}

                        /*=== min bathrooms */
                        tempminbath={tempeditData && tempeditData.priceRange && tempeditData.bathrooms.min}
                        onChangeminBath={handleChange}
                        onMinbath={errorChange} errMinbath={error.textField && error.textField === "minBath" ? true : false}
                        errtextminBath={error.showerror == true && error.textField && error.textField === "minBath" ? error.message : null} clickminBath={createbuyerBook}


                        //////location//////
                        templocation={tempeditData && tempeditData.locations}
                        onlocationChange={locationChange}
                        // onMinbed={errorChange} errMinBed={error.textField && error.textField === "minBed" ? true : false}
                        // errtextminbed={error['minBed']} clickminBed={createbuyerBook}

                        //////bedrooms//////

                        /*=== max bed */
                        tempmaxbed={tempeditData && tempeditData.priceRange && tempeditData.bedrooms.max}
                        onChangemaxBed={handleChange}
                        onMaxbed={errorChange}
                        errMaxBed={error.textField && error.textField === "maxBed" ? true : false}
                        errtextmaxBed={error.showerror == true && error.textField && error.textField === "maxBed" ? error.message : null} clickmaxBed={createbuyerBook}

                        /*=== min bed */
                        tempminbed={tempeditData && tempeditData.priceRange && tempeditData.bedrooms.min}
                        onChangeminBed={handleChange}
                        onMinbed={errorChange} errMinBed={error.textField && error.textField === "minBed" ? true : false}
                        errtextminbed={error.showerror == true && error.textField && error.textField === "minBed" ? error.message : null} clickminBed={createbuyerBook}

                        //////sq/ft//////
                        /*=== max sq/ft */
                        tempmaxarea={tempeditData && tempeditData.priceRange && tempeditData.area.max}
                        onChangemaxSQ={handleChange}
                        onMaxSQ={errorChange}
                        errMaxSQ={error.textField && error.textField === "maxSQ" ? true : false}
                        errtextmaxSQ={error.showerror == true && error.textField && error.textField === "maxSQ" ? error.message : null} clickmaxSQ={createbuyerBook}

                        /*=== min sq/ft */
                        tempminarea={tempeditData && tempeditData.priceRange && tempeditData.area.min}
                        onChangeminSQ={handleChange}
                        onMinSQ={errorChange} errMinSQ={error.textField && error.textField === "minSQ" ? true : false}
                        errtextminSQ={error.showerror == true && error.textField && error.textField === "minSQ" ? error.message : null} clickminSQ={createbuyerBook}
                        typeChange={selectFunc}

                        typeValue={value}

                        handleButton={createbuyerBook}
                        onCloseData={buyerformClose}
                        loading={loading} />
                    

                    <NotifiedMessageComponent
                        messageOpen={alertMessage.open}
                        notifiactionText={alertMessage.message}
                        alertType={alertMessage.alertType}
                        messageClose={notificationClose} />


                </div>
            </Dialog>
            <AlertComponent loading={loading} alertOpen={openAlert} deleteButton={deleteBuyerbook}  alertClose={closeDelete}
                deleteAlert alertContent='Do you really want to delete?' />
        </div>
    );
}

export default BuyerBookModule;
