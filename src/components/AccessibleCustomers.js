import React, {useState, useEffect} from 'react';
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
            setMessage(' Fetching your data... It will take a few seconds.');
            
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
        // console.log(cusID)
        setCustomerId("customerID", cusID);
        history.push('/googleads/accounts/campaigns');

    }

    // if user tries to select a Manager account to see campaign details
    // show an error message saying that is not possible
    // and indicate how to proceed
    const onClickManager = e => {
        setMessageError('Metrics cannot be requested for a manager account. To retrieve metrics, select a client account.')

    }

    // when user clicks the 'Re-connect to Google' button
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


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Google Ads Accounts
        </h4> 

        <br/>
        <p>Please select the Google Ads account you want to manage.</p>

        <br/>

        {message ? <Message msg={message} /> : null}
        {messageError ? <MessageError msg={messageError} /> : null}

        <div className="container" align="left">
            
                <div className="col-6">
                    <button onClick={authenticateGoogle} className="btn btn-success btn-sm">Re-connect to Google Ads</button>
                </div>
            
        </div>

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
                    
                <tr key={item.customer_id} onClick={item.account_type === 'Client' ? onClick : onClickManager} id={item.customer_id} value={item.customer_id} style={{ textAlign: 'center', cursor: 'pointer'}}>
                    
                
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