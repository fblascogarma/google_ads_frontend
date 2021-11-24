import React, {useState, useEffect, Fragment} from 'react';
// import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import Message from './Message';
import MessageWarning from './MessageWarning';
import MessageSuccess from './MessageSuccess';
import MessageError from './MessageErrorNoClose';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import EditBudget from './EditBudget';


const EditCampaign = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()

    // store campaign info from the api
    const [campaignInfo, setCampaignInfo] = useState([])

    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    const [campaignId, setCampaignId, removeCampaignID] = useCookies(['campaign_id'])


    // to capture the status the user wants for the campaign
    const [status, setStatus] = useState()

    // to store the campaign name if user changes it
    const [campaignName, setCampaignName] = useState("")

    // store headlines of the ad
    const [headlineOne, setHeadlineOne] = useState("")
    const [headlineTwo, setHeadlineTwo] = useState("")
    const [headlineThree, setHeadlineThree] = useState("")

    // count characters of the headlines
    const [headlineOneCharacters, setHeadlineOneCharacters] = useState(0)
    const [headlineTwoCharacters, setHeadlineTwoCharacters] = useState(0)
    const [headlineThreeCharacters, setHeadlineThreeCharacters] = useState(0)

    // store descriptions of the ad
    const [descOne, setDescOne] = useState("")
    const [descTwo, setDescTwo] = useState("")

    // count characters of the descriptions
    const [descOneCharacters, setDescOneCharacters] = useState(0)
    const [descTwoCharacters, setDescTwoCharacters] = useState(0)

    // messages to inform users
    const [message, setMessage] = useState(' Fetching your data... It can take a few seconds.')
    const [messageWarning, setMessageWarning] = useState('')
    const [messageSuccess, setMessageSuccess] = useState('')
    const [messageError, setMessageError] = useState('')

    // store the keyword themes suggestions that the user selects
    const [selectedKeywordThemes, setSelectedKeywordThemes] = useState([])
    
    // capture the keyword themes suggestions sent by Google's API
    const [keywordSuggestions, setKeywordSuggestions] = useState([])

    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // if there is a campaign_id in the cookies
    // send it to the backend with the refreshToken and customer_id
    // where they will be used to get the campaigns settings associated with that campaign_id
    useEffect(() => {
        if(campaignId) {

            // tell user you are fetching their data
            setMessage(' Fetching your data... It can take a few seconds.');
            
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'campaign_id': campaignId['campaignID']
            }

            fetch('http://127.0.0.1:8000/api/get-campaign-settings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp !== null) {
                    console.log(resp);
                    setCampaignInfo(resp);
                    setMessage('')
                } else if (resp === null) {
                    console.log(resp);
                    setMessage('');
                    setMessageWarning('Error when trying to get your campaign settings')

                }
            })
            .catch(error => console.log(error))
           
            
        }
    }, [campaignId, customerId, refreshToken, token])

    // if campaignInfo object has data, delete the 'fetching data' message
    useEffect(() => {
        if(campaignInfo.length > 0) {
            setMessage('')
        }
    }, [campaignInfo])


    // change state that holds the status of campaign
    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    // change state of the campaign
    useEffect(() => {
        if (status === 'Active') {
            // tell user you are changing the status of the campaign
            setMessage(' Activating campaign... It can take a few seconds.');
                        
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'campaign_id': campaignId['campaignID']
            }

            fetch('http://127.0.0.1:8000/api/sc-settings/enable/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp !== null) {
                    console.log(resp);
                    setMessage('')
                } else if (resp === null) {
                    console.log(resp);
                    setMessage('');
                    setMessageWarning('Error when trying to change status')

                }
            })
            .catch(error => console.log(error))

        }

        else if (status === 'Paused') {
            // tell user you are changing the status of the campaign
            setMessage(' Pausing campaign... It can take a few seconds.');
                        
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'campaign_id': campaignId['campaignID']
            }

            fetch('http://127.0.0.1:8000/api/sc-settings/pause/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp !== null) {
                    console.log(resp);
                    setMessage('')
                } else if (resp === null) {
                    console.log(resp);
                    setMessage('');
                    setMessageWarning('Error when trying to change status')

                }
            })
            .catch(error => console.log(error))

        }

        else if (status === 'Deleted') {
            // tell user you are changing the status of the campaign
            setMessage(' Deleting campaign... It can take a few seconds.');
                        
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'campaign_id': campaignId['campaignID']
            }

            fetch('http://127.0.0.1:8000/api/sc-settings/delete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp !== null) {
                    console.log(resp);
                    setMessage('')
                } else if (resp === null) {
                    console.log(resp);
                    setMessage('');
                    setMessageWarning('Error when trying to change status')

                }
            })
            .catch(error => console.log(error))

        }
    }, [campaignId, customerId, refreshToken, status, token])

    // when user clicks on pencil icon to edit campaign name
    // change the h5 tag to a input button to capture name changes
    const [showEditName, setShowEditName] = useState(false)
    const enableNameChange = () => setShowEditName(showEditName ? false : true)
    
    // set campaign name
    const onChangeCampaignName = (e) => {
        setCampaignName(e.target.value)
    }

    // store new campaign name returned from API
    const [newCampaignName, setNewCampaignName] = useState()

    // send new campaign name to backend and to Google's API
    const onClickSendNewName = () => {
        // show again the h5 tag
        setShowEditName(false)
        // tell user you are changing the name of the campaign
        setMessage(' Changing campaign name... It can take a few seconds.');
                        
        // data to send to the backend
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'campaign_name': campaignName
        }

        fetch('http://127.0.0.1:8000/api/sc-settings/edit-name/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp !== null) {
                console.log(resp);
                setNewCampaignName(resp);
                setMessage('')
            } else if (resp === null) {
                console.log(resp);
                setMessage('');
                setMessageWarning('Error when trying to change name')

            }
        })
        .catch(error => console.log(error))

    }
    // end of edit campaign name

    // start of edit budget config

    // when user clicks on pencil icon to edit campaign budget
    // open modal with budget settings
    const [modalShow, setModalShow] = useState(false)

    // store budget recommendations
    const [budget_recommendations, setBudget_recommendations] = useState([])

    // store selected budget
    const [budget, setBudget] = useState("recommended")
    const [custom_budget, setCustom_budget] = useState("")
    const [selected_budget, setSelected_budget] = useState()

    // store new budget return from API
    const [newBudget, setNewBudget] = useState()
    
    // set budget in custom_budget state
    const changeBudget = (e) => {
        setCustom_budget(e.target.value);
    }
    
    // set budget in budget state
    const onChangeBudget = (e) => {
        setBudget(e.target.value);
    }

    const getBudgetRecomm = () => {
        // open modal
        setModalShow(true)

        // tell user you are getting recommendations
        setMessage(' Fetching recommendations for you... It can take a few seconds.')

        // data to send to the API
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'country_code': campaignInfo[0].country_code, 
            'language_code': campaignInfo[0].language_code,
            'geo_target_names': JSON.stringify(campaignInfo[0].geo_targets),
            'landing_page': campaignInfo[0].final_url,
            'display_name': JSON.stringify(campaignInfo[0].keyword_themes)
        }
        console.log(data)
        console.log(campaignInfo)

        // create AbortController function to cancel fetch when it ends
        const ac = new AbortController()

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
        .catch(error => console.log(error));

        return () => ac.abort();
    }

    // send new budget to backend and to Google's API
    const onClickEditBudget = () => {
        if (selected_budget> 0) {
            // close modal
            setModalShow(false)

            // tell user you are changing the budget of the campaign
            setMessage(' Changing campaign budget... It can take a few seconds.');
            setMessageError('')
                            
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'campaign_id': campaignId['campaignID'],
                'new_budget': selected_budget,
                'budget_id': campaignInfo[0].budget_id
            }
            console.log(data)

            fetch('http://127.0.0.1:8000/api/sc-settings/edit-budget/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp !== null) {
                    console.log(resp);
                    setNewBudget(resp);
                    setMessage('')
                } else if (resp === null) {
                    console.log(resp);
                    setMessage('');
                    setMessageWarning('Error when trying to change name')

                }
            })
            .catch(error => console.log(error))

        }

        else if (selected_budget < 0 || selected_budget === 0) {
            setMessageError('Provide a valid budget. More than $0.')
        }
        
    }

    // set selected budget
    useEffect(() => {
        if (budget === 'custom') {
            setSelected_budget(custom_budget*1000000)
        } else if (budget === 'high') {
            setSelected_budget(budget_recommendations.high)
        } else if (budget === 'recommended') {
            setSelected_budget(budget_recommendations.recommended)
        } else if (budget === 'low') {
            setSelected_budget(budget_recommendations.low)
        }

    }, [
        selected_budget, 
        budget, custom_budget, 
        budget_recommendations.high, 
        budget_recommendations.low, 
        budget_recommendations.recommended
        ]
    )

    // end of edit budget config

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

    // object to store the locations selected by users
    const [location_targeting, setLocation_targeting] = useState([])

    // remove location from selected object
    const removeLocation = (e) => {
        const itemToRemove = e.currentTarget.value
        const newArray = location_targeting.filter(el => el !== itemToRemove)
        setLocation_targeting(newArray)
    }

    // object to manage location input
    const [location_input, setLocation_input] = useState('')

    // set location in location_input state
    const onChangeLocation = (e) => {
        setLocation_input(e.target.value);
    }

    // add location
    const addLocation = (e) => {

    }

    // info for search terms report modal start here

    // to filter the query to be sent to the api
    const [date, setDate] = useState("ALL_TIME")

    // store search terms performance info from api
    const [searchTerms, setSearchTerms] = useState([])

    // filter search terms report by date
    const onChangeDate = (e) => {
        setDate(e.target.value);
        setSearchTerms([])

    }

    // messages to inform users
    const [messageSearchTerms, setMessageSearchTerms] = useState(' Fetching your data... It can take a few seconds.')

    // when user clicks on search terms report button
    // open modal with search terms report
    const [modalSearchTermShow, setModalSearchTermShow] = useState(false)

    const getSearchTermsReport = () => {
        // open modal
        setModalSearchTermShow(true)

        // tell user you are getting info
        setMessageSearchTerms(' Fetching information on search terms... It can take a few seconds.')

        // data to send to the API
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'date_range': date
        }
        console.log(data)

        // get search terms report from api
        fetch('http://127.0.0.1:8000/api/get-search-terms-report/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => setSearchTerms(resp))
        .then(resp => {
            if (resp !== null) {
                setMessageSearchTerms('')
            } else {
                setMessageWarning('There was a problem and we could not get budget recommendations.')
            }

            })
        .catch(error => console.log(error));
    }

    // fetch data to API when user selects a new date to filter the info
    useEffect(() => {
        // tell user you are getting info
        setMessageSearchTerms(' Fetching information on search terms... It can take a few seconds.')

        // data to send to the API
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'date_range': date
        }
        console.log(data)

        // get search terms report from api
        fetch('http://127.0.0.1:8000/api/get-search-terms-report/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => setSearchTerms(resp))
        .then(resp => {
            if (resp !== null) {
                setMessageSearchTerms('')
            } else {
                setMessageWarning('There was a problem and we could not get budget recommendations.')
            }

            })
        .catch(error => console.log(error));

    }, [date, campaignId, customerId, refreshToken, token])

    // remove the keyword themes from the selection
    const removeSelectedKeyTheme = (e) => {
        // remove it from the selected array
        const itemToRemove = e.currentTarget.value
        const newArray = selectedKeywordThemes.filter(el => el !== itemToRemove)
        setSelectedKeywordThemes(newArray)
        // add it again to the suggestion array
        setKeywordSuggestions([...keywordSuggestions, itemToRemove])
    }

    // go back button
    const goBack = () => {
        
        history.push('/googleads/accounts/campaigns')
        
    }


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Campaign Information
        </h4> 

        <br/>
        <button type="button" className="btn btn-link" name="go back" 
        onClick={goBack} 
        style={{ color: 'black' }}>
            <i className="fas fa-arrow-left fa-2x"></i>
        </button>
        <br/>
        <br/>
        {message ? <Message msg={message} /> : null}
        {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
        {messageSuccess ? <MessageSuccess msg={messageSuccess} /> : null}
        <br/>
        <br/>
        
        {/* here starts the info about the campaign settings */}
        {campaignInfo.map(item => {
            return(
                <div className="container" key={item.ad_id}>
                    {/* card with campaign name, status, budget, and metrics starts here */}
                    <div className="card">
                        <div className="card-body">
                            {showEditName ? 
                            // button to edit campaign name when user clicks on pencil icon
                            <Fragment>
                            <div className="row">
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="enter_campaign_name"
                                    name="enter_campaign_name" placeholder={item.campaign_name}
                                    value={campaignName ? campaignName : item.campaign_name}
                                    onChange={onChangeCampaignName}></input>
                                </div>
                                <div className="col-sm-1">
                                    <button type="button" className="btn btn-primary"
                                    onClick={onClickSendNewName}>
                                        SAVE
                                    </button>
                                </div>
                                <div className="col-sm-1">
                                    <button type="button" className="btn btn-outline-primary"
                                    onClick={enableNameChange}>
                                        CANCEL
                                    </button>
                                </div>

                            </div>
                            
                            </Fragment> :
                            // campaign name used as title 
                            <h5 className="card-title" font="gotham-rounded-bold" 
                            style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
                                {newCampaignName ? newCampaignName[0].new_campaign_name : item.campaign_name}
                                <i className="fas fa-pencil-alt fa-fw fa-xs"
                                style={{marginLeft: '5px', color:'black', cursor: 'pointer'}}
                                onClick={enableNameChange}></i>
                            </h5>
                            }
                            <br/>
                            <div className="row">
                                <div className="col-sm-1">
                                    <label>
                                        Status: 
                                    </label>
                                </div>
                                <div className="col-sm-2">
                                    <div className="btn-group" >
                                        <select className="form-select form-select-sm" 
                                        onChange={onChangeStatus} value={status ? status : item.status} 
                                        aria-label="Change the status of the campaign"
                                        style={{color: item.status === "Active" && 'white', 
                                        backgroundColor: item.status === "Active" && 'rgb(112, 153, 21)'}}>
                                            <option value="Active">Active</option>
                                            <option value="Paused">Paused</option>
                                            <option value="Deleted">Deleted</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    {String(item.impressions).replace(/(.)(?=(\d{3})+$)/g,'$1,')} impressions
                                </div>
                                <div className="col-sm-2">
                                    {String(item.interactions).replace(/(.)(?=(\d{3})+$)/g,'$1,')} clicks
                                </div>
                                <div className="col-sm-2">
                                    {String(item.conv).replace(/(.)(?=(\d{3})+$)/g,'$1,')} conversions
                                </div>
                                <div className="col-sm-2">
                                    ${String(item.conv_value).replace(/(.)(?=(\d{3})+$)/g,'$1,')} conversions
                                </div>
                            </div>
                            <br/>
                            <div className="col-sm-4">
                                Budget: ${newBudget ? 
                                newBudget[0].new_budget_micros/1000000 :
                                item.budget_micros/1000000} per day
                                <i className="fas fa-pencil-alt fa-fw"
                                style={{marginLeft: '5px', cursor: 'pointer'}}
                                onClick={getBudgetRecomm}></i>
                            </div>

                            {/* start of budget modal */}
                            
                            <Modal show={modalShow} size="lg" centered
                                aria-labelledby="contained-modal-title-vcenter">
                                <Modal.Header closeButton onClick={() => setModalShow(false)}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Edit budget ({budget_recommendations.currency})
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                {message ? <Message msg={message} /> : null}
                                {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
                                <p>Current budget: ${newBudget ? 
                                newBudget[0].new_campaign_budget/1000000 : 
                                campaignInfo[0].budget_micros/1000000} per day</p>
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
                                        {messageError && <MessageError msg={messageError} />}
                                        <div className="row">
                                            <div className="col-sm-2" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <input type="number" className="form-control" id="custom_budget" name="custom_budget"
                                                min="0" onChange={changeBudget} />
                                            </div>
                                            <div className="col-sm-4" style={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                                                {custom_budget && <label>${Math.ceil(custom_budget*30.4)} max per month</label>}
                                            </div>
                                        </div>
                                    </Fragment>}
                                </div>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => setModalShow(false)}>CLOSE</Button>
                                <Button variant="primary" onClick={onClickEditBudget}>SAVE</Button>
                                </Modal.Footer>
                            </Modal>
                            {/* end of budget modal */}
                        </div>
                    </div>
                    <br/>
                    <br/>
                    {/* card with campaign name, status, budget, and metrics ends here */}
                    
                    {/* card with ad creative starts here */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title" font="gotham-rounded-bold" 
                            style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
                                Ad creative
                            </h5>
                            <br/>
                            <p className="card-text">
                                <strong>Ad</strong> • {item.final_url}
                            </p>
                            <p className="card-text" 
                            style={{fontSize:'20px', color:'rgb(71,17,209)'}}>
                                <strong>
                                    {item.headline_1} | {item.headline_2} | {item.headline_3}
                                </strong>
                            </p>
                            <p className="card-text" style={{fontSize:'16px'}}>
                            {item.desc_1} {item.desc_2}
                            </p>
                            <br/>
                            <button type="button" className="btn btn-outline-primary">
                                EDIT
                            </button>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    {/* card with ad creative ends here */}

                    <div>

                    {/* keyword themes settings starts */}
                    <div className="card">
                        <div className="card-body" font="gotham-rounded-bold">
                            <h5 className="card-title" font="gotham-rounded-bold" 
                            style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
                                Categories of keywords
                            </h5>
                            <p className="card-text">
                                Add up to 7 categories of keywords, and don't use 
                                punctuation marks, phone numbers, or webpage address (URL).
                            </p>
                            <Fragment>
                                <label>Selected category keywords:</label>
                                <br/>
                                {item.keyword_themes.length === 7 ? 
                                <small className= "form-text text-success">7 categories selected. 
                                If you want to add more, create a new campaign or delete selected ones.</small> :
                                <small className="form-text text-muted">
                                    You can select {7 - item.keyword_themes.length} more.
                                </small>}
                            </Fragment>
                            <div className="row">
                                {item.keyword_themes.map(item => {
                                    return <div className="col-sm" style={{paddingTop: '10px'}} key={item}>
                                    <button type="button" className="btn btn-outline-secondary btn-sm" 
                                    style={{whiteSpace: 'nowrap'}} 
                                    value={item} 
                                    key={item}>
                                        
                                        {item}
                                    </button>
                                </div>
                                })}
                            </div>
                            <br/>
                            <br/>
                            {/* start of search terms modal */}
                            <Modal show={modalSearchTermShow} size="lg" centered
                                aria-labelledby="contained-modal-title-vcenter">
                                <Modal.Header closeButton onClick={() => setModalSearchTermShow(false)}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Search terms report
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                {messageSearchTerms ? <Message msg={messageSearchTerms} /> : null}
                                {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
                                <p>Here's what people searched for before seeing and clicking your ads.</p>
                                {/* filter by date starts */}
                                <div className="col-sm" align='left'>
                                    <p><i className="fas fa-filter"></i>  Filter by date</p>
                            
                                    <div className="btn-group" >
                                        
                                    <select className="form-select form-select-sm" onChange={onChangeDate} value={date} aria-label="Filter table by date">
                                            
                                            <option value="TODAY">Today</option>
                                            <option value="YESTERDAY">Yesterday</option>
                                            <option value="THIS_WEEK_SUN_TODAY">This week (Sun - Today)</option>
                                            <option value="LAST_7_DAYS">Last 7 days</option>
                                            <option value="LAST_14_DAYS">Last 14 days</option>
                                            <option value="THIS_MONTH">This month</option>
                                            <option value="LAST_30_DAYS">Last 30 days</option>
                                            <option value="LAST_MONTH">Last month</option>
                                            <option value="ALL_TIME">All time</option>
                                        </select>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                {/* filter by date starts */}

                                {/* search terms table starts */}
                                <table className="table table-bordered table-hover table-responsive">
                                    <thead className="thead-light" style={{backgroundColor: 'rgb(248,172,6)'}}>
                                    <tr key="search_terms_table" style={{ textAlign: 'center', verticalAlign: 'top'}}>
                                        <th key="search_terms" scope="col">Search terms</th>
                                        <th key="clicks" scope="col">Clicks</th>
                                        <th key="cost" scope="col">Spend</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {searchTerms.map(item => {
                                            return <tr key={item.search_term} id={item.search_term} value={item.search_term} 
                                            style={{ textAlign: 'center'}}>
                                                <td> {item.search_term}</td>
                                                <td> {String(item.search_term_clicks).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                                <td> ${String(item.search_term_cost).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                            </tr>
                                        })}  
                                    </tbody>        
                                </table>
                                {/* search terms table ends */}
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => setModalSearchTermShow(false)}>CLOSE</Button>
                                </Modal.Footer>
                            </Modal>
                            {/* end of search terms modal */}
                            <div className="row">
                                <div className="col-sm-2">
                                <button type="button" className="btn btn-outline-primary">
                                    EDIT
                                </button>
                                </div>
                                <div className="col-sm-4">
                                <button type="button" className="btn btn-primary" 
                                onClick={getSearchTermsReport}>
                                    SEARCH TERMS REPORT
                                </button> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>

                    {/* keyword themes settings ends */}

                    {/* geo targeting location setting starts */}
                    <div className="card" font="gotham-rounded-bold">
                        <div className="card-body">
                            <h5 className="card-title" 
                            style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
                                Target locations
                            </h5>
                            <p className="card-text">
                                Your ads show to people physically or regularly in the locations you select, 
                                and to people who express interest in these locations.
                            </p>
                            <label>Selected locations:</label>
                            <br/>
                            <div className="row">
                                {item.geo_targets.map(item => {
                                    return <div className="col-sm" style={{paddingTop: '10px'}} key={item}>
                                    <button type="button" className="btn btn-outline-secondary btn-sm" 
                                    style={{whiteSpace: 'nowrap'}} 
                                    value={item} 
                                    key={item}>
                                        
                                        {item}
                                    </button>
                                </div>
                                })}
                            </div>
                            <br/>
                            <br/>
                            <button type="button" className="btn btn-outline-primary">
                                EDIT
                            </button>
                        </div>
                    </div>
                    {/* geo targeting location setting ends */}
                    </div>
                </div>
            )
        })}

        <br/>
        <br/>

        <div className="container" align="left">
            
                <div className="col-6">
                    <button onClick={goBack} className="btn btn-outline-primary">BACK</button>
                </div>
            
        </div>
        <br/>
        <br/>

        

        <br/>
        
    </div>
)}

export default EditCampaign;