import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

const GoogleAds = () => {

    const [Url, setUrl] = useState('')
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
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
            // console.log(text);
            // use a cookie to store the refresh token value
            // text contains the refresh token value
            // need to add the encode function because the default will encode to url
            setRefreshToken('refreshToken', text, { encode: String})
            
            // redirect user to the accessible accounts page
            history.push('/googleads/accounts')
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



    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Welcome to Google Ads!
        </h4> 

        <p>Please connect your Google Ads account. 
            <br/>
            <br/>
            When you click, you will be redirected to Google so you can 
            authenticate yourself and give us permission to manage your AdWords campaigns.
            You will be redirected back here.
        </p>

        {Url && <p>Redirecting you to {Url}</p>}
        

        <div className="container" align="center">
            
                <div className="col-4">
                    <button onClick={authenticateGoogle} className="btn btn-success">Connect to Google Ads</button>
                </div>
            
        </div>

        <br/>
        <br/>
        <p>If you already connected to Google Ads, get the list of possible accounts to choose from.</p>

        <div className="container" align="center">
            
                <Link to="/googleads/accounts">
                    <button type="button" className="btn btn-success" style={{margin:'10px'}}>Get list of accounts</button>
                </Link>
            
        </div>

        <br/>
        <br/>
        
    </div>
)}

export default GoogleAds;