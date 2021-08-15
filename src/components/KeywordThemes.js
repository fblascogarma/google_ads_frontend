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
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    const [country_code, setCountry_code, removeCountry_code] = useCookies(['country_code'])
    const [language_code, setLanguage_code, removeLanguage_code] = useCookies(['language_code'])
    const [message, setMessage] = useState('')
    const [messageWarning, setMessageWarning] = useState('')
    const [messageWarning2, setMessageWarning2] = useState('')


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
        setKeywordOneCharacters(e.target.value.length)}


    // data to send to the backend and then to the API
    const data = { 'refreshToken': refreshToken['refreshToken'], 'keyword_text': keywordOne, 'country_code': country_code['country_code'], 'language_code': language_code['language_code']}
    
    
    // get keyword themes suggestions from API
    const keywordThemesSuggestions = () => {
        // if there was a warning message, remove it
        setMessageWarning('');
        setMessageWarning2('');
        // tell user it can take a few seconds to show results
        setMessage(' Fetching your data... It will take a few seconds.');

        // if keyword theme is already selected, do not add it again to the object
        if ((selectedKeywordThemes.indexOf(keywordOne) === -1) && 
        keywordOneCharacters > 0 && 
        selectedKeywordThemes.length < 7) {
            setSelectedKeywordThemes([...selectedKeywordThemes, keywordOne])
        } else if (selectedKeywordThemes.length > 6) {
            setMessageWarning2('Remove one category to add this one.');
        }

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
            .then(resp => resp.length ? setKeywordSuggestions(resp) : 
            setMessageWarning('Please try again. No recommendations for that category.'))
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

    // redirect to step 4 of campaign creation
    // when user clicks on 'Next' button
    const goStep4 = () => {
        history.push('/googleads/campaigns/create-campaign')}

    // redirect to user to previous or next step,
    // also used for progression tracker
    const goStep2 = () => {
        history.push('/googleads/write-smart-ad')}

    const goStep1 = () => {
        history.push('/googleads/campaigns/create-campaign')}

    const goStep3 = () => {
        history.push('/googleads/campaigns/keyword-themes')
    }

    const goStep5 = () => {
        history.push('/googleads/campaigns/create-campaign')}


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create New Campaign
        </h4> 

        <br/>
        {/* start of progression tracker */}

        <ProgressionTracker step="step3" />
        
        {/* end of progression tracker */}
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
        

        <label>Enter category of keywords</label>
            <br/>
            <textarea className="form-control" placeholder="Enter category of keywords..." 
            id="keyword_text" rows="1" maxLength="30"
            onChange={onChangeKeywordOne} value={keywordOne}></textarea>
            {(keywordOneCharacters > 20) ? 
            <small className= "form-text text-danger">
                {keywordOneCharacters}/20 characters. You can have up to 30 characters, 
                but best practices suggest a max of 20.
            </small> : 
            <small className= "form-text text-muted">
                {keywordOneCharacters}/20 characters.
            </small>}
            <br/>
            <br/>
            {keywordOneCharacters > 0 && 
            <Fragment>
                <button onClick={keywordThemesSuggestions} className="btn btn-success">
                Recommend categories
                </button>
                <br/>
                <small className= "form-text text-muted">
                    Recommendations come from your category of keywords
                </small>
                <br/>
                <br/>
            </Fragment>
            }
            
                {message ? <Message msg={message} /> : null}
                {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
                <br/>
                {messageWarning2 ? <MessageWarning msg={messageWarning2} /> : null}
        
        {selectedKeywordThemes && 

            <div className="container">
                {selectedKeywordThemes.length > 0 && 
                    <Fragment>
                        <label>Selected category keywords:</label>
                        <br/>
                        {selectedKeywordThemes.length === 7 ? 
                        <small className= "form-text text-muted">7 categories selected. 
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
               
                {keywordSuggestions.length > 0 && <p>Recommended category keywords:</p>}
                <div className="container">
                    <div className="row">
                    {keywordSuggestions.map(item => {
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