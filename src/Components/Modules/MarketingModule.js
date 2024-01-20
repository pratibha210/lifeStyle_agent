import React, { useState, useEffect } from "react";
import BreadcrumbSection from '../../Common/UIComponents/BreadcrumbSection';
import MarketingList from '../Sections/MarketingList';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import UploaderForm from '../Forms/UploaderForm';
import AddManagerForm from '../Forms/AddManagerForm';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { __DEV } from "../../isDev";
import AlertComponent from "../../Common/UIComponents/AlertComponent";
import UnauthorizedSection from "../Sections/CommonSection/UnauthorizedSection";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import AddBuyerForm from "../Forms/AddBuyerForm";
import { getAllCategory, addCategory } from "../../redux/action";

const MarketingModule = (props) => {
    const dispatch = useDispatch()
    const [addForm, setAddForm] = React.useState(false);
    const [isTop, setIsTop] = useState(true);
    const [marketingData, setData] = useState(null);
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [loading, setloading] = useState(false);
    const [imageData, setimageData] = useState({});
    const userDetail = useSelector(state => state.userDetail);
    const [addrefData, setaddrefData] = useState({});
    const [file, setFile] = useState(null);
    const [error, setError] = useState({});
    const [marketingEdtData, seteditData] = useState({});
    const [flag, setFlagData] = useState('');
    const [openAlert, setOpenAlert] = React.useState(false)
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [categoryData, setCategory] = useState('');
    const [categoryArrData, setcategoryArr] = useState([]);
    const categoryArr = useSelector(state => state.marketCatList);

    console.log(categoryArr);
    const openDelete = (data) => {
        setOpenAlert(!openAlert);
        seteditData(data);
    }


    const closeDelete = () => {
        setOpenAlert(false);

    }


    const addFormClose = () => {

        setAddForm(false)

    }

    const addFormCalled = (data, flag) => {
        if (Object.keys(data).length > 0) {
            __DEV && console.log(data, flag);
            seteditData(data);
            setFlagData(flag)
            setAddForm(!addForm)
            setimageData(null);
        }
        else {
            seteditData({});
            setAddForm(!addForm)
            setimageData(null);
        }
    }

    {/*================== API call for get Marketing list ====================== */ }
    const getAllMarketingList = () => {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'marketing/getAll?page=1&resPerPage=12', reqValues)
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

    useState(() => {
        getAllMarketingList();

    }, [localStorage.getItem("auth_token")])


    ////// for choose file /////

    const imageChange = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        __DEV && console.log(e.target.files[0]);

        // setFileData(e.target.files[0]);

        uploadImage(e.target.files[0])
    }



    // ///// upload image function ////
    const uploadImage = (fileData) => {

        const formData = new FormData();
        formData.append('file', fileData);

        const config = {
            method: "POST",
            body: formData
        };

        setloading(true);

        fetch(process.env.REACT_APP_apiurl + "fileupload?entityId=" + userDetail._id, config)
            .then(result => result.json())
            .then(result => {
                __DEV && console.log(result);
                setloading(false);
                if (!result.error) {
                    __DEV && console.log(result);
                    setAlertMessage({ open: true, message: "File Uploaded Sucessfully ", alertType: 'success' })

                    setimageData(result.result);

                    setErr({

                        texterr: "",
                        showtexterr: false

                    })

                } else {

                    ///// useState for show result's err message///
                    let data = {
                        message: "no data found!!"
                    }
                    setErr({

                        texterr: data.message,
                        showtexterr: true,

                    })
                }
            })
            .catch(err => {
                __DEV && console.log(err);
                setloading(false);
            })

    }


    useEffect(() => {
        __DEV && console.log(imageData);
    }, [imageData]);

    /////// onChange function ////////
    const handleChange = (name, value) => {


        __DEV && console.log(name, value);
        setaddrefData(prev => {
            return {
                ...prev,
                [name]: value
            }

        });
        __DEV && console.log(addrefData)

    }

    /////// select category function ////////////

    const selectcategory = (data) => {
        __DEV && console.log(data);

        // setCategory(data.name);
        if (data !== null) {
            if (data !== null && data.__isNew__ == true) {


                setCategory(data.value);
                createCatgory(data.value);

            }
            else {

                setCategory(data.value);
                // createCatgory();

            }
        }

        else {
            setCategory('');
        }
    }

    useEffect(() => {
        __DEV && console.log(categoryData);

    }, [categoryData])


    //////// API call for get category //////

    useEffect(() => {
        dispatch(getAllCategory("marketing"));

    }, [localStorage.getItem('auth_token')]);


    useEffect(() => {
        __DEV && console.log(categoryArr);
    }, []);


    /////// API call for add category//////

    const createCatgory = (data) => {

        __DEV && console.log(categoryData, data);

        dispatch(addCategory(data, "marketing"));


    };


    ////// map category in an array /////
    useEffect(() => {

        if (categoryArr && categoryArr.length > 0) {
            let arr = [...categoryArr];
            arr.map(x => {
                x.label = x.name;
                x.value = x.name
            })
            setcategoryArr(arr);
        }
    }, [!addForm]);

    useEffect(() => {
        console.log(categoryArrData);
      }, [categoryArr]);


    ////////// onchange function /////////
    const errorChange = (name, value) => {

        setError(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    ////// for button disabled true/false/////
    const disableChange = () => {
        __DEV && console.log(error)
        if (Object.keys(error).find(x => error[x] !== null)) {
            return true;
        }

        return false;
    }





    {/*================== API call for create Marketing ====================== */ }
    const addMarketing = () => {

        if (flag === 'true') {
            editMarketing();
        } else {
            __DEV && console.log(flag);
            __DEV && console.log("data", addrefData);
            if (Object.keys(addrefData).find(x => addrefData[x] !== null) && imageData && imageData.length > 0) {

                setloading(true)
                ///////// API calling from here//////
                const reqValues = {
                    method: "POST",
                    body: JSON.stringify({
                        title: addrefData.title,
                        category: categoryData,
                        description: addrefData.description,
                        document: [{
                            key: imageData[0].key,
                            name: imageData[0].metadata.fileName,
                            mimetype: imageData[0].metadata.mimetype
                        }]

                    }),

                    headers: {
                        Authorization: localStorage.getItem('auth_token'),
                        "Content-Type": "application/json"
                    }

                };
                __DEV && console.log(reqValues.body);
                fetch(process.env.REACT_APP_apiurl + "marketing/create", reqValues)
                    .then(result => result.json())
                    .then(result => {

                        __DEV && console.log(result);
                        setloading(false)
                        if (!result.error) {
                            // getAllMarketingList();
                            __DEV && console.log(result.result);
                            setAlertMessage({ open: true, message: "Marketing Added Sucessfully", alertType: 'success' })

                            var obj = result.result
                            var arr = [obj, ...marketingData];
                            setData(arr);

                            setAddForm(false);
                            setFile(null);
                            setimageData(null)
                            setErr({

                                texterr: null,
                                showtexterr: false

                            })

                        } else {
                            ///// useState for show result's err message///
                            setErr({

                                texterr: 'Something Went Wrong!!',
                                showtexterr: true

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
                        __DEV && console.log(err)
                    });
            } else {

                ///// useState for show  err message///
                setErr({

                    texterr: "Please Fill All The Fields",
                    showtexterr: true

                })


            }
        }

    };
    {/*================== API call for edit Marketing ====================== */ }
    const editMarketing = () => {
        setloading(true)
        const reqValues = {
            method: "PUT",
            body: JSON.stringify({
                category: categoryData ? categoryData : marketingEdtData && marketingEdtData.category ,
                title: addrefData && addrefData ? addrefData.title : marketingEdtData && marketingEdtData.title,
                description: addrefData && addrefData ? addrefData.description : marketingEdtData && marketingEdtData.description,
                document: [{
                    key: imageData && imageData.length > 0 ? imageData[0].key : marketingEdtData && marketingEdtData.document[0].key,
                    name: imageData && imageData.length > 0 ? imageData[0].metadata.fileName : marketingEdtData && marketingEdtData.document[0].name,
                    mimetype: imageData && imageData.length > 0 ? imageData[0].metadata.mimetype : marketingEdtData && marketingEdtData.document[0].mimetype
                }]

            }),

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "marketing/update?marketingId=" + marketingEdtData._id, reqValues)
            .then(result => result.json())
            .then(result => {
                setloading(false)
                __DEV && console.log(result);
                setloading(false)
                if (!result.error) {
                    __DEV && console.log(result.result);
                    setAlertMessage({ open: true, message: "Marketing Updated Sucessfully", alertType: 'success' })
                    setAddForm(false);

                    let market = [...marketingData];


                    __DEV && console.log(market);
                    market.map((marketDATA, i) => {

                        __DEV && console.log(marketDATA);

                        if (marketDATA._id == result.result._id) {

                            market[i] = result.result
                            __DEV && console.log(market);
                            setData(market);
                        }
                    })

                    // getAllMarketingList();
                    setFile(null);
                    setErr({

                        texterr: null,
                        showtexterr: false

                    })

                } else {
                    ///// useState for show result's err message///
                    setErr({

                        texterr: 'Something Went Wrong!!',
                        showtexterr: true

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
                __DEV && console.log(err)
            });
    }
    {/*================== API call for delete Marketing ====================== */ }
    const deleteMarketing = () => {
        setloading(true)
        __DEV && console.log(marketingEdtData);
        const reqValues = {
            method: "DELETE",

            headers: {
                'Authorization': localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "marketing/delete?marketingId=" + marketingEdtData._id, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                setloading(false)
                setOpenAlert(!openAlert)
                if (!result.error) {
                    __DEV && console.log(result.result);
                    setAlertMessage({ open: true, message: "Marketing Deleted Sucessfully", alertType: 'success' })
                    // getAllMarketingList();


                    let arr = [...marketingData];
                    let newArr = arr.filter(x => x._id !== result.result._id)
                    setData(newArr);

                    setAddForm(false)
                    setErr({
                        texterr: null,
                        showtexterr: false
                    })

                } else {
                    ///// useState for show result's err message///
                    // setErr({

                    //     texterr: 'Something Went Wrong!!',
                    //     showtexterr: true

                    // })

                    setAlertMessage({ open: true, message: "Something went wrong... Please try again", alertType: 'error' })


                }
            })
            .catch(err => {
                setloading(false)
                ///// useState for show  err message///
                setErr({

                    texterr: "Network Error",
                    showtexterr: true

                })
                __DEV && console.log(err)
            });

    }

    const notificationClose = () => {
        setAlertMessage({ open: false })
    }

    // //// filter handle click function////
    // const handleDropDown =(e)=>{
    //     console.log(e);

       
    // }


    return (
        <div className="marketingmodulestart bgcoloradjust">
            {/* <BreadcrumbSection breadcrumbtitle="Marketing" /> */}
            {/* <UnauthorizedSection/> */}
            <MarketingList addFormCalled={addFormCalled} marketList={marketingData}
             categoryArray={categoryArrData} deleteCalled={openDelete} />
            <Dialog className='addformdialogdiv'
                onClose={addFormCalled} aria-labelledby="simple-dialog-title" open={addForm}>
                <div>
                    <div className="addformtitle">
                        {flag === 'true' ? <p>Update Marketing</p> : <p>Add Marketing</p>}

                        <CloseIcon className="closeimg" onClick={addFormCalled} />
                    </div>
                    {/* <AddBuyerForm/> */}
                    <UploaderForm onClose={addFormClose} onChange={handleChange} taOnChange={handleChange} onError={errorChange} taOnError={errorChange}
                        error={error.textField && error.textField === "title" ? true : false} taError={error.textField && error.textField === "description" ? true : false}
                        errorText={error['title']} taErrorText={error['description']} errorMessage={err.showtexterr} errmessage={err.texterr}
                        imageChange={(e) => imageChange(e)} handleButton={addMarketing} file={file} loading={loading}
                        clickLogin={addMarketing} inactive={disableChange()} desValue={marketingEdtData.description}
                        titleValue={marketingEdtData.title} uploadFile={marketingEdtData.document} imageData={imageData}
                        category extracls='forcategoryfield' selectfunc={selectcategory}
                        tempcategory={marketingEdtData.category}
                        categoryArray={categoryArrData}
                    />
                </div>
            </Dialog>
            <AlertComponent alertOpen={openAlert} alertClose={closeDelete} loading={loading}
                deleteAlert alertContent='Do you really want to delete?' deleteButton={deleteMarketing} />
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                messageClose={notificationClose}
                alertType={alertMessage.alertType} />
        </div>
    );

}

export default MarketingModule;
