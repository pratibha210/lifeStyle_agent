
import React, { useState, useEffect } from "react";
import "./form.css";
import TextFieldInput from "../../Common/FormFields/TextFieldInput";
import EmailFieldInput from "../../Common/FormFields/EmailFieldInput";
import TextAreaFieldInput from "../../Common/FormFields/TextAreaFieldInput";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import SelectFieldInput from "../../Common/FormFields/SelectFieldInput";
import { DROPDOWN_MENU } from "../../Components/AppConfig";
import Grid from '@material-ui/core/Grid';
import PhoneFieldInput from "../../Common/FormFields/PhoneFieldInput";
import ChipFieldInput from "../../Common/FormFields/ChipFieldInput";
import { __DEV } from "../../isDev";

const AddBuyerForm = (props) => {

    const [buyerOption, setBuyerOption] = React.useState(DROPDOWN_MENU.buyer_dropdown)

    useEffect(() =>
    {
        __DEV && console.log(props.addbuyerCalled, '52L');
    }, [props.addbuyerCalled])

   

    
    return (
        <div style={{ padding: '15px 25px 0', position: 'relative' }} className='contactformstart xtraclsforform' >
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextFieldInput
                        defaultValue={props.tempname}
                            inputLabel='Buyer Name'
                            textnewclass="contactInputField"
                            extralabelcls='locationinoutbuy'
                            onChange={props.onChange}
                            textinputname='name'
                            onError={props.onError}
                            // defaultValue={props.name}
                            error={props.error}
                            errorText={props.errtextname}
                            clickLogin={props.clickLogin} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        {/* <TextFieldInput inputLabel='Location' textnewclass="contactInputField" onChange={() => console.log('>>>>>')} onError={() => console.log('>>>>>')} /> */}
                        <ChipFieldInput chiplabel='Location' extralabel='buychipfieldinputcls' textinputname='location'
                         chipinputlabelcls='locationinoutbuy' defaultValue={props.templocation}
                          onChange={props.onlocationChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <p className='labeltitle'>Price Range</p>
                        <div className='inputfiedgroup'>
                            <div className='buynowinput'>
                                <TextFieldInput
                                    placeholder='Max'
                                    textnewclass="contactInputField"
                                    onChange={props.onChangemaxPrice}
                                    onError={props.onMaxprice}
                                    textinputname='maxPrice'
                                    error={props.errMaxprice}
                                    errorText={props.errtextmax}
                                    defaultValue={props.tempmaxp}
                                    clickLogin={props.clickmaxPrice} 
                                    typeNumber/>
                            </div>
                            <div className='buynowinput'>
                                <TextFieldInput
                                    placeholder='Min'
                                    textinputname='minPrice'
                                    textnewclass="contactInputField"
                                    onChange={props.onChangeminPrice}
                                    onError={props.onMinprice}
                                    error={props.errMinprice}
                                    errorText={props.errtextmin}
                                    defaultValue={props.tempminp}
                                    clickLogin={props.clickminPrice}  
                                    typeNumber/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <p className='labeltitle'>Bedrooms</p>
                        <div className='inputfiedgroup'>
                            <div className='buynowinput'>
                                <TextFieldInput
                                    placeholder='Max'
                                    textnewclass="contactInputField"
                                    onChange={props.onChangemaxBed}
                                    onError={props.onMaxbed}
                                    textinputname='maxBed'
                                    error={props.errMaxBed}
                                    errorText={props.errtextmaxBed}
                                    defaultValue={props.tempmaxbed}
                                    clickLogin={props.clickmaxBed}
                                    typeNumber />
                            </div>
                            <div className='buynowinput'>
                                <TextFieldInput
                                    placeholder='Min'
                                    textnewclass="contactInputField"
                                    textinputname='minBed'
                                    onChange={props.onChangeminBed}
                                    onError={props.onMinbed}
                                    error={props.errMinBed}
                                    errorText={props.errtextminbed}
                                    defaultValue={props.tempminbed}
                                    clickLogin={props.clickminBed} 
                                    typeNumber/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <p className='labeltitle'>Bathrooms</p>
                        <div className='inputfiedgroup'>
                            <div className='buynowinput'>
                                <TextFieldInput
                                    placeholder='Max'
                                    textnewclass="contactInputField"
                                    onChange={props.onChangemaxbath}
                                    onError={props.onMaxbath}
                                    textinputname='maxBath'
                                    error={props.errMaxbath}
                                    errorText={props.errtextmaxBath}
                                    defaultValue={props.tempmaxbath}
                                    clickLogin={props.clickmaxBath} 
                                    typeNumber/>
                            </div>
                            <div className='buynowinput'>
                                <TextFieldInput
                                    placeholder='Min'
                                    textnewclass="contactInputField"
                                    textinputname='minBath'
                                    onChange={props.onChangeminBath}
                                    onError={props.onMinbath}
                                    error={props.errMinbath}
                                    errorText={props.errtextminBath}
                                    defaultValue={props.tempminbath}
                                    clickLogin={props.clickminBath}
                                    typeNumber/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <p className='labeltitle'>Sq/ft</p>
                        <div className='inputfiedgroup'>

                            <div className='buynowinput'>
                                <TextFieldInput
                                    placeholder='Max'
                                    textnewclass="contactInputField"
                                    textinputname='minSQ'
                                    onChange={props.onChangeminSQ}
                                    onError={props.onMinSQ}
                                    error={props.errMinSQ}
                                    errorText={props.errtextminSQ}
                                    defaultValue={props.tempminarea}
                                    clickLogin={props.clickminSQ}  
                                    typeNumber/>
                            </div>
                            <div className='buynowinput'>
                                <TextFieldInput
                                    placeholder='Min'
                                    textnewclass="contactInputField"
                                    onChange={props.onChangemaxSQ}
                                    onError={props.onMaxSQ}
                                    textinputname='maxSQ'
                                    error={props.errMaxSQ}
                                    errorText={props.errtextmaxSQ}
                                    defaultValue={props.tempmaxarea}
                                    clickLogin={props.clickmaxSQ} 
                                    typeNumber/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                    <p className='labeltitle'>Type</p>
                        <div className='inputfiedgroup'>
                        <div className='buynowinput buynowselect'>
                    <SelectFieldInput slelectOptions={buyerOption.options} onChange={props.typeChange} value = {props.typeValue} label="type"/>
                     </div>
                     </div>
                    </Grid>
                </Grid>
                <div className="addbuttonfooter">
                    <ButtonComponent
                        buttonextraclass="faqCancelButn"
                        buttontext="Cancel"
                        handleButton={props.onCloseData}
                    />
                    {/* {err.showtexterr&&<p>{err.texterr}</p>} */}
                    <ButtonComponent buttontext='Submit' loading={props.loading} handleButton={props.handleButton}
                        inactive={props.inactive}
                    />
                </div>

            </form>
        </div>
    );
};
export default AddBuyerForm;