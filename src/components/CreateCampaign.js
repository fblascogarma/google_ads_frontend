import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';



const CreateCampaign = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    const [goal, setGoal] = useState("sales_signups")
    const [businessName, setBusinessName] = useState("")
    const [landingPage, setLandingPage] = useState("")
    const [headlineOne, setHeadlineOne] = useState("")
    const [headlineTwo, setHeadlineTwo] = useState("")
    const [headlineThree, setHeadlineThree] = useState("")
    const [headlineOneCharacters, setHeadlineOneCharacters] = useState(0)
    const [headlineTwoCharacters, setHeadlineTwoCharacters] = useState(0)
    const [headlineThreeCharacters, setHeadlineThreeCharacters] = useState(0)
    const [descOne, setDescOne] = useState("")
    const [descTwo, setDescTwo] = useState("")
    const [descOneCharacters, setDescOneCharacters] = useState(0)
    const [descTwoCharacters, setDescTwoCharacters] = useState(0)
    const [phoneNumber, setPhoneNumber] = useState()
    const [countryCode, setCountryCode] = useState("US")

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
    const onChangeBusName = (e) => {setBusinessName(e.target.value)}

    // set business name
    const onChangeLanding = (e) => {setLandingPage(e.target.value)}

    // set headline 1
    const onChangeHeadlineOne = (e) => {
        setHeadlineOne(e.target.value); 
        setHeadlineOneCharacters(e.target.value.length)}

    // set headline 2
    const onChangeHeadlineTwo = (e) => {
        setHeadlineTwo(e.target.value);
        setHeadlineTwoCharacters(e.target.value.length)}

    // set headline 3
    const onChangeHeadlineThree = (e) => {
        setHeadlineThree(e.target.value);
        setHeadlineThreeCharacters(e.target.value.length)}

    // set description 1
    const onChangeDescOne = (e) => {
        setDescOne(e.target.value); 
        setDescOneCharacters(e.target.value.length)}
    
    // set description 2
    const onChangeDescTwo = (e) => {
        setDescTwo(e.target.value);
        setDescTwoCharacters(e.target.value.length)}

    // set phone number
    const onChangePhoneNumber = (e) => {setPhoneNumber(e.target.value)}

    // set country code for phone number
    const onChangeCountryCode = (e) => {setCountryCode(e.target.value)}




    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create New Campaign
        </h4> 

        <br/>
        <p>Follow these simple steps to create a new campaign.</p>

        <br/>
        <br/>

        <h6 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
            1. General Information
        </h6>

        <label>What's your main advertising goal?</label>
        <br/>
        <br/>
        <div className="list-group" role="group">
            <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer'}}>
                <input className="form-check-input me-1" type="radio" value="calls" 
                onChange={onChangeGoal} 
                checked={ goal === "calls"}/>
                Get more calls
            </label>
            <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer'}}>
                <input className="form-check-input me-1" type="radio" value="sales_signups" 
                onChange={onChangeGoal} 
                checked={ goal === "sales_signups"}/>
                Get more website sales or sign-ups
            </label>
            <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer'}}>
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

        <label>Enter name of your business</label>
        <br/>
        <br/>
        <textarea className="form-control" placeholder="Enter name of your business..." id="business_name" rows="1" maxLength="1000"
        onChange={onChangeBusName} value={businessName}></textarea>
        <small className="form-text text-muted">
            This helps Google show your ad when people search for your business by name.
        </small>
        <br/>
        <br/>

        <label>Tell us where people go after they click your ad</label>
        <br/>
        <br/>
        <textarea className="form-control" placeholder="www.example.com" id="landing_page_url" rows="1" maxLength="1000"
        onChange={onChangeLanding} value={landingPage}></textarea>
        <small className="form-text text-muted">
            This might be your homepage, or a more specific page.
        </small>
        <br/>
        <br/>

        <h6 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
            2. Write your ad
        </h6>

        

        <div>
        <p>Your headlines are what your customers will focus on. 
            Keep them simple, clear, and related to what they're are searching for.
        </p>
            <label>Headline 1</label>
            <br/>
            <textarea className="form-control" placeholder="Enter first headline for your ad..." 
            id="headline_1" rows="1" maxLength="30"
            onChange={onChangeHeadlineOne} value={headlineOne}></textarea>
            <small className="form-text text-muted">
                {headlineOneCharacters}/30 characters.
            </small>
            <br/>
            <br/>

            <label>Headline 2</label>
            <br/>
            <textarea className="form-control" placeholder="Enter second headline for your ad..." 
            id="headline_2" rows="1" maxLength="30"
            onChange={onChangeHeadlineTwo} value={headlineTwo}></textarea>
            <small className="form-text text-muted">
                {headlineTwoCharacters}/30 characters.
            </small>
            <br/>
            <br/>

            <label>Headline 3</label>
            <br/>
            <textarea className="form-control" placeholder="Enter third headline for your ad..." 
            id="headline_3" rows="1" maxLength="30"
            onChange={onChangeHeadlineThree} value={headlineThree}></textarea>
            <small className="form-text text-muted">
                {headlineThreeCharacters}/30 characters.
            </small>
            <br/>
            <br/>
            
        <p>Your descriptions should highlight what sets you apart from your competition. 
            Check spelling and grammar.
        </p>
            <label>Description 1</label>
            <br/>
            <textarea className="form-control" placeholder="Enter first description for your ad..." 
            id="desc_1" rows="2" maxLength="90"
            onChange={onChangeDescOne} value={descOne}></textarea>
            <small className="form-text text-muted">
                {descOneCharacters}/90 characters.
            </small>
            <br/>
            <br/>

            <label>Description 2</label>
            <br/>
            <textarea className="form-control" placeholder="Enter second description for your ad..." 
            id="desc_2" rows="2" maxLength="90"
            onChange={onChangeDescTwo} value={descTwo}></textarea>
            <small className="form-text text-muted">
                {descTwoCharacters}/90 characters.
            </small>
            <br/>
            <br/>

            <label>Show a call button in your ad by entering your business phone number</label>
            <br/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label>Select country of your phone number</label>
                        <select className="form-select form-select" onChange={onChangeCountryCode} 
                        value={countryCode} aria-label="Choose country code for phone number">
                            <option value="US">United States</option>
                            <option value="AR">Argentina</option>
                            <option value="BR">Brazil</option>
                        </select>
                    </div>
                    <div className="col">
                        <label>Enter phone number for your business</label>
                        <textarea className="form-control" placeholder="Enter phone number..." 
                            id="phone_number" rows="1" maxLength="100"
                            onChange={onChangePhoneNumber} value={phoneNumber}></textarea>
                    </div>
                </div>
            </div>
            
        </div>
        {/* <div className="container" align="left">
            
                <div className="col-6">
                    <button onClick={writeAd} className="btn btn-success">
                        Continue to write your ad
                    </button>
                </div>
            
        </div> */}
        
        <br/>
        
    </div>
)}

export default CreateCampaign;