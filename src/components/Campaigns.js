import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';




const Campaigns = () => {

    const [Url, setUrl] = useState('')
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()
    const [accounts, setAccounts] = useState('')
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



    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Campaigns
        </h4> 

        <p>See a summary of all your campaigns. 
            Please select a campaign to see more details.
        </p>

        <br/>
        <br/>

        <table className="table table-bordered table-hover table-responsive">
            <thead className="thead-light" style={{backgroundColor: 'rgb(248,172,6)'}}>
                <tr style={{ textAlign: 'center', verticalAlign: 'top'}}>
                    
                    <th scope="col">CUSTOMER ID</th>
                    <th scope="col">DESCRIPTION</th>
                    <th scope="col">TIME ZONE</th>
                    <th scope="col">CURRENCY</th>
                    <th scope="col">ACCOUNT TYPE</th>
                </tr>
            </thead>
            <tbody>
            {accountInfo.map(item => {
            return(
            <tr key={item.id} style={{ textAlign: 'center'}}>
              
                <td> {item.customer_id}</td>
                <td> {item.description}</td>
                <td> {item.time_zone}</td>
                <td> {item.currency}</td>
                <td> {item.account_type}</td>
            </tr>
            )
        })}

            </tbody>
        </table>

        <br/>
        
    </div>
)}

export default Campaigns;