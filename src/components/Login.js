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
            {isLogin ? <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>Login to your account</h4> 
            : <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>Create your account</h4>}

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
            : <button onClick={registerBtn} className="btn btn-primary">Signup</button>}

            <div className="mb-3">
                <br/>
                {isLogin ? <p font="gotham-rounded-bold">Don't have an account? <button className="btn btn-outline-primary" onClick={() => setLogin(false)}>Signup here</button></p>
                : <p font="gotham-rounded-bold">If You Have An Account, Please <button className="btn btn-outline-primary" onClick={() => setLogin(true)}>Login here</button> </p>
                }
            </div>

        </div>
    )
}

export default Login