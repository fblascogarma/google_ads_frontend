import React, {useState, useEffect, Fragment} from 'react';
// import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import Message from './Message';
import MessageWarning from './MessageWarning';
import MessageSuccess from './MessageSuccess';


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
    const [message, setMessage] = useState(' Fetching your data... It will take a few seconds.')
    const [messageWarning, setMessageWarning] = useState('')
    const [messageSuccess, setMessageSuccess] = useState('')

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

    // set campaign name
    const onChangeCampaignName = (e) => {
        setCampaignName(e.target.value)
    }

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

    // remove the keyword themes from the selection
    const removeSelectedKeyTheme = (e) => {
        // remove it from the selected array
        const itemToRemove = e.currentTarget.value
        const newArray = selectedKeywordThemes.filter(el => el !== itemToRemove)
        setSelectedKeywordThemes(newArray)
        // add it again to the suggestion array
        setKeywordSuggestions([...keywordSuggestions, itemToRemove])
    }


    // redirect to step 1 of campaign creation 
    // when user clicks on 'Create campaign' button
    const create = () => {
        history.push('/googleads/campaigns/create-campaign')
    }

    // go back button
    const goBack = () => {
        
        history.push('/googleads/accounts/campaigns')
        
    }

    // when user clicks on a row, the campaign_id will be saved as a cookie
    // so we show the details of that campaign in the next page
    // also, it will be used to update the campaign
    const onClick = e => {
        const campaignID = e.currentTarget.id
        setCampaignId("campaignID", campaignID);
        history.push('/googleads/accounts/campaigns');

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
                            <h5 className="card-title" font="gotham-rounded-bold" 
                            style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
                                {item.campaign_name}
                                <i className="fas fa-pencil-alt fa-fw fa-xs"
                                style={{marginLeft: '5px', color:'black'}}></i>
                            </h5>
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
                                    X impressions
                                </div>
                                <div className="col-sm-2">
                                    Y clicks
                                </div>
                                <div className="col-sm-2">
                                    Z conversions
                                </div>
                            </div>
                            <br/>
                            <div className="col-sm-4">
                                Budget: ${item.budget_micros/1000000} per day
                                <i className="fas fa-pencil-alt fa-fw"
                                style={{marginLeft: '5px'}}></i>
                            </div>
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
                            {item.desc_1}. {item.desc_2}.
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
                                <button type="button" className="btn btn-outline-primary">
                                    EDIT
                                </button>
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