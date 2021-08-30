import React, {useState, useEffect, Fragment} from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import Message from './Message';
// import MessageError from './MessageError';
// import MessageWarning from './MessageWarning';
import MessageSuccess from './MessageSuccess';




const CreateAccount = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()
    // const [messageError, setMessageError] = useState('')
    // const [messageWarning, setMessageWarning] = useState('')
    // const [messageSuccess, setMessageSuccess] = useState('')
    const [message, setMessage] = useState('')


    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // store if account created
    // so user sees another window
    // const [isCreated, setIsCreated] = useState(true)


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

    // set currency code for phone number
    const onChangeCurrency = (e) => {
        setCurrency(e.target.value)}

    // store time zone selected by user
    const [time_zone, setTime_zone] = useState('America/New_York')

    // set time zone code for phone number
    const onChangeTimeZone = (e) => {
        setTime_zone(e.target.value)
    }

    // store customer_id created by Fran Ads
    const [client_id, setClient_id] = useState('')

    

            
    // create new Google Ads account (client, not manager)
    const createAccount = () => {

        // tell user the account is being created
        setMessage(' We are creating your Google Ads account. It may take a few seconds.')

        // data to send to the backend to create account
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
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
            .then(resp => setClient_id(resp))
            .catch(error => console.log(error))
        
    }

    const goAccountsList = () => {
        history.push('/googleads/accounts')
    }


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create Google Ads Accounts
        </h4> 

        <br/>
        {/* if user clicked on Create */}
        {client_id ? 
        <Fragment>
            {/* if account creation was successful */}
            {client_id !== 'bad request' ? 
            <Fragment>
                <MessageSuccess msg="Congratulations! You  have created a Google Ads account." />
                <p>
                Your customer id for Google Ads is {client_id}. 
                </p>
                <p>
                One more step to go. 
                Check for an email with the subject 
                "You received an invitation to access a Google Ads account", 
                and accept the invitation. 
                </p>
                <p>When you finish, close that window so you come back here 
                    and get information of your account.
                </p>
            </Fragment> : 
            <Fragment>
                {/* if account creation was not successful */}
                <p>We could not create your account. Please try again or reach out to us.
                </p>

            </Fragment>
            }
    
        <br/>
        <br/>
        <button onClick={goAccountsList} className="btn btn-success">Account information</button>
        
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
            <br/>
            <button onClick={createAccount} className="btn btn-success">Create</button>

        </Fragment> 
        }
        
        
    </div>
)}

export default CreateAccount;