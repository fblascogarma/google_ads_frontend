import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

const GoogleAds = () => {

    const [Url, setUrl] = useState('')
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    let history = useHistory()


    // if there is no mytoken in the cookie, redirect user to the login page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // check to see if user has a refresh token for Google
    // and if so, save it as a cookie
    // and redirect user to the '/googleads/accounts' page
    useEffect(() => {
        if(!refreshToken['refreshToken']) {
            const data = { 'mytoken': token['mytoken']}

            fetch('http://127.0.0.1:8000/api/lookup-refreshtoken/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
        })
        .then(function(response) {    
            return response.text();
        })
        .then(function(text) {
            let isnum = /^\d+$/.test(text);
            // check if value from backend is the customer id or refresh token
            // by checking if the response is all digits, which means is customer id
            if (isnum) {
                // save it as a cookie
                setCustomerId('customerID', text, { encode: String})

                // redirect user to the reporting page
                history.push('/googleads/accounts/campaigns')

            } else {
                // use a cookie to store the refresh token value
                // text contains the refresh token value
                // need to add the encode function because the default will encode to url
                setRefreshToken('refreshToken', text, { encode: String})
                
                // redirect user to the accessible accounts page
                history.push('/googleads/accounts')

            }
            
        })
        .catch(error => console.log(error))
            
        }
        
    }, [refreshToken, token, history, setRefreshToken])


    // if user has a refresh token saved as a cookie,
    // redirect user to the Accounts page
    useEffect(() => {
        if(refreshToken['refreshToken']) {
            history.push('/googleads/accounts')

        }
    }, [refreshToken, history])


    // when user clicks the 'Connect to Google' button
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
    .   catch(error => console.log(error))

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
        
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Welcome to Google Ads!
        </h4>

        <br/>
        <br/>

        {/* If user already has a Google Ads account */}
        <div className="row">
            <div className="col-sm-6">
                <div className="card" style={{width: '18rem'}} >
                    <img className="card-img-top" src="connect-to-google-ads.jpeg" 
                    alt="Already have Google Ads account?" 
                    style={{borderBottom: '1px solid gray'}}/>
                    <div className="card-body bg-light">
                        <h5 className="card-title">Connect to Google Ads</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Already have an account?</h6>
                        <br/>
                        <p className="card-text">
                            Connect your account and  
                            manage it from our app!  
                            
                        </p>
                        <p className="card-text"> 
                            {/* make clarification below because OAuth scope uses the word Adwords which can create unnecessary friction */}
                            When giving us permission to connect to your account, 
                            you will see that Google uses Adwords to refer to Google Ads.
                        </p>
                        <p className="card-text">
                            You can disconnect your account anytime you want.
                        </p>
                        <br/>
                        <button onClick={authenticateGoogle} className="btn btn-success">CONNECT</button>
                    </div>
                </div> 
            </div>

            {/* If user does not have a Google Ads account */}
            <div className="col-sm-6">
                <div className="card" style={{width: '18rem'}} >
                    <img className="card-img-top" src="google-ads-logo.png" 
                    alt="Need to create a Google Ads account?" 
                    style={{borderBottom: '1px solid gray'}} />
                    <div className="card-body bg-light">
                        <h5 className="card-title">Create a Google Ads account</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Don't have an account?</h6>
                        <br/>
                        <p className="card-text">
                            Don't worry! We can create one for you.
                        </p>
                        <p className="card-text">
                            You will need to select an account name, your email, 
                            the currency you want to use, 
                            and the time zone.
                        </p>
                        <br/>
                        <br/>
                        <br/>
                        <button onClick={createAccount} className="btn btn-success">CREATE</button>
                    </div>
                </div>
            </div>
        </div>

        {Url && <p>Redirecting you to {Url}</p>}

        <br/>
        <br/>
        
    </div>
)}

export default GoogleAds;