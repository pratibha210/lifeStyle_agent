

import React, { useState, useEffect } from "react";
import "./form.css";
import TextFieldInput from "../../Common/FormFields/TextFieldInput";
import EmailFieldInput from "../../Common/FormFields/EmailFieldInput";
import TextAreaFieldInput from "../../Common/FormFields/TextAreaFieldInput";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
const ContactForm = (props) => {
    return (
        <div className='contactformstart' >
            <form>
                <TextFieldInput placeholder="Name" textnewclass="contactInputField" onChange={() => console.log('>>>>>')} onError={() => console.log('>>>>>')} />
                <EmailFieldInput placeholder="Email" textnewclass="contactInputField" onChange={() => console.log('>>>>>')} onError={() => console.log('>>>>>')} />
                <TextAreaFieldInput placeholder="Tell me about your dream home!"
                    rowsnumber="4" textnewclass="contactInputField" onChange={() => console.log('>>>>>')} onError={() => console.log('>>>>>')} />
                <ButtonComponent buttontext="Send" />
            </form>
        </div>
    );
};
export default ContactForm;