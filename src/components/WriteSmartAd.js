import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import MessageError from './MessageErrorNoClose';



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
    const goStep3 = () => {
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
                    history.push('/googleads/campaigns/keyword-themes');
                } else {setMessageError('You need to fill out all fields to continue.');}
    }

    // redirect to user to previous or next step,
    // also used for progression tracker
    const goStep1 = () => {
        history.push('/googleads/campaigns/create-campaign')}
        

    const goStep2 = () => {
        history.push('/googleads/write-smart-ad')
    }

    const goStep4 = () => {
        history.push('/googleads/campaigns/create-campaign')}

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

        <div className="container">
            <div className="row" style={{ 
                textAlign: 'center', 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 2fr 1fr 2fr 1fr 2fr 1fr 2fr' }}>
                    
                <div className="col-sm">
                <button type="button" className="btn btn-link" name="go back" 
                onClick={goStep1} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'green'}}>
                    <i className="fas fa-check-circle fa-2x" style={{ color: 'green' }}></i>  
                </span>
                <span style={{ color: 'green'}}>General information</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'green', paddingTop: '10px'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="go back" 
                onClick={goStep2} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">2</strong>
                </span>
                <span style={{ color: 'rgb(30,144,255)'}}>Write ad</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'rgb(30,144,255)', paddingTop: '10px'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="go back" 
                onClick={goStep3} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(176,196,222)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">3</strong>
                </span>
                <span style={{ color: 'rgb(176,196,222)'}}>Select keywords</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'rgb(176,196,222)', paddingTop: '10px'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="go back" 
                onClick={goStep4} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(176,196,222)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">4</strong>
                </span>
                <span style={{ color: 'rgb(176,196,222)'}}>Select location</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'rgb(176,196,222)', paddingTop: '10px'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="go back" 
                onClick={goStep5} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(176,196,222)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">5</strong>
                </span>
                <span style={{ color: 'rgb(176,196,222)'}}>Select budget</span>
                </button>
                </div>

            </div>
        </div>
        
        {/* end of progression tracker */}

        <br/>
        <br/>
        <button type="button" className="btn btn-link" name="go back" 
        onClick={goStep1} 
        style={{ color: 'black' }}>
            <i className="fas fa-arrow-left fa-2x"></i>
        </button>
        <br/>
        <br/>

        <h6 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
            2. Write your ad
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

                        <button type="button" onClick={goStep1} 
                        className="btn btn-outline-primary btn-block" 
                        style={{margin:'10px'}}>Back
                        </button>
                
                    </div>

                    <div className="col" align="right">

                        <button type="button" onClick={goStep3} 
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