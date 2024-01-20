// AddQuestionForm
import React, { useState, useEffect } from 'react';
import "./form.css";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextAreaFieldInput from '../../Common/FormFields/TextAreaFieldInput';
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import PropTypes from 'prop-types';
import { __DEV } from "../../isDev";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';


const AddQuestionForm = (props) => {

    const [editData, setEditData] = useState({});
    const [editObject, seteditObject] = useState({});
    // const [faqData, setFAQrData] = useState({});
    // const [error, setError] = useState({});
    const [loading, setloading] = useState(false);
    const [err, setErr] = useState({ showtexterr: false, texterr: null });
    const [showJoinMessage, showMsg] = useState(false);
    const [emailMsg, showMail] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    




    return (
        <div className="addQuestionFormStart">
            <form className="addFAQform">
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12} >
                        <TextAreaFieldInput
                            inputLabel="Question"
                            textinputname='question'
                            rowsnumber="2"
                            onError={props.onError}
                            // inputProps={{ maxLength: "40" }}
                            error={props.error}
                            errorText={props.errtextquestion} 
                            clickLogin={props.clickLogin} onChange={props.onChange}
                            defaultValue={props.tempqestion} />
                    </Grid>
                    <Grid item md={12} xs={12} >
                        <TextAreaFieldInput
                            inputLabel="Answer"
                            rowsnumber="4"
                            textinputname='answer'
                            onError={props.onanswer}
                            // inputProps={{ maxLength: "40" }}
                            error={props.erranswer}
                            errorText={props.errtextanswer}
                            clickLogin={props.clickanswer} onChange={props.onChangeanswer}
                            defaultValue={props.tempanswer} />
                    </Grid>
                </Grid>
                <div className="faqButnArea">
                    <ButtonComponent
                        buttonextraclass="faqCancelButn"
                        buttontext="Cancel"
                        handleButton={props.onOpen}
                    />
                    <ButtonComponent inactive={props.disableChange} loading={props.loading} handleButton={props.handleButton} buttontext="Save" />
                    <NotifiedMessageComponent
                        messageOpen={alertMessage.open}
                        notifiactionText={alertMessage.message}
                        alertType={alertMessage.alertType} />
                </div>
            </form>
        </div>
    );

}

AddQuestionForm.propTypes = {
    onOpen: PropTypes.func,
    getData: PropTypes.string
};


export default AddQuestionForm;
