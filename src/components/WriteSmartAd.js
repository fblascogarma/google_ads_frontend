import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import MessageError from './MessageErrorNoClose';
import ProgressionTracker from './ProgressionTracker';



const WriteSmartAd = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    let history = useHistory()

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

    const [languageCode, setLanguageCode] = useState("en")

    // cookies
    const [language_code, setLanguage_code, removeLanguage_code] = useCookies(['language_code'])
    const [headline_1, setHeadline_1, removeHeadline_1] = useCookies(['headline_1'])
    const [headline_2, setHeadline_2, removeHeadline_2] = useCookies(['headline_2'])
    const [headline_3, setHeadline_3, removeHeadline_3] = useCookies(['headline_3'])
    const [desc_1, setDesc_1, removeDesc_1] = useCookies(['desc_1'])
    const [desc_2, setDesc_2, removeDesc_2] = useCookies(['desc_2'])

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
        removeHeadline_1(['headline_1']);
        setHeadlineOne(e.target.value); 
        setHeadlineOneCharacters(e.target.value.length)}

    // set headline 2
    const onChangeHeadlineTwo = (e) => {
        removeHeadline_2(['headline_2']);
        setHeadlineTwo(e.target.value);
        setHeadlineTwoCharacters(e.target.value.length)}

    // set headline 3
    const onChangeHeadlineThree = (e) => {
        removeHeadline_3(['headline_3']);
        setHeadlineThree(e.target.value);
        setHeadlineThreeCharacters(e.target.value.length)}

    // set description 1
    const onChangeDescOne = (e) => {
        removeDesc_1(['desc_1']);
        setDescOne(e.target.value); 
        setDescOneCharacters(e.target.value.length)}
    
    // set description 2
    const onChangeDescTwo = (e) => {
        removeDesc_2(['desc_2']);
        setDescTwo(e.target.value);
        setDescTwoCharacters(e.target.value.length)}

    // set language code
    const onChangeLanguageCode = (e) => {
        removeLanguage_code(['language_code']);
        setLanguageCode(e.target.value)}

    // if there are field values saved as cookies, setState
    useEffect(() => {
        if(headline_1['headline_1']) {
            
            setHeadlineOne(headline_1['headline_1'])
        }
    }, [headline_1])

    useEffect(() => {
        if(headline_2['headline_2']) {
            
            setHeadlineTwo(headline_2['headline_2'])
        }
    }, [headline_2])

    useEffect(() => {
        if(headline_3['headline_3']) {
            
            setHeadlineThree(headline_3['headline_3'])
        }
    }, [headline_3])

    useEffect(() => {
        if(desc_1['desc_1']) {
            
            setDescOne(desc_1['desc_1'])
        }
    }, [desc_1])

    useEffect(() => {
        if(desc_2['desc_2']) {
            
            setDescTwo(desc_2['desc_2'])
        }
    }, [desc_2])

    // if user has the language code cookie, use it for the state
    useEffect(() => {
        if(language_code['language_code']) {
            
            setLanguageCode(language_code['language_code'])
        }
    }, [language_code])

    // when user clicks on 'Next' button
    // take user to set location targets
    const goStep5 = () => {
        if (
            // if required fields are completed
            // or there are cookies of the fields
            // send user to the next step
            // if not, error message
            ((headlineOne.length !== 0) && (headlineTwo.length !== 0) && (headlineThree.length !== 0) && 
            (descOne.length !== 0) && (descTwo.length !== 0)) || 
            ((headline_1['headline_1']) && (headline_2['headline_2']) && (headline_3['headline_3']) && 
            (desc_1['desc_1']) && (desc_2['desc_2']))) 
                
                { 
                    // save values as cookies to use later and send user to next step
                    setLanguage_code("language_code", languageCode, { encode: String});
                    setHeadline_1("headline_1", headlineOne, { encode: String});
                    setHeadline_2("headline_2", headlineTwo, { encode: String});
                    setHeadline_3("headline_3", headlineThree, { encode: String});
                    setDesc_1("desc_1", descOne, { encode: String});
                    setDesc_2("desc_2", descTwo, { encode: String});
                    history.push('/googleads/campaigns/budget');
                } else {setMessageError('You need to fill out all fields to continue.');}
    }

    // redirect to user to previous step,
    // also used for progression tracker
    const goStep3 = () => {
        history.push('/googleads/campaigns/keyword-themes')}


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

        <label>Select language of your ad</label>
        <br/>
        <br/>
            <select className="form-select form-select" onChange={onChangeLanguageCode} 
            value={language_code ? language_code['language_code'] : languageCode} aria-label="Choose language for your ad">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="pt">Portuguese</option>
            </select>
        <br/>
        <br/>
        <br/>

        <div>
        <p>Your headlines are what your customers will focus on. 
            Keep them simple, clear, and related to what they're are searching for.
        </p>
            <label>Headline 1</label>
            <br/>
            <textarea className="form-control" placeholder="Enter first headline for your ad..." 
            id="headline_1" rows="1" maxLength="30"
            onChange={onChangeHeadlineOne} 
            value={headline_1 ? headline_1['headline_1'] : headlineOne}></textarea>
            <small className="form-text text-muted">
                {headlineOneCharacters}/30 characters.
            </small>
            <br/>
            <br/>

            <label>Headline 2</label>
            <br/>
            <textarea className="form-control" placeholder="Enter second headline for your ad..." 
            id="headline_2" rows="1" maxLength="30"
            onChange={onChangeHeadlineTwo} 
            value={headline_2 ? headline_2['headline_2'] : headlineTwo}></textarea>
            <small className="form-text text-muted">
                {headlineTwoCharacters}/30 characters.
            </small>
            <br/>
            <br/>

            <label>Headline 3</label>
            <br/>
            <textarea className="form-control" placeholder="Enter third headline for your ad..." 
            id="headline_3" rows="1" maxLength="30"
            onChange={onChangeHeadlineThree} 
            value={headline_3 ? headline_3['headline_3'] : headlineThree}></textarea>
            <small className="form-text text-muted">
                {headlineThreeCharacters}/30 characters.
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
            value={desc_1 ? desc_1['desc_1'] : descOne}></textarea>
            <small className="form-text text-muted">
                {descOneCharacters}/90 characters.
            </small>
            <br/>
            <br/>

            <label>Description 2</label>
            <br/>
            <textarea className="form-control" placeholder="Enter second description for your ad..." 
            id="desc_2" rows="2" maxLength="90"
            onChange={onChangeDescTwo} 
            value={desc_2 ? desc_2['desc_2'] : descTwo}></textarea>
            <small className="form-text text-muted">
                {descTwoCharacters}/90 characters.
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