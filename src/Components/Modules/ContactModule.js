import React from 'react';
import ContactUsSection from '../Sections/ContactUsSection';
import BreadcrumbSection from '../../Common/UIComponents/BreadcrumbSection';


const ContactModule = (props) => {
    return (
        <div className="contactmodulestart bgcoloradjust">
            {/* <BreadcrumbSection 
            // breadcrumbtitle="Contact Us"
            breadcrumbtitle="Support" /> */}
            <ContactUsSection />
        </div>
    );

}

export default ContactModule;
