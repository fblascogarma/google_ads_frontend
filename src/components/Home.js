import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

const Home = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()



    // grab query string
    const queryString = window.location.search;

    // parse que query string's parameters
    const urlParams = new URLSearchParams(queryString)

    // get the code that is the access code of user after authenticating and authorizing permission
    const google_access_code = urlParams.get('code')
    console.log(google_access_code)

    // get the state that is the anti-forgery state token
    const state = urlParams.get('state')
    console.log(state)

    // if there is a code in the parameter of the url
    // send it to the backend with the state
    // where they will be used to get the refresh token
    useEffect(() => {
        if(google_access_code) {
            
            // data to send to the backend
            const data = { 'mytoken': token['mytoken'], 'google_access_code': google_access_code, 'passthrough_val': state}

            fetch('http://127.0.0.1:8000/api/get-token/', {
                method: 'POST',
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
                
                // use a cookie to store the refresh token value
                // text contains the refresh token value
                // need to add the encode function because the default will encode to url
                setRefreshToken('refreshToken', text, { encode: String})
                
                // redirect user to the accessible accounts page
                history.push('/googleads/accounts')

            })
            .catch(error => console.log(error))
            
        }
    }, [token, google_access_code, state, history, setRefreshToken])

    return (
        
    <div className="container mt-4">
        
        <br/>
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create marketing campaigns on Google!
        </h4>

        <br/>
        <br/>
        <p className="mb-0" font="gotham-rounded-bold" align="center" style={{color:'black', fontSize:'20px'}}>
        FranAds is a free app that that will <strong style={{color:'rgb(248,172,6)'}} >help you promote your business </strong>on Google Search, 
        Google Maps, YouTube, Gmail, and Google partner websites.
        </p>

        <br/>
        <br/>
        
        <div className='mt-4' align="center">
            <br></br>
            <Link to="/login">
                <button type="button" className="btn btn-primary btn-block" style={{margin:'10px'}}>START</button>
            </Link>
            <Link to="/learnmore">
            <button type="button" className="btn btn-outline-primary btn-block" style={{margin:'10px'}}>LEARN MORE</button>
            </Link>
        </div>
        
    </div>
)}

export default Home;