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

import React, {useState, useEffect, Fragment} from 'react'
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'
import Message from './Message'
import MessageWarning from './MessageWarning'
import MessageError from './MessageErrorNoClose'
import ProgressionTracker from './ProgressionTracker'



const WriteSmartAd = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()

    // store headlines and descriptions recommendations from Google
    const [headlineOne, setHeadlineOne] = useState("")
    const [headlineTwo, setHeadlineTwo] = useState("")
    const [headlineThree, setHeadlineThree] = useState("")

    const [headlineOneCharacters, setHeadlineOneCharacters] = useState(0)
    const [headlineTwoCharacters, setHeadlineTwoCharacters] = useState(0)
    const [headlineThreeCharacters, setHeadlineThreeCharacters] = useState(0)

    const [descOne, setDescOne] = useState("")
    const [descTwo, setDescTwo] = useState("")

    const [descOneCharacters, setDescOneCharacters] = useState(0)
    const [descTwoCharacters, setDescTwoCharacters] = useState(0)

    // store headlines and descriptions edited by users
    const [headlineOneUser, setHeadlineOneUser] = useState("")
    const [headlineTwoUser, setHeadlineTwoUser] = useState("")
    const [headlineThreeUser, setHeadlineThreeUser] = useState("")

    const [headlineOneUserCharacters, setHeadlineOneUserCharacters] = useState(0)
    const [headlineTwoUserCharacters, setHeadlineTwoUserCharacters] = useState(0)
    const [headlineThreeUserCharacters, setHeadlineThreeUserCharacters] = useState(0)

    const [descOneUser, setDescOneUser] = useState("")
    const [descTwoUser, setDescTwoUser] = useState("")

    const [descOneUserCharacters, setDescOneUserCharacters] = useState(0)
    const [descTwoUserCharacters, setDescTwoUserCharacters] = useState(0)

    // store state if already tried to fetch recommendations from api
    const [getRecomm, setGetRecomm] = useState(true)

    // cookies from this step
    const [headline_1, setHeadline_1, removeHeadline_1] = useCookies(['headline_1'])
    const [headline_2, setHeadline_2, removeHeadline_2] = useCookies(['headline_2'])
    const [headline_3, setHeadline_3, removeHeadline_3] = useCookies(['headline_3'])
    const [desc_1, setDesc_1, removeDesc_1] = useCookies(['desc_1'])
    const [desc_2, setDesc_2, removeDesc_2] = useCookies(['desc_2'])

    // cookies that have value to send to the backend to get ad creative recommendations
    const [country_code, setCountry_code, removeCountry_code] = useCookies(['country_code'])
    const [language_code, setLanguage_code, removeLanguage_code] = useCookies(['language_code'])
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    const [business_name, setBusiness_name, removeBusiness_name] = useCookies(['business_name'])
    const [landing_page, setLanding_page, removeLanding_page] = useCookies(['landing_page'])
    const [geo_location, setGeo_location, removeGeo_location] = useCookies(['geo_location'])
    const [keyword_themes, setKeyword_themes, removeKeyword_themes] = useCookies(['keyword_themes'])

    // messages to communicate to users
    const [message, setMessage] = useState('')
    const [messageWarning, setMessageWarning] = useState('')
    const [messageError, setMessageError] = useState('')


    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // set headline 1
    const onChangeHeadlineOne = (e) => {
        removeHeadline_1(['headline_1'])
        setHeadlineOneUser(e.target.value)
        setHeadlineOneUserCharacters(e.target.value.length)}

    // set headline 2
    const onChangeHeadlineTwo = (e) => {
        removeHeadline_2(['headline_2'])
        setHeadlineTwoUser(e.target.value)
        setHeadlineTwoUserCharacters(e.target.value.length)}

    // set headline 3
    const onChangeHeadlineThree = (e) => {
        removeHeadline_3(['headline_3'])
        setHeadlineThreeUser(e.target.value)
        setHeadlineThreeUserCharacters(e.target.value.length)}

    // set description 1
    const onChangeDescOne = (e) => {
        removeDesc_1(['desc_1'])
        setDescOneUser(e.target.value) 
        setDescOneUserCharacters(e.target.value.length)}
    
    // set description 2
    const onChangeDescTwo = (e) => {
        removeDesc_2(['desc_2'])
        setDescTwoUser(e.target.value)
        setDescTwoUserCharacters(e.target.value.length)}

    // get ad creative recommendations (headlines & descriptions)
    useEffect(() => {
        // fetch the recommendations only once
        if(getRecomm) {
            // tell user you are getting recommendations
            setMessage(' Fetching recommendations for you... It can take a few seconds.')

            // data to send to the API
            const data = { 
                'mytoken': token['mytoken'], 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'country_code': country_code['country_code'], 
                'language_code': language_code['language_code'],
                'geo_target_names': JSON.stringify(geo_location['geo_location']),
                'landing_page': landing_page['landing_page'],
                'display_name': JSON.stringify(keyword_themes['keyword_themes']),
                'business_name': business_name['business_name']
            }

            // get recommendations from api
            fetch('http://127.0.0.1:8000/api/get-ad-recommendation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                setGetRecomm(false)
                // set headline values with recommendations
                if (resp.headlines[0]) {
                    console.log(resp.headlines[0])
                    setHeadlineOne(resp.headlines[0]) 
                    setHeadlineOneCharacters(resp.headlines[0].length)
                    }
                if (resp.headlines[1]) {
                    console.log(resp.headlines[1])
                    setHeadlineTwo(resp.headlines[1]) 
                    setHeadlineTwoCharacters(resp.headlines[1].length)
                    }
                if (resp.headlines[2]) {
                    console.log(resp.headlines[2])
                    setHeadlineThree(resp.headlines[2]) 
                    setHeadlineThreeCharacters(resp.headlines[2].length)
                    }
                // set description values with recommendations
                if (resp.descriptions[0]) {
                    console.log(resp.descriptions[0])
                    setDescOne(resp.descriptions[0]) 
                    setDescOneCharacters(resp.descriptions[0].length)
                    }
                if (resp.descriptions[1]) {
                    console.log(resp.descriptions[1])
                    setDescTwo(resp.descriptions[1]) 
                    setDescTwoCharacters(resp.descriptions[1].length)
                    }
                
                }
                )
            .then(resp => {
                if (resp !== null) {
                    setMessage('')
                } else {
                    setMessageWarning('There were no recommendations at this moment.')
                }

                })
            .catch(error => {
                console.log(error)
                setMessage('')
                }
                )

        }
    }, [
        geo_location, country_code, landing_page, 
        customerId, keyword_themes, language_code, 
        refreshToken, token, business_name, headlineOne, getRecomm
        ]
    )


    // when user clicks on 'Next' button
    // take user to set location targets
    const goStep5 = () => {
        if (
            // if required fields are completed
            // or there are cookies of the fields
            // send user to the next step
            // if not, error message 
            (
                (headlineOne.length !== 0) || (headlineOneUser.length !== 0) || (headline_1['headline_1'])
            ) &&
            (
                (headlineTwo.length !== 0) || (headlineTwoUser.length !== 0) || (headline_1['headline_2'])
            ) &&
            (
                (headlineThree.length !== 0) || (headlineThreeUser.length !== 0) || (headline_1['headline_3'])
            ) &&
            (
                (descOne.length !== 0) || (descOneUser.length !== 0) || (desc_1['desc_1'])
            ) &&
            (
                (descTwo.length !== 0) || (descTwoUser.length !== 0) || (desc_1['desc_2'])
            )
        )   { 
                // save values as cookies to use later and send user to next step
                // check if the user edited the recommendations, and if they did
                // take that value to be saved in the cookie

                // headline 1
                if (headlineOneUser) {
                    setHeadline_1("headline_1", headlineOneUser, { encode: String})
                }
                else {
                    setHeadline_1("headline_1", headlineOne, { encode: String})
                }
                // headline 2
                if (headlineTwoUser) {
                    setHeadline_2("headline_2", headlineTwoUser, { encode: String})
                }
                else {
                    setHeadline_2("headline_2", headlineTwo, { encode: String})
                }
                // headline 3
                if (headlineThreeUser) {
                    setHeadline_3("headline_3", headlineThreeUser, { encode: String})
                }
                else {
                    setHeadline_3("headline_3", headlineThree, { encode: String})
                }
                // description 1
                if (descOneUser) {
                    setDesc_1("desc_1", descOneUser, { encode: String})
                }
                else {
                    setDesc_1("desc_1", descOne, { encode: String})
                }
                // description 2
                if (descTwoUser) {
                    setDesc_2("desc_2", descTwoUser, { encode: String})
                }
                else {
                    setDesc_2("desc_2", descTwo, { encode: String})
                }
                
                // send user to the next step
                history.push('/budget');
            } 
        else {
            setMessageError('You need to fill out all fields to continue.')
        }
    }

    // redirect to user to previous step,
    // also used for progression tracker
    const goStep3 = () => {
        history.push('/keyword-themes')}


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create New Campaign
        </h4> 

        <br/>
        
        {/* start of progression tracker */}

        <ProgressionTracker step="step4" />
        
        {/* end of progression tracker */}

        <br/>
        <br/>
        <button type="button" className="btn btn-link" name="go back" 
        onClick={goStep3} 
        style={{ color: 'black' }}>
            <i className="fas fa-arrow-left fa-2x"></i>
        </button>
        <br/>
        <br/>

        <h6 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
            4. Write your ad
        </h6>

        <br/>

        {message ? <Message msg={message} /> : null}
        {messageWarning ? <MessageWarning msg={messageWarning} /> : null}

        <div>
        <p>
            Your headlines are what your customers will focus on. 
            Keep them simple, clear, and related to what they're are searching for.
        </p>
        <p>
            You can edit the recommendations below.
        </p>
        {/* card with ad creative starts here */}
        {/* show ad creative preview if there is a recommendation of ad creative */}
        {/* or when the user inputs the headline 1 */}
        {((headlineOne.length !== 0) || (headlineOneUser.length !== 0)) &&
        <Fragment>
        <label>Ad preview:</label>
        <div className="card">
        <div className="card-body">
            <p className="card-text">
                <strong>Ad</strong> • {landing_page['landing_page']}
            </p>
            <p className="card-text" 
            style={{fontSize:'20px', color:'rgb(71,17,209)'}}>
                <strong>
                {headlineOneUser ? headlineOneUser : headlineOne} | {headlineTwoUser ? headlineTwoUser : headlineTwo} | {headlineThreeUser ? headlineThreeUser : headlineThree}
                </strong>
            </p>
            <p className="card-text" style={{fontSize:'16px'}}>
            {descOneUser ? descOneUser : descOne} {descTwoUser ? descTwoUser : descTwo}
            </p>
        </div>
    </div>
    <br/>
    <br/>
    </Fragment>}
        {/* card with ad creative ends here */}
            <label>Headline 1</label>
            <br/>
            <textarea className="form-control" placeholder="Enter first headline for your ad..." 
            id="headline_1" rows="1" maxLength="30"
            onChange={onChangeHeadlineOne} 
            value={headlineOneUser ? headlineOneUser : headlineOne}></textarea>
            <small className="form-text text-muted">
                {headlineOneUserCharacters ? 
                headlineOneUserCharacters : 
                headlineOneCharacters}/30 characters.
            </small>
            <br/>
            <br/>

            <label>Headline 2</label>
            <br/>
            <textarea className="form-control" placeholder="Enter second headline for your ad..." 
            id="headline_2" rows="1" maxLength="30"
            onChange={onChangeHeadlineTwo} 
            value={headlineTwoUser ? headlineTwoUser : headlineTwo}></textarea>
            <small className="form-text text-muted">
                {headlineTwoUserCharacters ? 
                headlineTwoUserCharacters : 
                headlineTwoCharacters}/30 characters.
            </small>
            <br/>
            <br/>

            <label>Headline 3</label>
            <br/>
            <textarea className="form-control" placeholder="Enter third headline for your ad..." 
            id="headline_3" rows="1" maxLength="30"
            onChange={onChangeHeadlineThree} 
            value={headlineThreeUser ? headlineThreeUser : headlineThree}></textarea>
            <small className="form-text text-muted">
                {headlineThreeUserCharacters ? 
                headlineThreeUserCharacters : 
                headlineThreeCharacters}/30 characters.
            </small>
            <br/>
            <br/>
            <br/>
            
        <p>Your descriptions should highlight what sets you apart from your competition. 
            Check spelling and grammar.
        </p>
            <label>Description 1</label>
            <br/>
            <textarea className="form-control" placeholder="Enter first description for your ad..." 
            id="desc_1" rows="2" maxLength="90"
            onChange={onChangeDescOne} 
            value={descOneUser ? descOneUser : descOne}></textarea>
            <small className="form-text text-muted">
                {descOneUserCharacters ? 
                descOneUserCharacters : 
                descOneCharacters}/90 characters.
            </small>
            <br/>
            <br/>

            <label>Description 2</label>
            <br/>
            <textarea className="form-control" placeholder="Enter second description for your ad..." 
            id="desc_2" rows="2" maxLength="90"
            onChange={onChangeDescTwo} 
            value={descTwoUser ? descTwoUser : descTwo}></textarea>
            <small className="form-text text-muted">
                {descTwoUserCharacters ? 
                descTwoUserCharacters : 
                descTwoCharacters}/90 characters.
            </small>
            <br/>
            <br/>

            
            
        </div>
        {messageError ? <MessageError msg={messageError} /> : null}
        <div className="container" align="left">
            
            <div className="row">
                    <div className="col">

                        <button type="button" onClick={goStep3} 
                        className="btn btn-outline-primary btn-block" 
                        style={{margin:'10px'}}>Back
                        </button>
                
                    </div>

                    <div className="col" align="right">

                        <button type="button" onClick={goStep5} 
                        className="btn btn-primary btn-block"  
                        style={{margin:'10px'}}>
                            Next
                        </button>
                
                    </div>
            </div>
        </div>
        <br/>
        <br/>
        
        <br/>
        
    </div>
)}

export default WriteSmartAd;