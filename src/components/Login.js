import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState(true)
    let history = useHistory()

    // if user has token, redirect user to googleads page
    useEffect (() => {
        if(token['mytoken']) {
            history.push('/googleads')
        }
    }, [token, history])
    
    const loginBtn = () => {
        APIService.LoginUser({username, password})
        .then(resp => setToken('mytoken', resp.token))
        .catch(error => console.log(error))

    }

    const registerBtn = () => {
        APIService.RegisterUser({username, password})
        .then(() => loginBtn())
        .catch(error => console.log(error))
    }


    return (
        <div>
            <br/>
            {isLogin ? <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>Sign in to your account</h4> 
            : <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>Create your account</h4>}

            <div className="mb-3">

                <label htmlFor="username" className= "form-label" font="gotham-rounded-bold">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Please Enter Username" 
                value={username} onChange= {e => setUsername(e.target.value)} />
            </div>

            <div className="mb-3">

                <label htmlFor="password" className= "form-label" font="gotham-rounded-bold">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Please Enter Password" 
                value={password} onChange= {e => setPassword(e.target.value)}/>
            </div>

            {isLogin ? <button onClick={loginBtn} className="btn btn-primary">Login</button>
            : <button onClick={registerBtn} className="btn btn-primary">Register</button>}

            <div className="mb-3">
                <br/>
                {isLogin ? <p font="gotham-rounded-bold">Don't have an account? <button className="btn btn-outline-primary" onClick={() => setLogin(false)}>Register here</button></p>
                : <p font="gotham-rounded-bold">If You Have An Account, Please <button className="btn btn-outline-primary" onClick={() => setLogin(true)}>Login here</button> </p>
                }
            </div>

        </div>
    )
}

export default Login