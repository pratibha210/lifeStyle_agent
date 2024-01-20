// import React from 'react';
import BreadcrumbSection from '../../Common/UIComponents/BreadcrumbSection';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import UploaderForm from '../Forms/UploaderForm';
import CloseIcon from '@material-ui/icons/Close';
import ReferenceList from '../Sections/ReferenceList';
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { __DEV } from "../../isDev";
import AlertComponent from '../../Common/UIComponents/AlertComponent';
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import FaqSkeleton from '../../Common/UIComponents/FaqSkeleton';
import { getAllCategory, addCategory } from "../../redux/action";

const ReferenceModule = (props) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState({});
    const [addrefData, setaddrefData] = useState({});
    const dispatch = useDispatch()
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [loading, setloading] = useState(false);
    // const [fileData, setFileData] = useState(null);
    const [imageData, setimageData] = useState(null);
    const userDetail = useSelector(state => state.userDetail)
    const [referenceData, setData] = useState([]);
    const [tempeditData, seteditData] = useState({});
    const [tempFlag, setFlag] = useState(false);

    __DEV && console.log(userDetail);
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [addForm, setAddForm] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false)
    const [deleteId, setdeleteId] = React.useState(null)
    const [categoryData, setCategory] = useState('');
    const [categoryArrData, setcategoryArr] = useState([]);
    const categoryArr = useSelector(state => state.referenceCatList);
    ///////delete function///////////
    const openDelete = (data) => {
        __DEV && console.log(data);
        setdeleteId(data)
        setOpenAlert(!openAlert)
    }

    const closeDelete = () => {

        setOpenAlert(false)
    }

    const notificationOpen = () => {
        setAlertMessage({ open: true, message: "Reference Deleted Sucessfully", alertType: 'success' })

    };
    //////// API call function for delete reference //////
    const deleteReference = () => {

        const reqValues = {
            method: "DELETE",

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "reference/delete?referenceId=" + deleteId._id, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                setloading(false)
                setOpenAlert(!openAlert)
                if (!result.error) {
                    __DEV && console.log(result.result);

                    /////// get all API call /////////
                    notificationOpen()
                    let arr = [...referenceData];
                    __DEV && console.log(arr);

                    let newArr = arr.filter(x => x._id !== result.result._id)
                    __DEV && console.log(newArr);
                    setData(newArr);
                    setAddForm(false)

                    setErr({

                        texterr: null,
                        showtexterr: false

                    })

                } else {
                    ///// useState for show result's err message///

                    setAlertMessage({ open: true, message: "Something went wrong !!", alertType: 'error' })

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



    const addFormClose = () => {

        setAddForm(false)

    }



    const addFormCalled = (data, flag) => {
        __DEV && console.log(data, flag);
        if (Object.keys(data).length > 0) {

            seteditData(data);
            setFlag(flag);
            setAddForm(!addForm)
        }
        else {
            seteditData({});
            setFlag(false);
            setAddForm(!addForm)
        }
    }



    /////// get all API call /////////

    useEffect(() => {
        getAllRef();

    }, [localStorage.getItem('auth_token')]);

    const getAllRef = () => {
        __DEV && console.log('<<API Call for get Reference list>>');

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'reference/getAll?page=1&resPerPage=12', reqValues)
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


    // useEffect(() =>
    // {
    //     __DEV && console.logconsole.log(referenceData);
    // }, [userDetail]);


    ////// for choose file /////

    const onimageChange = (e) => {
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

        fetch(process.env.REACT_APP_apiurl + "fileupload?entityId=" + userDetail._id, config)
            .then(result => result.json())
            .then(result => {
                __DEV && console.log(result);
                //  setloading({ load: true })
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
        dispatch(getAllCategory("reference"));

    }, [localStorage.getItem('auth_token')]);

    /////// API call for add category//////

    const createCatgory = (data) => {

        __DEV && console.log(categoryData, data);

        dispatch(addCategory(data, "reference"));


    };


    ////// map category in an array /////
    useEffect(() => {

        if (categoryArr.length > 0) {
            let arr = [...categoryArr];
            arr.map(x => {
                x.label = x.name;
                x.value = x.name
            })
            setcategoryArr(arr);
        }
    }, [!addForm]);



    ////////// onchange finction /////////
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


    useEffect(() => {

        __DEV && console.log(addrefData);
    }, [addrefData])


    ////// API call function for login //////
    const addReference = () => {

        __DEV && console.log(tempeditData);
        if (tempFlag == true) {
            editReference();
        }
        else {
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
                fetch(process.env.REACT_APP_apiurl + "reference/create", reqValues)
                    .then(result => result.json())
                    .then(result => {

                        __DEV && console.log(result);
                        setloading(false)
                        if (!result.error) {
                            __DEV && console.log(result.result);
                            setAlertMessage({ open: true, message: "Reference created Sucessfully..", alertType: 'success' })
                            setimageData(null)
                            let arr = [result.result, ...referenceData];
                            setData(arr);

                            setAddForm(false)
                            setFile(null)

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

            } else {

                ///// useState for show  err message///
                setErr({

                    texterr: "Please Fill All The Fields",
                    showtexterr: true

                })


            }
        }

    };


    //////// API call function for edit reference //////
    const editReference = () => {
        setloading(true)
        const reqValues = {
            method: "PUT",
            body: JSON.stringify({
                title: addrefData ? addrefData.title : tempeditData && tempeditData.title,
                category: categoryData ? categoryData : tempeditData && tempeditData.category ,
                description: addrefData ? addrefData.description : tempeditData && tempeditData.description,
                document: [{
                    key: imageData && imageData.length > 0 ? imageData[0].key : tempeditData && tempeditData.document[0].key,
                    name: imageData && imageData.length > 0 ? imageData[0].fileName : tempeditData && tempeditData.document[0].name,
                    mimetype: imageData && imageData.length > 0 ? imageData[0].metadata.mimetype : tempeditData && tempeditData.document[0].mimetype
                }]

            }),

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "reference/update?referenceId=" + tempeditData._id + "&documentId=" + tempeditData.document[0]._id, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                setloading(false)
                if (!result.error) {
                    __DEV && console.log(result.result);
                    setAlertMessage({ open: true, message: "Reference Updated Sucessfully", alertType: 'success' })

                    let reference = [...referenceData];


                    __DEV && console.log(reference);
                    reference.map((referenceDATA, i) => {

                        __DEV && console.log(referenceDATA);

                        if (referenceDATA._id == result.result._id) {

                            reference[i] = result.result
                            __DEV && console.log(reference);
                            setData(reference);
                        }
                    })

                    setAddForm(false)
                    setFile(null)
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


    return (
        <div className="marketingmodulestart bgcoloradjust">
            {/* <BreadcrumbSection breadcrumbtitle="Reference" /> */}

            {/* <FaqSkeleton/> */}
            <ReferenceList addFormCalled={addFormCalled} categoryArray={categoryArrData}
            referenceList={referenceData} deleteCalled={openDelete} />
            <Dialog className='addformdialogdiv'
                onClose={addFormCalled} aria-labelledby="simple-dialog-title" open={addForm}>
                <div>
                    <div className="addformtitle">
                        {tempFlag == true ? <p>Update References</p> : <p>Add References</p>}
                        <CloseIcon className="closeimg" onClick={addFormCalled} />
                    </div>
                    <UploaderForm onClose={addFormClose} onChange={handleChange} taOnChange={handleChange} onError={errorChange} taOnError={errorChange}
                        error={error.textField && error.textField === 'title' ? true : false} taError={error.textField && error.textField === 'description' ? true : false}
                        errorText={error['title']} taErrorText={error['description']} errorMessage={err.showtexterr} errmessage={err.texterr}
                        imageChange={(e) => onimageChange(e)} handleButton={addReference} file={file} loading={loading}
                        //   videoChange={}   
                        tempcategory={tempeditData.category}

                        categoryArray={categoryArrData}
                        selectfunc={selectcategory}
                        category
                        extracls='forcategoryfield'
                        document clickLogin={addReference} inactive={disableChange()} desValue={tempeditData.description}
                        tempData={tempeditData} titleValue={tempeditData.title} uploadFile={tempeditData.document} imageData={imageData} />
                </div>
            </Dialog>
            <AlertComponent alertOpen={openAlert} alertClose={closeDelete} loading={loading}
                deleteAlert alertContent='Do you really want to delete?' deleteButton={deleteReference} />
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                messageClose={notificationClose}
                notifiactionText={alertMessage.message}
                alertType={alertMessage.alertType} />
        </div>
    );
}

export default withRouter(ReferenceModule);
