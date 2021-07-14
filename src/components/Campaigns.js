import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';




const Campaigns = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()
    const [accountInfo, setAccountInfo] = useState([])

    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // if there is a refresh token in the cookies
    // send it to the backend with the mytoken
    // where they will be used to get the list of accounts associated with those tokens
    useEffect(() => {
        if(refreshToken) {
            
            // data to send to the backend
            const data = { 'mytoken': token['mytoken'], 'refreshToken': refreshToken['refreshToken']}

            fetch('http://127.0.0.1:8000/api/get-accounts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => setAccountInfo(resp))
            .catch(error => console.log(error))
           
            
        }
    }, [token, history, refreshToken, setRefreshToken])

    const onClick = () => {

        history.push('/googleads/accounts/campaigns')

    }


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Google Ads Accounts
        </h4> 

        <br/>
        <p>Please select the Google Ads account you want to manage.</p>

        <br/>
        <br/>

        <table className="table table-bordered table-hover table-responsive">
            <thead className="thead-light" style={{backgroundColor: 'rgb(248,172,6)'}}>
                <tr key="accounts_table" style={{ textAlign: 'center', verticalAlign: 'top'}}>
                    
                    <th key="customer_id" scope="col">CUSTOMER ID</th>
                    <th key="description" scope="col">DESCRIPTION</th>
                    <th key="time_zone" scope="col">TIME ZONE</th>
                    <th key="currency" scope="col">CURRENCY</th>
                    <th key="account_type" scope="col">ACCOUNT TYPE</th>
                </tr>
            </thead>
           
            <tbody>
                {accountInfo.map(item => {
                return(
                    
                <tr key={item.customer_id} onClick={onClick} style={{ textAlign: 'center', cursor: 'pointer'}}>
                    
                
                    <td key={item.customer_id}> {item.customer_id}</td>
                    <td key={item.description}> {item.description}</td>
                    <td key={item.time_zone}> {item.time_zone}</td>
                    <td key={item.currency}> {item.currency}</td>
                    <td key={item.account_type}> {item.account_type}</td>

                    
                </tr>
                
                )
                })}

            </tbody>
        </table>

        <br/>
        
    </div>
)}

export default Campaigns;