import React, { Component, useEffect, useState } from "react";
import FaqListSection from '../Sections/FaqListSection';
import BreadcrumbSection from '../../Common/UIComponents/BreadcrumbSection';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import TextAreaFieldInput from '../../Common/FormFields/TextAreaFieldInput';
import Grid from '@material-ui/core/Grid';
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import AddQuestionForm from '../Forms/AddQuestionForm';
import { __DEV } from "../../isDev";
import AlertComponent from "../../Common/UIComponents/AlertComponent";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
// import { setFlagsFromString } from "v8";



const FaqModule = (props) =>
{
    const [addForm, setAddForm] = React.useState(false);
    // const [userData, setData] = useState([]);
    const [faq, setfaq] = useState(null);
    const [loading, setloading] = useState(false);
    // const [pageNumber, setPagenumber] = useState(1)
    const [openAlert, setOpenAlert] = React.useState(false)
    const [tempData, settempData] = React.useState({})
    const [faqData, setfaqData] = React.useState({})
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [pages, setPageNumber] = useState(1)
    const [tempflag, setflag] = useState('false')

    const [addData, setData] = useState({});
    const [error, setError] = useState({});

    ///////delete data recevied function///////////
    const openDelete = (data) =>
    {
        __DEV && console.log(data);
        setOpenAlert(!openAlert)
        settempData(data);
    }


    const closeDelete = () =>
    {
        setOpenAlert(false)
    }


    const addFormCalled = (faqobject,flag) =>
    {
        __DEV && console.log(faqobject);
        setfaqData(faqobject);
        setAddForm(!addForm)
        setflag(flag);
    }
    const addFormClosed = () =>
    {
        setAddForm(false)
    }

    useEffect(() =>
    {
        getAllFaq();

    }, [localStorage.getItem('auth_token')])

    const getPageNumberFromChild = (page) =>
    {
        __DEV && console.log(page, 'L159');
        // setPageNumber(data);

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'faq/get?resPerPage=12&page=' + page, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);
                if (!result.error) {
                    setfaq(result.result)
                }
                else {

                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });
    }


    const getAllFaq = () =>
    {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'faq/get?resPerPage=12&page=1', reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);
                if (!result.error) {
                    setfaq(result.result)
                    
                }
                else {

                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });
    }



    //////// API call function for delete FAQ //////
    const deleteFAQ = () =>
    {
        setloading(true)
        const reqValues = {
            method: "DELETE",

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "faq/delete?faqId=" + tempData._id, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);
                setloading(false)
                setOpenAlert(!openAlert)
                if (!result.error) {
                    __DEV && console.log(result.result);
                    setAlertMessage({ open: true, message: "FAQ has been Deleted Sucessfully ", alertType: 'success' })
                    /////// get all API call /////////
                    // notificationOpen()
                    let arr = [...faq];
                    __DEV && console.log(arr);

                    let newArr = arr.filter(x => x._id !== tempData._id)
                    __DEV && console.log(newArr);
                    setfaq(newArr);
                   
                   
                    setErr({

                        texterr: null,
                        showtexterr: false

                    })

                } else {
                    ///// useState for show result's err message///
                   
                    setAlertMessage({ open: true, message: "Something went wrong !!", alertType: 'error' })

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



    useEffect(()=>{
        __DEV && console.log(props.userDetail)
    },[localStorage.getItem('auth_token')])
   

    const handleChange = (name, value) => {


        __DEV && console.log(name, value);
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }


        });
        __DEV && console.log(addData);

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

     ////// for button disabled true/false/////
     const disableChange = () => {
        __DEV && console.log(error)
        if (Object.keys(error).find(x => error[x] !== null)) {

            return true;

        }

        return false;
    }

    const addFAQ = () => {


        if (tempflag==='true') {
            editFAQ();

        }

        else {
            __DEV && console.log(addData);

            if (Object.keys(addData).find(x => addData[x] !== null)) {

                ///////// API call from here for create user //////////
                setloading(true)

                const reqValues = {
                    method: "POST",
                    body: JSON.stringify({

                        question: addData.question,
                        answer: addData.answer

                    }),
                    headers: {
                        Authorization: localStorage.getItem('auth_token'),
                        "Content-Type": "application/json"
                    }
                };
                __DEV && console.log(reqValues.body);
                fetch(process.env.REACT_APP_apiurl + "faq/add", reqValues)
                    .then(result => result.json())
                    .then(result => {
                        __DEV && console.log(result);
                        setloading(false)

                        addFormClosed();

                        if (!result.error) {
                            __DEV && console.log(result.result);
                            setAlertMessage({ open: true, message: "FAQ has been Added Sucessfully ", alertType: 'success' })


                            let arr = [...faq];
                            arr.push(result.result);
                            setfaq(arr);
                           

                            // showMsg(true)
                            setErr({ texterr: null, showtexterr: false })


                        } else {

                            ///// useState for show result's err message///
                            setErr({
                                texterr: result.message,
                                showtexterr: true,

                            })

                        }
                    })
                    .catch(err => {
                        addFormClosed();
                        setloading(false)
                    })

            } else {

                setErr({
                    texterr: "Please fill all the required field.",
                    showtexterr: true,

                })


            }

            if (setloading !== true) {
                window.scrollTo(0, 0);
            }
        }

    };


     {/*================== API call for edit Marketing ====================== */ }
     const editFAQ = () => {
        setloading(true)
        const reqValues = {
            method: "PUT",
            body: JSON.stringify({
                question: addData.question ? addData.question : faqData.question,
                answer: addData.answer ? addData.answer : faqData.answer

            }),

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "faq/update?faqId=" +faqData._id, reqValues)
            .then(result => result.json())
            .then(result => {
                setloading(false)
                __DEV && console.log(result);
                
                addFormClosed();
                if (!result.error) {
                    __DEV && console.log(result.result);
                    setAlertMessage({ open: true, message: "FAQ Updated Sucessfully", alertType: 'success' });

                    let arr = [...faq];


                    __DEV && console.log(arr);
                    arr.map((arrDATA, i) =>
                    {

                        __DEV && console.log(arrDATA);

                        if (arrDATA._id == result.result._id) {

                            arr[i] = result.result
                            __DEV && console.log(arr);
                            setfaq(arr);
                        }
                    })

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
                // props.onClose();
                addFormClosed();
                ///// useState for show  err message///
                setErr({

                    texterr: "Network Error",
                    showtexterr: true

                })
                __DEV && console.log(err)
            });
    }

    const notificationClose = () =>
    {
        setAlertMessage({ open: false })
    }



    return (
        <div className="faqmodulestart bgcoloradjust">
            {/* <BreadcrumbSection breadcrumbtitle="FAQ" /> */}
            <FaqListSection faqlist={faq} addFormCalled={addFormCalled} deleteCalled={openDelete} getPage={getPageNumberFromChild} />
            <div>
                <Dialog className='addformdialogdiv'
                    onClose={addFormCalled} aria-labelledby="simple-dialog-title" open={addForm}>
                    <div>
                        <div className="addformtitle">
                            <p>Add Questions</p>
                            <CloseIcon className="closeimg" onClick={addFormCalled} />
                        </div>
                        <AddQuestionForm 
                        // editData={faqData} 
                        // tempflag={tempflag} 
                        // getData={faq}
                        //  onClose={addFormClosed} 
                        onOpen={addFormCalled} 
                        
                        tempqestion={faqData && faqData.question && faqData.question}
                        onChange={handleChange}
                        onError={errorChange} error={error.textField && error.textField === "question" ? true : false}
                        errtextquestion={error['question']} clickLogin={addFAQ}

                        ////////price range//////

                        /*=== max price range */
                        tempanswer={faqData && faqData.answer && faqData.answer}
                        onChangeanswer={handleChange}
                        onanswer={errorChange} erranswer={error.textField && error.textField === "answer" ? true : false}
                        errtextanswer={error['answer']} clickanswer={addFAQ}

                        handleButton={addFAQ} loading={loading}
                        disableChange={disableChange()}
                        
                        />

                        {/* <form className="addFAQform">
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12} >
                                    <TextAreaFieldInput
                                        inputLabel="Question"
                                        rowsnumber="2"
                                        onChange={() => console.log('fvxdhnj')}
                                        onError={() => console.log('fvxdhnj')} />
                                </Grid>
                                <Grid item md={12} xs={12} >
                                    <TextAreaFieldInput
                                        inputLabel="Answer"
                                        rowsnumber="4"
                                        onChange={() => console.log('fvxdhnj')}
                                        onError={() => console.log('fvxdhnj')} />
                                </Grid>
                            </Grid>
                            <div className="faqButnArea">
                                <ButtonComponent 
                                 buttonextraclass="faqCancelButn"
                                 buttontext="Cancel"
                                 handleButton={addFormCalled}
                                 />
                                <ButtonComponent buttontext="Save" />
                            </div>
                        </form> */}

                    </div>
                </Dialog>
            </div>
            <AlertComponent alertOpen={openAlert} alertClose={closeDelete} loading={loading}
                deleteAlert alertContent='Do you really want to delete?' deleteButton={deleteFAQ} />
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                messageClose={notificationClose}
                alertType={alertMessage.alertType} />
        </div>
    );

}

export default FaqModule;
