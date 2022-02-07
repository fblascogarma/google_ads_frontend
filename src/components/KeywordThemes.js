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
import MessageWarning from './MessageWarning';
import ProgressionTracker from './ProgressionTracker';


const KeywordThemes = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()
  
    // cookies that have value to send to the backend to get keyword themes recommendations
    const [country_code, setCountry_code, removeCountry_code] = useCookies(['country_code'])
    const [language_code, setLanguage_code, removeLanguage_code] = useCookies(['language_code'])
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    const [business_name, setBusiness_name, removeBusiness_name] = useCookies(['business_name'])
    const [landing_page, setLanding_page, removeLanding_page] = useCookies(['landing_page'])
    const [geo_location, setGeo_location, removeGeo_location] = useCookies(['geo_location'])

    // alert messages to give feedback to users
    const [message, setMessage] = useState('')
    const [messageWarning, setMessageWarning] = useState('')
    const [messageWarning2, setMessageWarning2] = useState('')
    // warning message if user tries to go to next step without having selected at least 1 keyword theme
    const [messageWarning3, setMessageWarning3] = useState('')

    // cookie to save the selected keyword themes
    const [keyword_themes, setKeyword_themes, removeKeyword_themes] = useCookies(['keyword_themes'])


    // keyword themes state management
    const [keywordOne, setKeywordOne] = useState("")

    // to display number of characters for each keyword theme
    const [keywordOneCharacters, setKeywordOneCharacters] = useState(0)

    // capture the keyword themes suggestions sent by Google's API
    const [keywordSuggestions, setKeywordSuggestions] = useState([])

    
    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // Manage state of keyword definition component so it shows when user clicks it
    const [defKeywords, setDefKeywords] = useState(false)
    const showDefKeywords = () => setDefKeywords(defKeywords ? false : true)

    // Component that has definition of keywords
    const DefinitionKeywords = () => (
        
        <div className="card">
            <div className="card-body">
                <p>Keywords are words or phrases describing your product or service,  
                and Google uses these to show your ads to people based on the 
                similarity between your keywords and the person's search terms. 
                </p>
            </div>
        </div>
        
    )

    // Manage state of keyword themes definition component so it shows when user clicks it
    const [defKeyThemes, setDefKeyThemes] = useState(false)
    const showDefKeyThemes = () => setDefKeyThemes(defKeyThemes ? false : true)

    // Component that has definition of keyword themes
    const DefinitionKeyThemes = () => (
        
        <div className="card">
            <div className="card-body">
                <p>A single category of keywords represents 
                multiple similar words and phrases. For instance, 
                the category "bakery" makes your ad eligible to show when 
                people search for "bakery near me", "local bakery", and "cake shop".
                </p>

                <p>You will select categories that best represent 
                    your product or service, and Google will find you 
                    the best keywords to achieve your marketing goals.
                </p>
            </div>
        </div>
        
    )

    

    // set first keyword theme
    const onChangeKeywordOne = (e) => {
        setKeywordOne(e.target.value);
        setKeywordOneCharacters(e.target.value.length)
    }

    // function to transform user's keyword input into title case
    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }


    // data to send to Google to get keyword theme recommendations
    const data = { 'refreshToken': refreshToken['refreshToken'], 
    'keyword_text': keywordOne, 
    'country_code': country_code['country_code'], 
    'language_code': language_code['language_code'],
    'customer_id': customerId['customerID'],
    'final_url': landing_page['landing_page'],
    'business_name': business_name['business_name'],
    'geo_target_names': JSON.stringify(geo_location['geo_location']),
    }
    
    
    // get keyword themes suggestions from API
    const keywordThemesSuggestions = () => {
        // if there was a warning message, remove it
        setMessageWarning('');
        setMessageWarning2('');
        setMessageWarning3('');
        // tell user it can take a few seconds to show results
        setMessage(' Fetching your data... It can take a few seconds.');

        // if keyword theme is already selected, do not add it again to the object
        if ((selectedKeywordThemes.indexOf(toTitleCase(keywordOne)) === -1) && 
        keywordOneCharacters > 0 && 
        selectedKeywordThemes.length < 7) {
            setSelectedKeywordThemes([...selectedKeywordThemes, toTitleCase(keywordOne)])
        } else if (selectedKeywordThemes.length > 6) {
            setMessageWarning2('Remove one category to add this one.');
        }
        console.log(data)

        fetch('http://127.0.0.1:8000/api/keywords-recommendations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(setMessage(''))
        .then(resp => {
            // console.log(resp)
            if (resp.length > 0) {
                setKeywordSuggestions(resp)
            } else if (resp.length === 0) {
                setMessageWarning('Please try again. No recommendations for that category.')
            }
        })
        .catch(error => console.log(error))

    }


    // store the keyword themes suggestions that the user selects
    const [selectedKeywordThemes, setSelectedKeywordThemes] = useState([])
    // add the keyword themes selected from the suggestions
    const addSelectedKeyTheme = (e) => {
        if (selectedKeywordThemes.length < 7) {
            // add it to the selected array
            setSelectedKeywordThemes([...selectedKeywordThemes, e.currentTarget.value]);
            // remove it from the suggestion array
            const itemToRemove = e.currentTarget.value
            const newArray = keywordSuggestions.filter(el => el !== itemToRemove);
            setKeywordSuggestions(newArray);
        } else {setMessageWarning('Remove selected categories to add new ones.')}
        
    }
    
    // remove the keyword themes from the selection
    const removeSelectedKeyTheme = (e) => {
        // remove it from the selected array
        const itemToRemove = e.currentTarget.value
        const newArray = selectedKeywordThemes.filter(el => el !== itemToRemove)
        setSelectedKeywordThemes(newArray)
        // add it again to the suggestion array
        setKeywordSuggestions([...keywordSuggestions, itemToRemove])
    }

    // if selectedKeywordThemes object has data, delete the 'fetching data' message
    // and warning message
    useEffect(() => {
        // for the first time, scroll down to show recommendations
        if(selectedKeywordThemes.length === 1) {
            setMessage('');
            setMessageWarning('');
            window.scrollTo(0, 500);

            // for the rest of the times, do not scroll the window
        } else if (selectedKeywordThemes.length > 1) {
            setMessage('');
            setMessageWarning('');
        }
    }, [selectedKeywordThemes]) 
    
    // if keywordSuggestions object has data, delete the 'fetching data' message
    useEffect(() => {
        keywordSuggestions && setMessage('')
    }, [keywordSuggestions])

    // if there are keyword themes saved as a cookie, store them in the selectedKeywordThemes object
    // possible use case: if user is in step 4 or 5 and goes back to this step 3
    useEffect(() => {
        if(keyword_themes['keyword_themes']) {
            setSelectedKeywordThemes(keyword_themes['keyword_themes'])
        }
    }, [keyword_themes])

    // redirect to step 4 of campaign creation
    // when user clicks on 'Next' button
    const goStep4 = () => {
        if (selectedKeywordThemes.length > 0) {
            // save the selected keyword themes as cookies
            setKeyword_themes("keyword_themes", selectedKeywordThemes, { encode: String})

            // and send user to the next step
            history.push('/googleads/write-smart-ad')

            } else (setMessageWarning3('Please select at least one category of keywords to go to the next setp.'))
        }

    // redirect to user to previous or next step,
    // also used for progression tracker
    const goStep2 = () => {
        history.push('/googleads/campaigns/location')}


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create New Campaign
        </h4> 

        <br/>

        <ProgressionTracker step="step3" />
        
        <br/>
        <br/>

        <button type="button" className="btn btn-link" name="go back" 
        onClick={goStep2} 
        style={{ color: 'black' }}>
            <i className="fas fa-arrow-left fa-2x"></i>
        </button>
        <br/>
        <br/>

        <h6 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
            3. Select categories of keywords
        </h6>

        <br/>
       
       {/* expansive component in case user wants to know what keywords are */}
        <button type="button" className="btn btn-link" 
        onClick={showDefKeywords}
        style={{ 
            "textDecoration": "none", color:'black', paddingLeft: '0px'}}>
                <p><strong>What are keywords?</strong>
                <i className="fas fa-chevron-down fa-fw" style={{marginLeft: '10px'}}></i>
                </p>   
                
        </button>
        { defKeywords ? <DefinitionKeywords /> : null }

        <br/>

        {/* expansive component in case user wants to know what keyword themes are */}
        <button type="button" className="btn btn-link" 
        onClick={showDefKeyThemes}
        style={{ 
            "textDecoration": "none", color:'black', paddingLeft: '0px'}}>
                <p><strong>What are categories of keywords?</strong>
                <i className="fas fa-chevron-down fa-fw" style={{marginLeft: '10px'}}></i>
                </p>   
                
        </button>
        { defKeyThemes ? <DefinitionKeyThemes /> : null }
        
        <br/>
        <br/>

        <p><strong>Select categories of keywords</strong></p>

        <p>Add up to 7 categories of keywords, and don't use 
            punctuation marks, phone numbers, or webpage address (URL).
        </p>
        <br/>

        <div className="alert alert-info" role="alert">
        <i className="fas fa-info-circle fa-fw" style={{marginRight: '10px'}}></i>    
        If there are certain words or phrases your customers use, 
            consider including them as a category of keywords.
        </div>

        <br/>
        

        <label>Category of keywords</label>
            <br/>
            <textarea className="form-control" placeholder="Enter category of keywords..." 
            id="keyword_text" rows="1" maxLength="30"
            onChange={onChangeKeywordOne} value={keywordOne}></textarea>
            {(keywordOneCharacters > 20) ? 
            <small className= "form-text text-danger">
                {keywordOneCharacters}/30 characters. You can have up to 30 characters, 
                but best practices suggest a max of 20.
            </small> : 
            <small className= "form-text text-muted">
                {keywordOneCharacters}/30 characters.
            </small>}
            <br/>
            <br/>
            {keywordOneCharacters > 0 && 
            <Fragment>
                <button onClick={keywordThemesSuggestions} className="btn btn-success">
                ADD & RECOMMEND
                </button>
                <br/>
                <small className= "form-text text-muted">
                    Recommendations come from your category of keywords.
                </small>
                <br/>
                <br/>
            </Fragment>
            }
            
                {message ? <Message msg={message} /> : null}
                {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
                <br/>
                {messageWarning2 ? <MessageWarning msg={messageWarning2} /> : null}
        
        {(selectedKeywordThemes || keyword_themes['keyword_themes']) && 

            <div className="container" style={{paddingLeft: '0px'}}>
                {(selectedKeywordThemes.length > 0 || keyword_themes['keyword_themes']) && 
                    <Fragment>
                        <label>Selected category keywords:</label>
                        <br/>
                        {selectedKeywordThemes.length === 7 ? 
                        <small className= "form-text text-success">7 categories selected. 
                        If you want to add more, create a new campaign or delete selected ones.</small> :
                        <small className="form-text text-muted">
                            You can select {7 - selectedKeywordThemes.length} more.
                        </small>}
                    </Fragment>}
                    <br/>
                    <br/>
                <div className="row">
                    {selectedKeywordThemes.map(item => {
                        return <div className="col-sm" style={{paddingTop: '10px'}} key={item}>
                        <button type="button" className="btn btn-primary btn-sm" 
                        style={{whiteSpace: 'nowrap'}} 
                        value={item} 
                        key={item}
                        onClick={removeSelectedKeyTheme}>
                            
                            {item}
                            <i className="fas fa-times fa-fw" 
                            style={{marginLeft: '5px'}}
                            key={item}></i>
                        </button>
                    </div>
                    })}
                </div>
                <br/>
            </div>}

        {selectedKeywordThemes.length > 0 && 
            
            <Fragment>
               
                {keywordSuggestions.length > 0 && 
                <Fragment>
                    <label>Recommended category keywords:</label>
                    <br/>
                    {keywordOne ? 
                    <small className="form-text text-muted">
                        {keywordSuggestions.length} recommendations for {keywordOne}.
                    </small> :
                    <small className="form-text text-muted">
                        Enter a new category to get more recommendations.
                    </small>}
                </Fragment>}
                <div className="container">
                    <div className="row">
                    {keywordSuggestions.length > 0 && keywordSuggestions.map(item => {
                        // map value if item is not already in the recommendations
                        if (selectedKeywordThemes.indexOf(item) === -1) {
                            return  <div className="col-sm" style={{paddingTop: '10px'}} key={item}>
                                    <button type="button" className="btn btn-outline-primary btn-sm" 
                                    style={{whiteSpace: 'nowrap'}} 
                                    value={item} 
                                    key={item}
                                    onClick={addSelectedKeyTheme}>
                                        <i className="fas fa-plus fa-fw" 
                                        style={{marginRight: '5px'}}
                                        key={item}></i>

                                        {item}
                                    </button>
                                </div>
                        } else {
                            return console.log('Not showing item that is already selected.')
                        }
                        
                    })}
                    </div>
                </div>
            </Fragment>
        }
    
        <br/>
        <br/>

        {messageWarning3 ? <MessageWarning msg={messageWarning3} /> : null}

        <div className="container" align="left">
            <div className="row">
                <div className="col">

                    <button type="button" onClick={goStep2} 
                    className="btn btn-outline-primary btn-block" 
                    style={{margin:'10px'}}>Back
                    </button>
            
                </div>

                <div className="col" align="right">

                    <button type="button" onClick={goStep4} 
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

export default KeywordThemes;