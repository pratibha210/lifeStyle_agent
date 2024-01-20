import React, { useState, useEffect } from "react";
import BreadcrumbSection from '../../Common/UIComponents/BreadcrumbSection';
import UploaderForm from '../Forms/UploaderForm';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import CompanyStoreSection from '../Sections/CompanyStoreSection';
import AlertComponent from '../../Common/UIComponents/AlertComponent';
import { useDispatch, useSelector } from 'react-redux';
import { __DEV } from "../../isDev";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';


const CompanyStoreModule = (props) =>
{
    const [addForm, setAddForm] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)


    const [isTop, setIsTop] = useState(true);
    const [storeData, setStoraeData] = useState(null);
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [loading, setloading] = useState(false);
    const [imageData, setimageData] = useState({});
    const userDetail = useSelector(state => state.userDetail);
    const [addrefData, setaddrefData] = useState({});
    const [file, setFile] = useState(null);
    const [error, setError] = useState({});
    const [storeEditData, setEditData] = useState({});
    const [flag, setFlagData] = useState('');
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });


    const addFormCalled = (data, flag) =>
    {

        setEditData(data);
        setFlagData(flag);
        setAddForm(!addForm);
        
    }
const addFormClose =()=>{
    
    setAddForm(false);
    setimageData(null);
}


    const openDelete = (data) =>
    {
        setEditData(data);
        setOpenAlert(!openAlert)
    }
    const closeDelete = () =>
    {
        setimageData(null);
        setOpenAlert(false)
    }

    const notificationClose = () =>
    {
        setAlertMessage({ open: false })
    }



    const onimageChange = (e) =>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        __DEV && console.log(e.target.files[0]);

        // setFileData(e.target.files[0]);

        uploadImage(e.target.files[0])
    }

    useEffect(() =>
    {
        getAllStoreList();
    }, [])

    // ///// upload image function ////
    const uploadImage = (fileData) =>
    {

        const formData = new FormData();
        formData.append('file', fileData);

        const config = {
            method: "POST",
            body: formData
        };

        fetch(process.env.REACT_APP_apiurl + "fileupload?entityId=" + userDetail._id, config)
            .then(result => result.json())
            .then(result =>
            {
                __DEV && console.log(result);
                //  setloading({ load: true })
                if (!result.error) {
                    __DEV && console.log(result);
                    setAlertMessage({ open: true, message: 'Image uploaded sucessfully...', alertType: 'success' })
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
            .catch(err =>
            {
                __DEV && console.log(err);
            })

    }



    /////// onChange function ////////
    const handleChange = (name, value) =>
    {


        __DEV && console.log(name, value);
        setaddrefData(prev =>
        {
            return {
                ...prev,
                [name]: value
            }

        });
        __DEV && console.log(addrefData)

    }


    ////////// onchange function /////////
    const errorChange = (name, value) =>
    {

        setError(prev =>
        {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    ////// for button disabled true/false/////
    const disableChange = () =>
    {
        __DEV && console.log(error)
        if (Object.keys(error).find(x => error[x] !== null)) {
            return true;
        }

        return false;
    }

    {/*================== API call for create Store ====================== */ }
    const addStoteItem = () =>
    {
        __DEV && console.log(addrefData);
        if (flag === 'true') {
            editStore();
        } else {
            __DEV && console.log(flag);
            __DEV && console.log("data", addrefData);
            if (Object.keys(addrefData).find(x => addrefData[x] !== null)) {

                setloading(true)
                ///////// API calling from here//////
                const reqValues = {
                    method: "POST",
                    body: JSON.stringify({
                        productName: addrefData.title,
                        description: addrefData.description,
                        pricing: addrefData.pricing,
                        productImages: [{
                            key: imageData && imageData.length>0 &&  imageData[0].key,
                            name:  imageData && imageData.length>0 && imageData[0].metadata.fileName,
                            mimetype: imageData && imageData.length>0 && imageData[0].metadata.mimetype
                        }]

                    }),

                    headers: {
                        Authorization: localStorage.getItem('auth_token'),
                        "Content-Type": "application/json"
                    }

                };
                __DEV && console.log(reqValues.body);
                fetch(process.env.REACT_APP_apiurl + 'store/addItem', reqValues)
                    .then(result => result.json())
                    .then(result =>
                    {

                        __DEV && console.log(result);
                        setloading(false)
                        if (!result.error) {
                            // getAllStoreList();
                            __DEV && console.log(result);

                            var arr = [...storeData];
                            var obj = result.result
                            __DEV && console.log(obj);
                            arr.push(obj);
                            __DEV && console.log(arr);
                            setStoraeData(arr);

                            setAlertMessage({ open: true, message: 'Product added sucessfully...', alertType: 'success' });
                            setAddForm(false);
                            setFile(null);
                            setaddrefData({});

                            setimageData(null);

                            setErr({

                                texterr: null,
                                showtexterr: false

                            })

                        } else {
                            ///// useState for show result's err message///
                            setAlertMessage({ open: true, message: 'Something went wrong.. Please try again', alertType: 'error' });
                            // setErr({

                            //     texterr: 'Something Went Wrong!!',
                            //     showtexterr: true

                            // })

                        }
                    })
                    .catch(err =>
                    {
                        setloading(false)
                        ///// useState for show  err message///
                        setAlertMessage({ open: true, message: 'Something went wrong.. Please try again', alertType: 'error' });

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
    {/*================== API call for get all Store content ====================== */ }
    const getAllStoreList = () =>
    {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'store/getAll?page=1&resPerPage=12', reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result.result);
                if (!result.error) {
                    setStoraeData(result.result)
                }
                else {
                    setAlertMessage({ open: true, message: 'Something went wrong.. Please try again', alertType: 'error' });



                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });

    }

    {/*================== API call for edit store content ====================== */ }
    const editStore = () =>
    {
        const reqValues = {
            method: "PUT",
            body: JSON.stringify({
                productName: addrefData ? addrefData.title : storeEditData && storeEditData.title,
                description: addrefData ? addrefData.description : storeEditData && storeEditData.description,
                pricing: addrefData ? addrefData.pricing : storeEditData && storeEditData.pricing,
                // productImages: [
                //     {
                //         key: imageData[0].key,
                //         name: imageData[0].metadata.fileName,
                //         mimetype: imageData[0].metadata.mimetype
                //     }
                //   ]
            }),

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "store/updateItem?productId=" + storeEditData._id, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);
                setloading(false)
                if (!result.error) {
                    __DEV && console.log(result.result);
                    setAlertMessage({ open: true, message: "Content Edited Sucessfully...", alertType: 'success' });
                    setAddForm(false);

                    let arr = [...storeData];
                    let newArr = arr.filter(x => x._id !== result.result._id)
                    var obj = result.result
                    newArr.push(obj);
                    setStoraeData(newArr);
                    setaddrefData({});
                    setimageData(null);
                    // getAllStoreList();
                    setErr({

                        texterr: null,
                        showtexterr: false

                    })

                } else {
                    ///// useState for show result's err message///
                    setAlertMessage({ open: true, message: "Something went wrong... Please try again.", alertType: 'error' });
                    setErr({

                        texterr: 'Something Went Wrong!!',
                        showtexterr: true

                    })

                }
            })
            .catch(err =>
            {
                setloading(false)
                ///// useState for show  err message///
                setErr({

                    texterr: "Network Error",
                    showtexterr: true

                })
                __DEV && console.log(err)
            });
    }

    {/*================== API call for delete Store ====================== */ }
    const deleteStore = () =>
    {
        __DEV && console.log(storeEditData);
        const reqValues = {
            method: "DELETE",

            headers: {
                'Authorization': localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "store/removeItem?productId=" + storeEditData._id, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);
                setloading(false)
                setOpenAlert(!openAlert)
                if (!result.error) {
                    __DEV && console.log(result.result);
                    setAlertMessage({ open: true, message: "Content Deleted Sucessfully...", alertType: 'success' })
                    // getAllStoreList();

                    let arr = [...storeData];
                    let newArr = arr.filter(x => x._id !== result.result._id)
                    setStoraeData(newArr);


                    setAddForm(false)
                    setErr({
                        texterr: null,
                        showtexterr: false
                    })

                } else {
                    setAlertMessage({ open: true, message: 'Something went wrong.. Please try again', alertType: 'error' });

                    // setErr({

                    //     texterr: 'Something Went Wrong!!',
                    //     showtexterr: true

                    // })

                }
            })
            .catch(err =>
            {
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
        <div className="trainingModule bgcoloradjust">
            {/* <BreadcrumbSection breadcrumbtitle="Company Store" /> */}
            <CompanyStoreSection addFormCalled={addFormCalled} addOpen={addForm} deleteCalled={openDelete} storeData={storeData} />
            <Dialog className='addformdialogdiv'
                onClose={addFormCalled} aria-labelledby="simple-dialog-title" open={addForm}>
                <div>
                    <div className="addformtitle">
                   {flag == 'true'? <p>Update Product</p>:<p>Add Product</p>}
                        <CloseIcon className="closeimg" onClick={addFormClose} />
                    </div>
                    {/* <UploaderForm extracls='forcompanystorecls' pricingField/> */}
                    <UploaderForm
                        extracls='forcompanystorecls' pricingField
                        onChange={handleChange}
                        taOnChange={handleChange}
                        priceOnChange={handleChange}
                        onError={errorChange}
                        taOnError={errorChange}
                        error={error.textField && error.textField === "title" ? true : false}
                        taError={error.textField && error.textField === "description" ? true : false}
                        errorText={error['title']} taErrorText={error['description']}
                        errorMessage={err.showtexterr}
                        errmessage={err.texterr}
                        imageChange={(e) => onimageChange(e)}
                        handleButton={addStoteItem}
                        file={file}
                        loading={loading}
                        clickLogin={addStoteItem}
                        inactive={disableChange()}
                        desValue={storeEditData.description}
                        titleValue={storeEditData.productName}
                        pricing={storeEditData.pricing}
                        uploadFile={storeEditData.productImages}
                        imageData={imageData}onClose={addFormClose} />
                </div>
            </Dialog>
            <AlertComponent alertOpen={openAlert} alertClose={closeDelete}
                deleteAlert alertContent='Do you really want to delete?' deleteButton={deleteStore} />
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                messageClose={notificationClose}
                alertType={alertMessage.alertType} />
        </div>
    );

}

export default CompanyStoreModule;
