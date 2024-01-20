// FilterForm
import React, { useState, useEffect } from "react";
import ChipFieldInput from "../../Common/FormFields/ChipFieldInput";
import Grid from '@material-ui/core/Grid';
import PhoneFieldInput from "../../Common/FormFields/PhoneFieldInput";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextFieldInput from "../../Common/FormFields/TextFieldInput";
const FilterForm = (props) => {

    const [filterForm, setFilterForm] = useState({});


    const onChange= (name,value)=>{
        // console.log(name,value)
        let form = {...filterForm}
        form[name]=value;
        setFilterForm(form)
    }

    return (
        <div className="filterFormstart">
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <ChipFieldInput chiplabel='Location' extralabel='buychipfieldinputcls' chipinputlabelcls='locationinoutbuy' onChange={(e)=>onChange('location',e)} />
                    </Grid>
                     {/* <Grid item xs={12} sm={12} md={6}>
                     <TextFieldInput
                     inputLabel='Add Listing'
                            textinputname='addlisting'
                            textnewclass='pricingtextfield'
                        />                    </Grid> */}
                    <Grid item xs={12} sm={6} md={6}>
                        <p className='labeltitle'>Price Range</p>
                        <div className='inputfiedgroup'>
                        <div className='buynowinput formarginright'>
                        <TextFieldInput
                            typeNumber
                            textinputname='minPrice'
                            onChange={(e,val)=>onChange('minPriceRange',val)} onError={() => console.log('>>>>>')}
                            inputProps={{
                                startAdornment: <InputAdornment position="start">Min</InputAdornment>,
                            }}
                            textnewclass='pricingtextfield'
                        />
                                {/* <PhoneFieldInput 
                                 startAdornment={<InputAdornment position="start">Min</InputAdornment>}
                                placeholder='Min' textnewclass="contactInputField" /> */}
                            </div>
                            <div className='buynowinput'>
                            <TextFieldInput
                             textinputname='maxPrice'
                            typeNumber
                            onChange={(e,val)=>onChange('maxPriceRange',val)} onError={() => console.log('>>>>>')}
                            inputProps={{
                                startAdornment: <InputAdornment position="start">Max</InputAdornment>,
                            }}
                            textnewclass='pricingtextfield'
                        />
                                {/* <PhoneFieldInput placeholder='Max' 
                                  startAdornment={<InputAdornment position="start">Max</InputAdornment>} 
                                textnewclass="contactInputField" onChange={(e,val)=>onChange('maxPriceRange',val)} onError={() => console.log('>>>>>')} /> */}
                            </div>

                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <p className='labeltitle'>Bedrooms</p>
                        <div className='inputfiedgroup'>
                        <div className='buynowinput formarginright'>
                        <TextFieldInput
                         textinputname='minBed'
                            typeNumber
                            onChange={(e,val)=>onChange('minBedrooms',val)} onError={() => console.log('>>>>>')}
                            inputProps={{
                                startAdornment: <InputAdornment position="start">Min</InputAdornment>,
                            }}
                            textnewclass='pricingtextfield'
                        />
                                {/* <PhoneFieldInput 
                                 startAdornment={<InputAdornment position="start">Min</InputAdornment>}placeholder='Min' textnewclass="contactInputField" onChange={(e,val)=>onChange('minBedrooms',val)} onError={() => console.log('>>>>>')} /> */}
                            </div>
                            <div className='buynowinput'>
                            <TextFieldInput
                             textinputname='maxBed'
                            typeNumber
                            onChange={(e,val)=>onChange('maxBedrooms',val)} onError={() => console.log('>>>>>')}
                            inputProps={{
                                startAdornment: <InputAdornment position="start">Max</InputAdornment>,
                            }}
                            textnewclass='pricingtextfield'
                        />
                                {/* <PhoneFieldInput 
                                 startAdornment={<InputAdornment position="start">Max</InputAdornment>}placeholder='Max' 
                                 textnewclass="contactInputField" onChange={(e,val)=>onChange('maxBedrooms',val)} onError={() => console.log('>>>>>')} /> */}
                            </div>
                          
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <p className='labeltitle'>Bathrooms</p>
                        <div className='inputfiedgroup'>
                        <div className='buynowinput formarginright'>
                        <TextFieldInput
                            typeNumber
                            textinputname='minBath'
                            onChange={(e,val)=>onChange('minBathrooms',val)} onError={() => console.log('>>>>>')}
                            inputProps={{
                                startAdornment: <InputAdornment position="start">Min</InputAdornment>,
                            }}
                            textnewclass='pricingtextfield'
                        />
                                {/* <PhoneFieldInput 
                                 startAdornment={<InputAdornment position="start">Min</InputAdornment>}placeholder='Min' textnewclass="contactInputField"
                                  onChange={(e,val)=>onChange('minBathrooms',val)} onError={() => console.log('>>>>>')} /> */}
                            </div>
                            <div className='buynowinput'>
                            <TextFieldInput
                            typeNumber
                            textinputname='maxBath'
                            onChange={(e,val)=>onChange('maxBathrooms',val)} onError={() => console.log('>>>>>')} 
                            inputProps={{
                                startAdornment: <InputAdornment position="start">Max</InputAdornment>,
                            }}
                            textnewclass='pricingtextfield'
                        />
                                {/* <PhoneFieldInput 
                                 startAdornment={<InputAdornment position="start">Max</InputAdornment>}placeholder='Max' 
                                 textnewclass="contactInputField" onChange={(e,val)=>onChange('maxBathrooms',val)} onError={() => console.log('>>>>>')} /> */}
                            </div>
                          
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <p className='labeltitle'>Sq/ft</p>
                        <div className='inputfiedgroup'>
                            <div className='buynowinput formarginright'>
                            <TextFieldInput
                            typeNumber
                            textinputname='minSQ'
                            onChange={(e,val)=>onChange('minArea',val)} onError={() => console.log('>>>>>')}
                            inputProps={{
                                startAdornment: <InputAdornment position="start">Min</InputAdornment>,
                            }}
                            textnewclass='pricingtextfield'
                        />
                                {/* <PhoneFieldInput 
                                 startAdornment={<InputAdornment position="start">Min</InputAdornment>}placeholder='Min' textnewclass="contactInputField" 
                                 onChange={(e,val)=>onChange('minArea',val)} onError={() => console.log('>>>>>')} /> */}
                            </div>
                            <div className='buynowinput'>
                            <TextFieldInput
                            typeNumber
                            textinputname='maxSQ' 
                            onChange={(e,val)=>onChange('maxArea',val)} onError={() => console.log('>>>>>')}
                            inputProps={{
                                startAdornment: <InputAdornment position="start">Max</InputAdornment>,
                            }}
                            textnewclass='pricingtextfield'
                        />
                                {/* <PhoneFieldInput 
                                 startAdornment={<InputAdornment position="start">Max</InputAdornment>}placeholder='Max'
                                  textnewclass="contactInputField" onChange={(e,val)=>onChange('maxArea',val)} onError={() => console.log('>>>>>')} /> */}
                            </div>
                           
                        </div>
                    </Grid>

                </Grid>
                <div className="addbuttonfooter">
                    <ButtonComponent buttontext="Cancel" buttonextraclass="faqCancelButn"
                        handleButton={props.handleClose} />
                    <ButtonComponent buttontext='Apply' loading={props.loading} handleButton={()=>props.handleButton(filterForm)}
                        inactive={props.inactive}
                    />
                </div>
            </form>
        </div>
    );
}


ButtonComponent.prototype={
    handleButton: PropTypes.func,
    handleClose: PropTypes.func,
    loading: PropTypes.bool,
    inactive:PropTypes.bool,
}


export default FilterForm