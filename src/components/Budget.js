import React, {useState, useEffect, Fragment} from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import ProgressionTracker from './ProgressionTracker';
import Message from './Message';
import MessageWarning from './MessageWarning';


const Budget = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()

    // cookies that have value to send to the backend to get 
    // budget recommendation
    const [country_code, setCountry_code, removeCountry_code] = useCookies(['country_code'])
    const [language_code, setLanguage_code, removeLanguage_code] = useCookies(['language_code'])
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    const [geo_location, setGeo_location, removeGeo_location] = useCookies(['geo_location'])
    const [landing_page, setLanding_page, removeLanding_page] = useCookies(['landing_page'])
    const [keyword_themes, setKeyword_themes, removeKeyword_themes] = useCookies(['keyword_themes'])

    const [message, setMessage] = useState('')
    const [messageWarning, setMessageWarning] = useState('')


    // store selected budget
    const [budget, setBudget] = useState("recommended")
    const [custom_budget, setCustom_budget] = useState("")
    
    // set budget in budget state
    const onChangeBudget = (e) => {
        setBudget(e.target.value);
    }

    // store budget recommendations
    const [budget_recommendations, setBudget_recommendations] = useState([])

    // // data to send to the API
    // const data = { 
    //     'refreshToken': refreshToken['refreshToken'], 
    //     'customer_id': customerId['customerID'], 
    //     'country_code': country_code['country_code'], 
    //     'language_code': language_code['language_code'],
    //     'geo_target_names': JSON.stringify(geo_location['geo_location']),
    //     'landing_page': landing_page['landing_page'],
    //     'display_name': JSON.stringify(keyword_themes['keyword_themes'])
    // }

    // // get budget recommendation from API
    // const budgetRecommendation = () => {
    //     fetch('http://127.0.0.1:8000/api/get-budget-recommendation/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Token ${token['mytoken']}`
    //             },
    //             body: JSON.stringify(data),
                
    //         })
    //         .then(resp => resp.json())
    //         .then(resp => setBudget_recommendations(resp))
    //         .catch(error => console.log(error))

    // }

    // set location in location_input state
    const changeBudget = (e) => {
        setCustom_budget(e.target.value);
    }
    
    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // get budget recommendations
    useEffect(() => {
        if(geo_location['geo_location']) {
            // tell user you are getting recommendations
            setMessage(' Fetching recommendations for you... It will take a few seconds.')

            // data to send to the API
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'country_code': country_code['country_code'], 
                'language_code': language_code['language_code'],
                'geo_target_names': JSON.stringify(geo_location['geo_location']),
                'landing_page': landing_page['landing_page'],
                'display_name': JSON.stringify(keyword_themes['keyword_themes'])
            }

            // get recommendations from api
            fetch('http://127.0.0.1:8000/api/get-budget-recommendation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => setBudget_recommendations(resp))
            .then(resp => {
                if (resp !== null) {
                    setMessage('')
                } else {
                    setMessageWarning('There was a problem and we could not get budget recommendations.')
                }

                })
            .catch(error => console.log(error))

        }
    }, [geo_location, country_code, landing_page, customerId, keyword_themes, language_code, refreshToken, token])

    
    // back button
    const goStep4 = () => {
        history.push('/googleads/campaigns/location')
    }

    // next button
    const createSmartCampaign = () => {

    }
    


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create New Campaign
        </h4> 

        <br/>

        <ProgressionTracker step="step5" />
        
        <br/>
        <br/>

        <button type="button" className="btn btn-link" name="go back" 
        onClick={goStep4} 
        style={{ color: 'black' }}>
            <i className="fas fa-arrow-left fa-2x"></i>
        </button>
        <br/>
        <br/>

        <h6 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
            5. Select budget
        </h6>

        <br/>
        <p>
            You will never get charged more than the budget you set for a month. 
            Daily spending might vary, 
            some days spending more and others less, 
            but the total amount per month 
            will not be higher than the total budget for the month.
        </p>
        
        <br/>

        <div className="alert alert-warning" role="alert">
            <i className="fas fa-info-circle fa-fw" style={{marginRight: '10px'}}></i>    
            You can change the budget anytime you want  
            and stop running the ad whenever you want.
            </div>

        <br/>

        {/* <button onClick={budgetRecommendation} className="btn btn-success">
                GET BUDGET
        </button> */}
        {message ? <Message msg={message} /> : null}
        {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
        <br/>

        <label>Budget in {budget_recommendations.currency}</label>
            <br/>
            <br/>
            <div className="list-group" role="group">
                <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
                color: (budget === 'high') && 'rgb(30,136,229)'}}>
                    <input className="form-check-input me-1" type="radio" value="high" 
                    onChange={onChangeBudget} 
                    checked={ budget === "high"}/>
                    ${budget_recommendations.high/1000000} per day / 
                    ${Math.ceil(budget_recommendations.high/1000000*30.4)} max per month  
                    | Between {String(Math.round(budget_recommendations.high_min_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} and {String(Math.round(budget_recommendations.high_max_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} potential customers per month
                </label>
                <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
                color: (budget === 'recommended') && 'rgb(30,136,229)'}}>
                    <input className="form-check-input me-1" type="radio" value="recommended" 
                    onChange={onChangeBudget} 
                    checked={ budget === "recommended"}/>
                    ${budget_recommendations.recommended/1000000} per day / 
                    ${Math.ceil(budget_recommendations.recommended/1000000*30.4)} max per month 
                    | Between {String(Math.round(budget_recommendations.recommended_min_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} and {String(Math.round(budget_recommendations.recommended_max_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} potential customers per month
                </label>
                <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
                color: (budget === 'low') && 'rgb(30,136,229)'}}>
                    <input className="form-check-input me-1" type="radio" value="low" 
                    onChange={onChangeBudget} 
                    checked={ budget === "low"}/>
                    ${budget_recommendations.low/1000000} per day / 
                    ${Math.ceil(budget_recommendations.low/1000000*30.4)} max per month 
                    | Between {String(Math.round(budget_recommendations.low_min_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} and {String(Math.round(budget_recommendations.low_max_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} potential customers per month
                </label>
                <small className= "form-text text-muted">
                    Every click to your ad is considered a potential customer.
                </small>
                <br/>
                <br/>
                <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
                color: (budget === 'custom') && 'rgb(30,136,229)'}}>
                    <input className="form-check-input me-1" type="radio" value="custom" 
                    onChange={onChangeBudget} 
                    checked={ budget === "custom"}/>
                    Enter other budget
                </label>
                {budget === "custom" && 
                <Fragment>
                    <br/>
                    <label>Budget per day in {budget_recommendations.currency}</label>
                    <br/>
                    <div className="row">
                        <div className="col-sm-2" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <input type="number" className="form-control" id="custom_budget" name="custom_budget"
                            onChange={changeBudget} />
                        </div>
                        <div className="col-sm-4" style={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                            {custom_budget && <label>${Math.ceil(custom_budget*30.4)} max per month</label>}
                        </div>
                        {/* <small className= "form-text text-muted">
                            Every click to your ad is considered a potential customer.
                        </small> */}
                    </div>
                    
                    
                </Fragment>}
                
            </div>
            

        <br/>
        <br/>

        <div className="container" align="left">
            <div className="row">
                <div className="col">

                    <button type="button" onClick={goStep4} 
                    className="btn btn-outline-primary btn-block" 
                    style={{margin:'10px'}}>Back
                    </button>
            
                </div>

                <div className="col" align="right">

                    <button type="button" onClick={createSmartCampaign} 
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

export default Budget;