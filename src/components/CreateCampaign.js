import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import MessageError from './MessageErrorNoClose';
import ProgressionTracker from './ProgressionTracker';


// this is step 1 from a 5-step process
const CreateCampaign = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    let history = useHistory()

    // fields to be completed by user
    const [goal, setGoal] = useState("sales_signups")
    const [businessName, setBusinessName] = useState("")
    const [landingPage, setLandingPage] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [countryCode, setCountryCode] = useState("US")
    const [languageCode, setLanguageCode] = useState("en")

    // cookies from step 1
    const [country_code, setCountry_code, removeCountry_code] = useCookies(['country_code', "US"])
    const [business_name, setBusiness_name, removeBusiness_name] = useCookies(['business_name'])
    const [landing_page, setLanding_page, removeLanding_page] = useCookies(['landing_page'])
    const [phone_number, setPhone_number, removePhone_number] = useCookies(['phone_number'])
    const [language_code, setLanguage_code, removeLanguage_code] = useCookies(['language_code'])
    
    const [messageError, setMessageError] = useState('')


    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // set advertising goal
    const onChangeGoal = (e) => {setGoal(e.target.value)}

    // set business name
    const onChangeBusName = (e) => {
        removeBusiness_name(['business_name']);
        setBusinessName(e.target.value)}

    // set business name
    const onChangeLanding = (e) => {
        removeLanding_page(['landing_page']);
        setLandingPage(e.target.value)}

    // set phone number
    const onChangePhoneNumber = (e) => {
        removePhone_number(['phone_number']);
        setPhoneNumber(e.target.value)}

    // set country code for phone number
    const onChangeCountryCode = (e) => {
        removeCountry_code(['country_code']);
        setCountryCode(e.target.value)}

    // set language code
    const onChangeLanguageCode = (e) => {
        removeLanguage_code(['language_code']);
        setLanguageCode(e.target.value)}

    // if there are field values saved as cookies, setState
    useEffect(() => {
        if(business_name['business_name']) {
            
            setBusinessName(business_name['business_name'])
        }
    }, [business_name])

    useEffect(() => {
        if(landing_page['landing_page']) {
            
            setLandingPage(landing_page['landing_page'])
        }
    }, [landing_page])

    useEffect(() => {
        if(phone_number['phone_number']) {
            
            setPhoneNumber(phone_number['phone_number'])
        }
    }, [phone_number])

    useEffect(() => {
        if(country_code['country_code']) {
            
            setCountryCode(country_code['country_code'])
        }
    }, [country_code])

    useEffect(() => {
        if(language_code['language_code']) {
            
            setLanguageCode(language_code['language_code'])
        }
    }, [language_code])

    // when user clicks on 'Next' button
    const goStep2 = () => {
        if (
            // if required fields are completed
            // or there are cookies of the fields
            // send user to the next step
            // if not, error message
            ((businessName.length !== 0) && (landingPage.length !== 0) && (phoneNumber.length !== 0)) || 
            ((business_name['business_name']) && 
            (landing_page['landing_page']) && 
            (phone_number['phone_number']))) 
               
                {
                    // save values as cookies to use later and send user to step 2
                    setLanguage_code("language_code", languageCode, { encode: String});
                    setBusiness_name("business_name", businessName, { encode: String});
                    setLanding_page("landing_page", landingPage, { encode: String});
                    setCountry_code("country_code", countryCode);
                    setPhone_number("phone_number", phoneNumber);
                    history.push('/googleads/campaigns/location');
                } else {setMessageError('You need to fill out all fields to continue.');}
        }

    // when user clicks on 'Back' button
    const goPreviousStep = () => {
        history.push('/googleads/accounts/campaigns')}
    


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create New Campaign
        </h4> 

        <br/>

        <ProgressionTracker step="step1" />
        
        <br/>
        <br/>

        <button type="button" className="btn btn-link" name="go back" 
        onClick={goPreviousStep} 
        style={{ color: 'black' }}>
            <i className="fas fa-arrow-left fa-2x"></i>
        </button>
        <br/>
        <br/>

        <h6 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
            1. General Information
        </h6>

        {/* all fields in this section will be pre-populated 
        if user already filled them in another section
        and didn't remove all cookies */}
        <label>What do you want to accomplish from this Google ad?</label>
        <br/>
        <br/>
        <div className="list-group" role="group">
            <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
            color: (goal === 'calls') && 'rgb(30,136,229)'}}>
                <input className="form-check-input me-1" type="radio" value="calls" 
                onChange={onChangeGoal} 
                checked={ goal === "calls"}/>
                Get more calls
            </label>
            <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
            color: (goal === 'sales_signups') && 'rgb(30,136,229)'}}>
                <input className="form-check-input me-1" type="radio" value="sales_signups" 
                onChange={onChangeGoal} 
                checked={ goal === "sales_signups"}/>
                Get more website sales or sign-ups
            </label>
            <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
            color: (goal === 'offline_sales') && 'rgb(30,136,229)'}}>
                <input className="form-check-input me-1" type="radio" value="offline_sales" 
                onChange={onChangeGoal} 
                checked={ goal === "offline_sales"}/>
                Get more visits to your physical location
            </label>
        </div>
        <small className="form-text text-muted">
            If you have more than one goal, create separate campaigns for each one of them.
        </small>
        <br/>
        <br/>
        <br/>

        <label>Enter name of your business</label>
        <br/>
        <br/>
        <textarea className="form-control" placeholder="Enter name of your business..." id="business_name" rows="1" maxLength="1000"
        onChange={onChangeBusName} 
        value={business_name ? business_name['business_name'] : businessName}></textarea>
        <small className="form-text text-muted">
            This helps Google show your ad when people search for your business by name.
        </small>
        <br/>
        <br/>
        <br/>

        <label>Tell us where people go after they click your ad</label>
        <br/>
        <br/>
        <textarea className="form-control" placeholder="https://www.example.com" id="landing_page_url" rows="1" maxLength="1000"
        onChange={onChangeLanding} 
        value={landing_page ? landing_page['landing_page'] : landingPage}></textarea>
        <small className="form-text text-muted">
            This might be your homepage, or a more specific page. 
            Copy the page address (URL) and paste it here 
            to make sure there are no mistakes.
        </small>
        <br/>
        <br/>
        <br/>

        <label>Select language of your ad</label>
        <br/>
        <br/>
            <select className="form-select form-select" onChange={onChangeLanguageCode} 
            value={language_code ? language_code['language_code'] : languageCode} aria-label="Choose language for your ad">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="pt">Portuguese</option>
            </select>
        <br/>
        <br/>
        <br/>

        <label>Enter your business phone number</label>
            <br/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label>Select country of your phone number</label>
                        <select className="form-select form-select" onChange={onChangeCountryCode} 
                        value={country_code ? country_code['country_code'] : countryCode} aria-label="Choose country code for phone number">
                            <option value="US">United States</option>
                            <option value="AR">Argentina</option>
                            <option value="BR">Brazil</option>
                        </select>
                    </div>
                    <div className="col">
                        <label>Enter phone number for your business</label>
                        <textarea className="form-control" placeholder="Enter phone number..." 
                            id="phone_number" rows="1" maxLength="100"
                            onChange={onChangePhoneNumber} 
                            value={phone_number ? phone_number['phone_number'] : phoneNumber}></textarea>
                    </div>
                </div>
            </div>
            <br/>
            <br/>

        {messageError ? <MessageError msg={messageError} /> : null}
        <div className="container" align="left">
            
            <div className="row">
                    <div className="col">

                        <button type="button" onClick={goPreviousStep} 
                        className="btn btn-outline-primary btn-block" 
                        style={{margin:'10px'}}>Back
                        </button>
                
                    </div>

                    <div className="col" align="right">

                        <button type="button" onClick={goStep2} 
                        className="btn btn-primary btn-block"  
                        style={{margin:'10px'}}>
                            Next
                        </button>
                
                    </div>
            </div>
        </div>
        <br/>
        <br/>
        
        <br/>
        
    </div>
)}

export default CreateCampaign;