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


    // to filter the table
    const [status, setStatus] = useState("All but removed")

    // to filter the query to be sent to the api
    const [date, setDate] = useState("ALL_TIME")

    // messages to inform users
    const [message, setMessage] = useState(' Fetching your data... It will take a few seconds.')
    const [messageWarning, setMessageWarning] = useState('')
    const [messageSuccess, setMessageSuccess] = useState('')



    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // if there is a customer_id in the cookies
    // send it to the backend with the refreshToken
    // where they will be used to get the campaigns info associated with that customer_id and token
    useEffect(() => {
        if(customerId) {

            // tell user you are fetching their data
            setMessage(' Fetching your data... It will take a few seconds.');
            
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'date_range': date
            }

            fetch('http://127.0.0.1:8000/api/get-campaigns/', {
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
                    // console.log(resp);
                    setCampaignInfo(resp);
                    setMessage('')
                } else if (resp === null) {
                    // console.log(resp);
                    setMessage('');
                    setMessageWarning('You do not have campaigns. Create a campaign that can start showing ads within one day.')

                }
            })
            .catch(error => console.log(error))
           
            
        }
    }, [customerId, refreshToken, token, date])

    // if campaignInfo object has data, delete the 'fetching data' message
    useEffect(() => {
        if(campaignInfo.length > 0) {
            setMessage('')
        }
    }, [campaignInfo])


    // filter campaigns by status
    const onChangeStatus = (e) => {
        setStatus(e.target.value)

    }

    // filter campaigns by date
    const onChangeDate = (e) => {
        setDate(e.target.value);
        setCampaignInfo([])

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

    // if there is a successMessage in the cookies for creating a campaign
    // show it to the user
    // useEffect(() => {
    //     if (successMessage['successMessage']) {
    //         setMessageSuccess('The ad was successfully created! Google is reviewing your ad. Generally, it takes one business day, and you will know when you see the status of your campaign as Active.')
    //     }
    // }, [successMessage])

    // useEffect(() => {
    //     if (history.location.state.from === '/googleads/campaigns/budget') {
    //         setMessageSuccess('The ad was successfully created! Google is reviewing your ad. Generally, it takes one business day, and you will know when you see the status of your campaign as Active.')
    //     }
    // }, [history])


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
        
        <p>Select what you want to edit.
        </p>
        
        

        <br/>
        <br/>

        <div className="container" align="left">
            
                <div className="col-6">
                    <button onClick={create} className="btn btn-success">Create campaign</button>
                </div>
            
        </div>
        <br/>
        <br/>

        {message ? <Message msg={message} /> : null}
        {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
        {messageSuccess ? <MessageSuccess msg={messageSuccess} /> : null}
        <br/>
        <br/>

        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <p><i className="fas fa-filter"></i>  Filter by campaign status</p>
            
                    <div className="btn-group">
                        
                        <select className="form-select form-select-sm" onChange={onChangeStatus} value={status} aria-label="Filter table by campaign status">
                            
                            <option value="All">All</option>
                            <option value="All active">All active</option>
                            <option value="All but removed">All but removed</option>
                        </select>
                    </div>

                </div>

                <div className="col-sm" align='right'>
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
            </div>
        </div>
        

        <br/>
        <br/>

        <table className="table table-bordered table-hover table-responsive">
            <thead className="thead-light" style={{backgroundColor: 'rgb(248,172,6)'}}>
                <tr key="accounts_table" style={{ textAlign: 'center', verticalAlign: 'top'}}>
                    
                    <th key="campaign_name" scope="col" colSpan={2}>Campaign</th>
                    <th key="budget" scope="col">Budget per day</th>
                    <th key="status" scope="col">Status</th>
                    <th key="campaign_type" scope="col">Campaign type</th>
                    <th key="impressions" scope="col">Impr.</th>
                    <th key="interactions" scope="col">Interactions</th>
                    <th key="interaction_rate" scope="col">Interaction rate</th>
                    <th key="avg_cost" scope="col">Avg. cost</th>
                    <th key="total_cost" scope="col">Cost</th>
                    <th key="conversions" scope="col">Conversions</th>
                    <th key="cost_per_conversion" scope="col">Cost / conv.</th>
                    <th key="conversion_rate" scope="col">Conv. rate</th>
                </tr>
            </thead>
           
            <tbody>
                {campaignInfo.length > 0 && campaignInfo.map(item => {
                    if (status === "All active") {
                        return(
                    
                            <tr key={item.campaign_id} id={item.campaign_id} value={item.campaign_id} 
                            onClick={onClick}
                            style={{ textAlign: 'center', cursor: 'pointer', 
                            display: item.status === "Active" ? '' : 'none'  }}>
                                
                            
                                <td> <i className="fas fa-circle" style={{ color: 'green', display: item.status==="Active" ? '' : 'none'}}></i>
                                <i className="fas fa-pause-circle" style={{ color: '', display: item.status==="Paused" ? '' : 'none'}}></i>
                                <i className="fas fa-times-circle" style={{ color: 'red', display: item.status==="Removed" ? '' : 'none'}}></i></td>
                                <td> {item.campaign_name}</td>
                                <td> ${item.campaign_budget}</td>
                                <td> {item.status}</td>
                                <td> {item.campaign_type}</td>
                                <td> {String(item.impressions).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> {String(item.interactions).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> {item.interaction_rate}%</td>
                                <td> ${item.cpc}</td>
                                <td> ${String(item.cost).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> {String(item.conv).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> ${item.cost_per_conv}</td>
                                <td> {item.conv_rate}%</td>
            
                                
                            </tr>
                            
                            )

                    } else if (status === "All but removed") {
                        return(
                    
                            <tr key={item.campaign_id} id={item.campaign_id} value={item.campaign_id} 
                            onClick={onClick}
                            style={{ textAlign: 'center', cursor: 'pointer', 
                            display: item.status === "Active" || item.status === "Paused" ? '' : 'none'  }}>
                                
                            
                                <td> <i className="fas fa-circle" style={{ color: 'green', display: item.status==="Active" ? '' : 'none'}}></i>
                                <i className="fas fa-pause-circle" style={{ color: '', display: item.status==="Paused" ? '' : 'none'}}></i>
                                <i className="fas fa-times-circle" style={{ color: 'red', display: item.status==="Removed" ? '' : 'none'}}></i></td>
                                <td> {item.campaign_name}</td>
                                <td> ${item.campaign_budget}</td>
                                <td> {item.status}</td>
                                <td> {item.campaign_type}</td>
                                <td> {String(item.impressions).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> {String(item.interactions).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> {item.interaction_rate}%</td>
                                <td> ${item.cpc}</td>
                                <td> ${String(item.cost).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> {String(item.conv).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> ${item.cost_per_conv}</td>
                                <td> {item.conv_rate}%</td>
            
                                
                            </tr>

                            
                            
                            )
                    } else {
                        return(
                    
                            <tr key={item.campaign_id} id={item.campaign_id} value={item.campaign_id} 
                            onClick={onClick}
                            style={{ textAlign: 'center', cursor: 'pointer'}}>
                                
                            
                                <td> <i className="fas fa-circle" style={{ color: 'green', display: item.status==="Active" ? '' : 'none'}}></i>
                                <i className="fas fa-pause-circle" style={{ color: '', display: item.status==="Paused" ? '' : 'none'}}></i>
                                <i className="fas fa-times-circle" style={{ color: 'red', display: item.status==="Removed" ? '' : 'none'}}></i></td>
                                <td> {item.campaign_name}</td>
                                <td> ${item.campaign_budget}</td>
                                <td> {item.status}</td>
                                <td> {item.campaign_type}</td>
                                <td> {String(item.impressions).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> {String(item.interactions).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> {item.interaction_rate}%</td>
                                <td> ${item.cpc}</td>
                                <td> ${String(item.cost).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> {String(item.conv).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                <td> ${item.cost_per_conv}</td>
                                <td> {item.conv_rate}%</td>
            
                                
                            </tr>
                            
                            )
                    }
                
                })}

            </tbody>
        </table>

        <br/>
        
    </div>
)}

export default EditCampaign;