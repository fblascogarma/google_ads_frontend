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
// import MessageError from './MessageError';
import MessageWarning from './MessageWarning';
import MessageSuccess from './MessageSuccess';

const CreateAccount = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()

    // to save the customer id of the account created as a cookie
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    // const [customer_id, setCustomer_id] = useState('')
  
    const [message, setMessage] = useState('')
    const [messageWarning, setMessageWarning] = useState('')
    const [messageSuccess, setMessageSuccess] = useState('')


    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])


    // store account name selected by user
    const [account_name, setAccount_name] = useState('')

    // set account name
    const onChangeAccountName = (e) => {
        setAccount_name(e.target.value)}

    // store account name selected by user
    const [email, setEmail] = useState('')

    // set account name
    const onChangeEmail = (e) => {
        setEmail(e.target.value)}
    
    // store currency selected by user
    const [currency, setCurrency] = useState('USD')

    // set currency code for currency
    const onChangeCurrency = (e) => {
        setCurrency(e.target.value)}

    // store time zone selected by user
    const [time_zone, setTime_zone] = useState('America/New_York')

    // set time zone code for time zone
    const onChangeTimeZone = (e) => {
        setTime_zone(e.target.value)
    }

            
    // create new Google Ads account (client, not manager)
    const createAdsAccount = () => {

        // tell user the account is being created
        setMessage(' We are creating your Google Ads account. It may take a few seconds.')

        // data to send to the backend to create account
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'mytoken': token['mytoken'], 
            'customer_id': customerId['customerID'],
            'account_name': account_name, 
            'email_address': email, 
            'currency': currency, 
            'time_zone': time_zone
        }

        fetch('http://127.0.0.1:8000/api/create-account/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            // .then(resp => console.log(resp))
            .then(resp => {
                setCustomerId("customerID", resp, { encode: String});
                // setCustomer_id(customerId);
                setMessage('');
                setMessageSuccess('Congratulations! You  have created a Google Ads account.')
            })
            .catch(error => {
                console.log(error);
                setMessage('');
                setMessageWarning('Failed to create account. Please try again')
            })
        
    }


    const goReporting = () => {
        history.push('/campaigns')
    }


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create Google Ads Accounts
        </h4> 

        <br/>
        {/* if account creation was successful */}
        {messageSuccess ? 
            <Fragment>
                
                <MessageSuccess msg="Congratulations! You  have created a Google Ads account." />

                <br/>
                <br/>
                <p>
                One more step to go. 
                Check for an email with the subject 
                <strong> "You received an invitation to access a Google Ads account", </strong>
                and accept the invitation. 
                </p>
                <br/>
                <p>When you finish, close that window so you come back here 
                    and get started.
                </p>
                <br/>
                <br/>
                <button onClick={goReporting} className="btn btn-success">START</button>

            </Fragment> :
            // if user didn't clicked on Create account yet
            <Fragment>
                <label>Account name</label>
                <textarea className="form-control" placeholder="Enter account name..." id="account_name" rows="1" maxLength="1000"
                onChange={onChangeAccountName} 
                value={account_name}></textarea>
                <br/>
                {/* this can be prepopulated if you have the info from user */}
                <label>Enter your email</label>
                <textarea className="form-control" placeholder="Enter email..." id="email" rows="1" maxLength="1000"
                onChange={onChangeEmail} 
                value={email}></textarea>
                <br/>
                <label>Select currency</label>
                <select className="form-select form-select" onChange={onChangeCurrency} 
                value={currency} 
                aria-label="Choose currency for your account">
                    <option value="USD">US Dollars</option>
                    <option value="ARS">Argentine Peso</option>
                    <option value="BRL">Brazilian Real</option>
                </select>
                <br/>
                <label>Select time zone</label>
                <select className="form-select form-select" onChange={onChangeTimeZone} 
                value={time_zone} 
                aria-label="Choose the time zone for your account">
                    <option value="America/New_York">US East Coast</option>
                    <option value="America/Los_Angeles">US West Coast</option>
                    <option value="America/Argentina/Buenos_Aires">Argentina</option>
                </select>
                <br/>
                {message && <Message msg={message} />}
                {messageWarning && <MessageWarning msg="Failed to create account. Please try again" />}
                {messageSuccess && <MessageSuccess msg={messageSuccess} />}
                <br/>
                <button onClick={createAdsAccount} className="btn btn-success">CREATE</button>

            </Fragment> 
        }
        
        
    </div>
)}

export default CreateAccount;