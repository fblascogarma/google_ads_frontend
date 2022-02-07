// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, {useState, useEffect, Fragment} from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import Message from './Message';
import MessageError from './MessageError';

const AccessibleCustomers = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()
    const [accountInfo, setAccountInfo] = useState([])
    const [customerID, setCustomerID] = useState('')
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    const [Url, setUrl] = useState('')
    const [message, setMessage] = useState(' Fetching your data... It will take a few seconds.')
    const [messageError, setMessageError] = useState('')


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

            // tell user you are fetching their data
            setMessage(' Fetching your data... It can take a few seconds.');
            
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
            .catch(error => {
                console.log(error);
                setMessage('');
                setMessageError('During testing, refresh tokens expire. Please reconnect to Google Ads')})
            
              
        }
    }, [token, history, refreshToken, setRefreshToken])

    // if accountInfo object has data, delete the 'fetching data' message
    useEffect(() => {
        if(accountInfo.length > 0) {
            setMessage('')
        }
    }, [accountInfo])

    // when user clicks on a row, the customer_id will be saved as a cookie
    // to be used for the session, and they will be redirected 
    // to the page of campaigns info for that customer
    const onClick = e => {
        const cusID = e.currentTarget.id
        setCustomerId("customerID", cusID);
        history.push('/googleads/accounts/campaigns');

    }

    // if user tries to select a Manager account to see campaign details
    // show an error message saying that is not possible
    // and indicate how to proceed
    const onClickManager = e => {
        setMessageError('Metrics cannot be requested for a manager account. To retrieve metrics, select a client account.')

    }

    // when user clicks the 'Reconnect to Google' button
    // this is in case the refresh token is now working anymore
    // and user has to get another one
    const authenticateGoogle = () => {
        fetch('http://127.0.0.1:8000/api/connect/', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            }
        })
        .then(function(response) {    
            return response.text();
        })
        .then(function(text) {
            console.log(text);
            setUrl(text);
        })
        .catch(error => console.log(error))

    }

    // if Url has a value, redirect user to that url
    // that is the url where the user will authenticate in Google and authorize your app
    useEffect(() => {
        if(Url) {
           
            window.location.href = Url;
        }
    }, [Url])

    // create new Google Ads account (client, not manager)
    const createAccount = () => {
        history.push('/googleads/accounts/create')
    }


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Google Ads Accounts
        </h4> 

        <br/>
        <p>Please select the account you want to manage. 
            If you want to see how your campaigns are performing or create/edit campaigns, 
            select the Client account that has those campaigns.
        </p>

        <br/>

        {message ? <Message msg={message} /> : null}
        {messageError ? 
        <Fragment>
            <MessageError msg={messageError} />
            <div className="container" align="left">
                <div className="col-6">
                    <button onClick={authenticateGoogle} className="btn btn-success btn-sm">
                        Reconnect to Google Ads
                    </button>
                </div>
            </div>
            <br/>

        </Fragment> 
        : null}

        <br/>
        <button onClick={createAccount} className="btn btn-success">Create account</button>

        <br/>
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
                    
                <tr key={item.customer_id} 
                onClick={item.account_type === 'Client' ? onClick : onClickManager} 
                id={item.customer_id} value={item.customer_id} 
                style={{ textAlign: 'center', cursor: 'pointer'}}>
                    
                
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

export default AccessibleCustomers;