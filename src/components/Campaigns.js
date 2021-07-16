import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';




const Campaigns = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()
    const [campaignInfo, setCampaignInfo] = useState([])
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    const [toggle, setToggle] = useState(false)
    const onClickToggle = () => setToggle(toggle => !toggle)


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
            
            // data to send to the backend
            const data = { 'refreshToken': refreshToken['refreshToken'], 'customer_id': customerId['customerID']}

            fetch('http://127.0.0.1:8000/api/get-campaigns/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => setCampaignInfo(resp))
            .catch(error => console.log(error))
           
            
        }
    }, [customerId, refreshToken, token])

    // const onClick = () => {

    //     history.push('/googleads/accounts/campaigns')

    // }


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Campaigns
        </h4> 

        <br/>
        <p>Please select the campaign that you want to see in further detail.</p>

        <br/>
        <br/>
        <p>Filters:</p>
       
        <div className="btn-group">
            
            <button type="button" onClick={onClickToggle} className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Campaign status
            </button>
                
                <ul className="dropdown-menu" style={{ display: toggle ? '' : 'none'}}>
                    <li><a className="dropdown-item" href="/#">All</a></li>
                    <li><a className="dropdown-item" href="/#">All enabled</a></li>
                    <li><a className="dropdown-item" href="/#">All but removed</a></li>
                </ul>
                
        </div>
        <br/>
        <br/>

        <table className="table table-bordered table-hover table-responsive">
            <thead className="thead-light" style={{backgroundColor: 'rgb(248,172,6)'}}>
                <tr key="accounts_table" style={{ textAlign: 'center', verticalAlign: 'top'}}>
                    
                    <th key="campaign_name" scope="col">Campaign</th>
                    <th key="budget" scope="col">Budget</th>
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
                {campaignInfo.map(item => {
                return(
                    
                <tr key={item.campaign_id} style={{ textAlign: 'center', cursor: 'pointer'}}>
                    
                
                    <td> {item.campaign_name}</td>
                    <td> {item.campaign_budget}</td>
                    <td> {item.status}</td>
                    <td> {item.campaign_type}</td>
                    <td> {item.impressions}</td>
                    <td> {item.interactions}</td>
                    <td> {item.interaction_rate}</td>
                    <td> {item.cpc}</td>
                    <td> {item.cost}</td>
                    <td> {item.conv}</td>
                    <td> {item.cost_per_conv}</td>
                    <td> {item.conv_rate}</td>

                    
                </tr>
                
                )
                })}

            </tbody>
        </table>

        <br/>
        
    </div>
)}

export default Campaigns;