

import React, { useState, useEffect } from "react";
import "./form.css";
import TextFieldInput from "../../Common/FormFields/TextFieldInput";
import TextAreaFieldInput from "../../Common/FormFields/TextAreaFieldInput";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import PropTypes from 'prop-types';
import { __DEV } from "../../isDev";
import { useRadioGroup } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import VideocamIcon from '@material-ui/icons/Videocam';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import InputAdornment from '@material-ui/core/InputAdornment';
import ppt from '../../Images/ppt.png';
import pdf from '../../Images/pdf.png';
import doc from '../../Images/doc.png';
import xls from '../../Images/xls.png';
import txt from '../../Images/txt.png';
import CreatableSelectInput from "../../Common/FormFields/CreatableSelectInput";
import PhoneFieldInput from "../../Common/FormFields/PhoneFieldInput";
// import { SELECT_MENU } from "../AppConfig";

const UploaderForm = (props) => {
    __DEV && console.log(props.imageData);

    const categoryArr = useSelector(state => state.categoryList);
    __DEV && console.log(categoryArr);

    return (
        <div className="uploadFormCls"
        // style={{ padding: '0 25px' }}
        >
            {props.video &&
                <div className="onlyfortrainingupload">
                    <p>Upload Video</p>
                    <div className='fileviewsection'>

                        <div className='fileinputwrapper'>
                            <OndemandVideoIcon className="cameraicon" />
                            <p>{ props.videoName && props.videoName.name ? props.videoName.name : 'Click here to choose file'}
                                <input type="file" className="uploaderimgtype"
                                    accept={'mp4'}
                                    onChange={ props.videoChange}/>
                            </p>
                        </div>
                    </div>
                </div>
            }
            <div className={"uploaderformstart" + " " + props.extracls} >

                <div className='fileuploadsection'>
                    {props.video ?
                        <p className="fileuploadtitle">Upload Thumbnail Image</p> :
                        <p className="fileuploadtitle">Upload Image</p>}
                    <div className='fileviewsection'>
                        {
                            props.imageData && props.imageData.length > 0 ?
                                <img
                                    src={props.imageData[0].mimetype.includes('png') || props.imageData[0].mimetype.includes('jpeg')
                                        || props.imageData[0].mimetype.includes('svg+xml') ?
                                        process.env.REACT_APP_apiurl + 'getFile?key=' + props.imageData[0].key : props.imageData[0].mimetype.includes('application/msword') ? doc : props.imageData[0].mimetype.includes('pdf') ?
                                            pdf : props.imageData[0].mimetype.includes('text/plain') ? txt :
                                                props.imageData[0].mimetype.includes('application/vnd.ms-powerpoint') ? ppt :
                                                    props.imageData[0].mimetype.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? xls :
                                                        props.imageData[0].mimetype.includes('word') ||
                                                            props.imageData[0].mimetype.includes('doc') ? doc : null}
                                    // props.imageData[0].metadata.mimetype.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? xls : null}
                                    className='fileimagecss'

                                // src={props.imageData && props.imageData.length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + props.imageData[0].key : pdf}  
                                /> :
                                props.uploadFile && props.uploadFile.length > 0 ?
                                    <img
                                        src={props.uploadFile[0].mimetype.includes('png') || props.uploadFile[0].mimetype.includes('jpeg') ||
                                            props.uploadFile[0].mimetype.includes('svg+xml') ?
                                            process.env.REACT_APP_apiurl + 'getFile?key=' + props.uploadFile[0].key : props.uploadFile[0].mimetype.includes('application/msword') ? doc : props.uploadFile[0].mimetype.includes('pdf') ?
                                                pdf : props.uploadFile[0].mimetype.includes('text/plain') ? txt :
                                                    props.uploadFile[0].mimetype.includes('application/vnd.ms-powerpoint') ? ppt :
                                                        props.uploadFile[0].mimetype.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? xls :
                                                            props.uploadFile[0].mimetype.includes('word') ||
                                                                props.uploadFile[0].mimetype.includes('doc') ? doc : null} className='fileimagecss'
                                    />

                                    // src={props.uploadFile.length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + props.uploadFile[0].key : null} className='fileimagecss' />

                                    :
                                    <CameraAltIcon className="cameraicon" />
                        }
                        {/* {!props.uploadFile && */}

                        <div className='fileinputwrapper'>
                            {/* {props.uploadFile && props.uploadFile.flag!=="true" ? */}
                            <p>Click here to choose file
                    <input type="file" className="uploaderimgtype" onChange={props.imageChange} />
                            </p>
                            {/* : null} */}
                        </div>
                        {/* } */}

                    </div>

                    
                </div>
                <div className="formtextinputsection">
                    <TextFieldInput inputLabel='Title' textnewclass='titletextfield'
                        textinputname='title'
                        onChange={props.onChange}
                        onError={props.onError}
                        error={props.error}
                        inputProps={{ maxLength: '30' }}
                        errorText={props.errorText}
                        clickLogin={props.clickLogin}
                        defaultValue={props.titleValue}

                    //  onError={() => console.log('>>>')} onChange={() => console.log('>>>')}
                    />
                    {props.category &&
                        <CreatableSelectInput
                        extacls='selectcategoryinput'
                            selectOption={props.categoryArray}
                            inputLabel='Select Category'
                            onChange={props.selectfunc}
                            defaultInputValue={props.tempcategory}
                        // onInputChange={props.addCategory}
                        />
                    }
                    {props.pricingField &&
                        <TextFieldInput inputLabel='pricing' textnewclass='titletextfield'
                            textinputname='pricing'
                            typeNumber
                            onChange={props.priceOnChange}
                            defaultValue={props.pricing}
                            onError={props.onError}
                            error={props.error}
                            inputProps={{
                                maxLength: '30',
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            errorText={props.errorText}
                            clickLogin={props.clickLogin}
                            textnewclass='pricingtextfield'
                        //  onError={() => console.log('>>>')} onChange={() => console.log('>>>')}
                        />
                    }
                    {props.video &&
                     <PhoneFieldInput
                        textinputname='index'
                        inputLabel='Index'
                        onChange={props.indexhandle} onError={props.onerrorChange}
                        error={props.indexerr}
                        errorText={props.indextexterr} 
                        
                        // clickLogin={signUpClick} 
                        // value={signUpData.phoneNumber}
                         />
                    }
                    {props.video &&
                    <TextFieldInput
                        inputLabel='Vimeo Link'
                        textinputname='vimeoLink'
                        onChange={props.linkChange}
                        onError={props.linkOnError}
                        error={props.linkError}
                        errorText={props.linkErrorText}
                        disabled={props.videoName && props.videoName.name ? true:false}
                        // clickLogin={props.clickLogin}
                        // defaultValue={props.linkValue && props.linkValue}
                    
                    />}
                    <TextAreaFieldInput rowsnumber={4} inputLabel='Description'
                        textinputname='description'
                        onChange={props.taOnChange} onError={props.taOnError}
                        error={props.taError}
                        errorText={props.taErrorText}
                        clickLogin={props.clickLogin}
                        defaultValue={props.desValue}
                    //  onError={() => console.log('function called')} onChange={() => console.log('function called')}
                    />
                   
                </div>

            </div>
            <div className="faqButnArea">
            {props.errorMessage ? (

// {/* @description upload section error message */}

<FormHelperText id="component-error-text" className="errormsg">
    <ErrorOutlinedIcon className="erroricon" />
    {props.errmessage}
</FormHelperText>

// {/*@description upload section error message end */}

) : null}
                <ButtonComponent
                    buttonextraclass="faqCancelButn"
                    buttontext="Cancel"
                    handleButton={props.onClose}
                />
                <ButtonComponent buttontext='Submit' handleButton={props.handleButton}
                    inactive={props.inactive}
                    loading={props.loading} />
            </div>

        </div>
    );
};

UploaderForm.propTypes = {

    document: PropTypes.bool,

};
export default UploaderForm;