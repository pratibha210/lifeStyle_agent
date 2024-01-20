

import React, { useState, useEffect } from "react";
import TextFieldInput from "../../Common/FormFields/TextFieldInput";
import EmailFieldInput from "../../Common/FormFields/EmailFieldInput";
import PhoneFieldInput from "../../Common/FormFields/PhoneFieldInput";
import TextAreaFieldInput from "../../Common/FormFields/TextAreaFieldInput";
import PasswordFieldInput from "../../Common/FormFields/PasswordFieldInput";
import Grid from '@material-ui/core/Grid';
import ZipcodeFieldInput from "../../Common/FormFields/ZipcodeFieldInput";
import "./form.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import { __DEV } from "../../isDev";
import pencil from '../../Images/pencil_edit.png';
import ErrorComponent from "../../Common/UIComponents/ErrorComponent";
import ImageCroppingDialog from "../../Common/UIComponents/ImageCroppingDialog";

///// 1 ///////////to reset fields ////////////
const initialState = {
    // error.textField = ""
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    confirmPassword: "",
    address: "",
    zipcode: ""
}

const SignUpForm = (props, state) => {
    const [impageCropOpen, setImpageCropOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [blobImage, setBlobImage] = useState(null);
    const [signUpData, setSignupData] = useState(initialState);
    const [error, setError] = useState({});
    const [loading, setloading] = useState({ load: false });
    const [err, setErr] = useState({ showtexterr: false, texterr: null });
    const [showJoinMessage, showMsg] = useState(false);
    const [emailMsg, showMail] = useState(false);
    const [imageData, setimageData] = useState({});

    ////// 2 //////// to reset filds ////////////  
    const clearState = () => {
        setSignupData({ ...initialState });
    };

    ////// 3///////////
    const handleSubmit = e => {
        e.preventDefault();
        // signUpClick().then(clearState());
        clearState()
    };
    ////////////////////////////////////////////////////




    const imageChange = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        __DEV && console.log(e.target.files[0]);
        // setImpageCropOpen(true)

        setimageData(e.target.files[0]);


    }

    const closeCrop = () => {
        setImpageCropOpen(false)
    }
    const giveBackImage = async (blob) => {
        __DEV && console.log(blob, '>>>>>>>L41')
        setBlobImage(blob)
        closeCrop()
    }



    //   giveBackcoverImage = async blob => {
    //     this.setState({ covercroppedimage: blob });

    //     let image = await fetch(blob, {
    //         headers: { 'Content-Type': 'application/octet-stream' },
    //         credentials: 'include'
    //     }).then(res => res.blob());

    //     var formData = new FormData();
    //     formData.append('file', image);
    //     const config = {
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //             authorization: localStorage.getItem('token')
    //         }
    //     };

    //     fetch(
    //         process.env.REACT_APP_apiurl +
    //       '/upload/imageUploadtobucket?fileType=others/coverpic',
    //         config
    //     )
    //         .then(response => response.json())
    //         .then(response => {
    //             //_DEV && console.log(response);
    //             if (!this.props.group) {
    //                 let x = { ...this.props.userDetails };
    //                 // x.coverImage = response.id;
    //                 // this.props.actions.addImage(x);
    //                 if (!response.error) {
    //                     x.coverImage = response.objres.key;
    //                     this.props.actions.userUpdate(x);
    //                     this.closecoverCrop();
    //                 }
    //             } else {
    //                 let x = { ...this.props.groupById };
    //                 // x.coverImage = response.id;
    //                 let id = x._id;
    //                 // _DEV && console.log(id, "L129>>>");
    //                 // this.props.actions.addGroupImage(x);
    //                 if (!response.error) {
    //                     x.coverImage = response.objres.key;
    //                     this.props.actions.editGroupData(id, x);
    //                     this.closecoverCrop();
    //                 }
    //             }
    //         })
    //         .catch(err => {
    //             _DEV && console.log(err);
    //         });
    // };



    ////////// onchange finction /////////

    const handleChange = (name, value) => {

        __DEV && console.log(name, value);
        setSignupData(prev => {
            return {
                ...prev,
                [name]: value
            }


        });
        __DEV && console.log(signUpData)

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



    useEffect(() => {

        __DEV && console.log(signUpData);
    }, [signUpData])




    //////// API call function for signup /////////

    const signUpClick = (e) => {

        __DEV && console.log(signUpData);

        if (Object.keys(signUpData).find(x => signUpData[x] !== null)) {


            if (signUpData.password == signUpData.confirmPassword) {

                ///////// API call from here for create user //////////
                setloading({
                    load: true,

                })

                const reqValues = {
                    method: "POST",
                    body: JSON.stringify({

                        name: signUpData.name,
                        password: signUpData.password,
                        email: signUpData.email,
                        phoneNumber: signUpData.phoneNumber,
                        // address: signUpData.address,
                        // zipCode: signUpData.zipcode

                    }),
                    headers: {

                        "Content-Type": "application/json"
                    }
                };
                __DEV && console.log(reqValues.body);
                fetch(process.env.REACT_APP_apiurl + "user/signup", reqValues)
                    .then(result => result.json())
                    .then(result => {
                        __DEV && console.log(result);
                        setloading({
                            load: false
                        })
                        if (!result.error) {
                            __DEV && console.log(result.result);
                            showMsg(true)
                            setErr({ texterr: null, showtexterr: false })

                            // error.textField.reset();
                            handleSubmit(e);

                            const formData = new FormData();
                            formData.append('file', imageData);

                            const config = {
                                method: "POST",
                                body: formData
                            };
                            fetch(process.env.REACT_APP_apiurl + "fileupload?entityId=" + result.result._id, config)
                                .then(result => result.json())
                                .then(result => {
                                    __DEV && console.log(result);
                                    //  setloading({ load: true })
                                    if (!result.error) {
                                        __DEV && console.log(result);
                                        // setAlertMessage({ open: true, message: "Image Uploaded Sucessfully... ", alertType: 'success' })

                                        // setimageData(result.result);

                                        setErr({

                                            texterr: "",
                                            showtexterr: false

                                        })

                                    } else {
                                        // setAlertMessage({ open: true, message: "Fail to upload image..", alertType: 'error' })
                                        ///// useState for show result's err message///
                                        let data = {
                                            message: "no data found!!"
                                        }
                                        // setErr({

                                        //     texterr: data.message,
                                        //     showtexterr: true,

                                        // })
                                    }
                                })
                                .catch(err => {
                                    __DEV && console.log(err);
                                })

                        } else {

                            ///// useState for show result's err message///
                            setErr({
                                texterr: result.message,
                                showtexterr: true,

                            })
                            showMail(true);
                        }
                    })
                    .catch(err => {
                        setloading({
                            load: false,

                        })


                    })
            } else {

                setErr({
                    texterr: "Password and Confirm Password Should be same.",
                    showtexterr: true,

                })


            }

        } else {

            setErr({
                texterr: "Please fill all the required field.",
                showtexterr: true,

            })


        }
        if (setloading !== true) {
            window.scrollTo(0, 0);
        }
    };

    const resendVerifyEmail = () => {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        };
        fetch(process.env.REACT_APP_apiurl + 'user/resendVerificationEmail?email=' + signUpData.email, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    showMail(false);
                    //   dispatch({type:'TRAINING_VIDEOS',data:result.result});
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });
    }






    return (
        <div className='signup-pagestart forSignupForm'>


            {/**
    * @description: Registration Successful msg start
	*/}
            {/*====== Show and hide email sent msg according to the signup api result */}
            {/* {showJoinMessage && */}
            <p className={(showJoinMessage === true ? 'open' : 'close') + ' ' + 'signupmsg'}>Thanks for joining with us, Kindly check your inbox to verify your email address...</p>
            {/* } */}
            {/**
    * @description: Registration Successful msg end
    */}


            <div className='signup-innersec'>
                <div className='signup-leftsidesec'>
                </div>
                <div className='signup-rightsidesec'>
                    <p className='signup-heading'>New User ?</p>
                    <p className='signup-subtext'>Use the form below to create your account</p>
                    <div className='formareastart'>


                        {/**
    * @description: Global error msg start
    */}
                        {err.showtexterr == true &&
                            <ErrorComponent errorText={err.texterr} />
                        }
                        {/**
    * @description: Global error msg end
  */}


                        <form>
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={12}>
                                    <div className='profiledpuploader'>
                                        <div className='profiledpview'>
                                            {file ?
                                                <img src={file} className='profileimgcss' /> :
                                                null
                                            }
                                        </div>
                                        <div className='inputfilehovereffect'>
                                            <div className='inputfilewrapper'>
                                                <span className="editTxtShow">Edit</span>
                                                <img src={pencil} className='editpencilcss' />
                                                <input type="file" className="uploaderimgtype" onChange={(e) => imageChange(e)} />
                                            </div>

                                        </div>
                                    </div>
                                    {/* {(impageCropOpen) ?
                                        <ImageCroppingDialog open={impageCropOpen}
                                            croptitle="Set Image"
                                            imageSrc={file}
                                            giveBackImage={giveBackImage}
                                            handleClose={closeCrop} cropSize={{ width: 220, height: 220 }}
                                            cropShape="rect" dialogclass="imagecropperappear" />
                                        :
                                        null
                                    } */}
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} className='signuptextfield'>
                                            <TextFieldInput textinputname='name' inputLabel='Name'
                                                onChange={handleChange}
                                                inputProps={{ maxLength: "40" }}
                                                onError={errorChange}
                                                error={error.textField && error.textField === "name" ? true : false}
                                                errorText={
                                                    error['name']
                                                } clickLogin={signUpClick} value={signUpData.name} />
                                        </Grid>
                                        <Grid item md={12} xs={12} className='signuptextfield'>
                                            <EmailFieldInput textinputname='email' inputLabel='Email'
                                                onChange={handleChange}
                                                resendLink={resendVerifyEmail}
                                                emailaRegisterdText={emailMsg}
                                                onError={errorChange}
                                                inputProps={{ maxLength: "40" }}
                                                error={error.textField && error.textField === "email" ? true : false}
                                                errorText={
                                                    error['email']
                                                } clickLogin={signUpClick} value={signUpData.email} />
                                        </Grid>

                                    </Grid>
                                </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                <Grid item md={4} xs={12} className='signuptextfield'>
                                    <PasswordFieldInput
                                        textinputname='password'
                                        inputLabel='Password'
                                        inputProps={{ maxLength: "14" }}
                                        onChange={handleChange}
                                        onError={errorChange}
                                        error={error.textField && error.textField === "password" ? true : false}
                                        errorText={
                                            error['password']
                                        } clickLogin={signUpClick} value={signUpData.password} />
                                </Grid>
                                <Grid item md={4} xs={12} className='signuptextfield'>
                                    <PasswordFieldInput
                                        textinputname='confirmPassword'
                                        inputLabel='Confirm Password'
                                        inputProps={{ maxLength: "14" }}
                                        onChange={handleChange}
                                        onError={errorChange}
                                        error={error.textField && error.textField === "confirmPassword" ? true : false}
                                        errorText={error['confirmPassword']
                                        } clickLogin={signUpClick} value={signUpData.confirmPassword} />
                                </Grid>
                                <Grid item md={4} xs={12} className='signup-bottomgrid'>
                                    <PhoneFieldInput
                                        textinputname='phoneNumber'
                                        inputLabel='Phone'
                                        onChange={handleChange} onError={errorChange}
                                        error={error.textField && error.textField === "phoneNumber" ? true : false}
                                        errorText={
                                            error['phoneNumber']
                                        } clickLogin={signUpClick} value={signUpData.phoneNumber} />
                                </Grid>
</Grid>
                                {/* <Grid item md={6} xs={12} className='signup-bottomgrid'>
                                    <TextAreaFieldInput textinputname='address'
                                        inputLabel='Address'
                                        rowsnumber='1'
                                        onChange={handleChange}
                                        onError={errorChange}
                                        inputProps={{ maxLength: "40" }}
                                        error={error.textField && error.textField === "address" ? true : false}
                                        errorText={
                                            error['address']
                                        } clickLogin={signUpClick} value={signUpData.address} />
                                </Grid> */}
                                {/* <Grid item md={3} xs={12} className='signup-bottomgrid'>
                                    <ZipcodeFieldInput textinputname='zipcode'
                                        inputLabel='Zip Code' onChange={handleChange} onError={errorChange}
                                        error={error.textField && error.textField === "zipcode" ? true : false}
                                        errorText={
                                            error['zipcode']
                                        } clickLogin={signUpClick} value={signUpData.zipcode} />
                                </Grid> */}

                            <Grid container spacing={2} className='signup-bottomgrid'>
                                <Grid item md={9} xs={12}>
                                    <p className='already-account'>Already have an account <NavLink to='/login'>Login</NavLink></p>
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <div className='signup-bottom'>
                                        <ButtonComponent inactive={disableChange()} buttontext='Sign Up' buttonextraclass='signup-button'
                                            handleButton={(e) => signUpClick(e)} loading={loading.load} />
                                    </div>
                                </Grid>
                            </Grid>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SignUpForm;