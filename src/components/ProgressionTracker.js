import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';



const ProgressionTracker = ({ step }) => {

    // redirect users
    let history = useHistory()

    // cookies used to check if user can go to that step
    // to prevent they don't skip steps

    // cookies from step 1
    const [country_code, setCountry_code, removeCountry_code] = useCookies(['country_code', "US"])
    const [business_name, setBusiness_name, removeBusiness_name] = useCookies(['business_name'])
    const [landing_page, setLanding_page, removeLanding_page] = useCookies(['landing_page'])
    const [phone_number, setPhone_number, removePhone_number] = useCookies(['phone_number'])


    // cookies from step 2
    const [headline_1, setHeadline_1, removeHeadline_1] = useCookies(['headline_1'])
    const [headline_2, setHeadline_2, removeHeadline_2] = useCookies(['headline_2'])
    const [headline_3, setHeadline_3, removeHeadline_3] = useCookies(['headline_3'])
    const [desc_1, setDesc_1, removeDesc_1] = useCookies(['desc_1'])
    const [desc_2, setDesc_2, removeDesc_2] = useCookies(['desc_2'])

    // cookie from step 3
    const [keyword_themes, setKeyword_themes, removeKeyword_themes] = useCookies(['keyword_themes'])

    // cookie from step 4
    const [geo_location, setGeo_location, removeGeo_location] = useCookies(['geo_location'])

    // onClick functions for icons and elements of each step

    // for step 1 no need to check cookies
    const goStep1 = () => {
        history.push('/googleads/campaigns/create-campaign')
    }

    // user can go to step 2 if cookies are already saved with the necessary data
    // cookies from step 1 - General Information
    const goStep2 = () => {
        if (
            (country_code['country_code']) &&
            (business_name['business_name']) && 
            (landing_page['landing_page']) && 
            (phone_number['phone_number'])
            ) {
                history.push('/googleads/campaigns/location');
            } 
    }

    // user can go to step 3 if cookies are already save with the necessary data
    // cookies from step 2 - Select Location
    const goStep3 = () => {
        if (geo_location["geo_location"]) {
            history.push('/googleads/campaigns/keyword-themes')
            }
        
    }

    // user can go to step 4 if there is a cookie saved with the necessary data
    // cookies from step 3 - Select Keywords
    const goStep4 = () => {
        if (keyword_themes['keyword_themes']) {
            history.push('/googleads/write-smart-ad')
        }
        
    }
        
    // user can go to step 5 if there is a cookie saved with the necessary data
    // cookies from step 4 - Write Ad
    const goStep5 = () => {
        if (
            headline_1['headline_1'] && 
            headline_2['headline_2'] && 
            headline_3['headline_3'] && 
            desc_1['desc_1'] && 
            desc_2['desc_2']) 
                
                {
                    history.push('/googleads/campaigns/budget');
                }
        
    }



    if (step === 'step1') {
        return (
            <div className="container">
            <div className="row" style={{ 
                textAlign: 'center', 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 2fr 1fr 2fr 1fr 2fr 1fr 2fr',
                maxWidth: '100px' }}>
                    
                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step1" 
                onClick={goStep1} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">1</strong>
                </span>
                <span style={{ color: 'rgb(30,144,255)'}}>General information</span>
                </button>
                </div>

                <div className="col-sm" style={{paddingTop: '10px'}}>
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'rgb(30,144,255)'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step2" 
                onClick={goStep2} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(176,196,222)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">2</strong>
                </span>
                <span style={{ color: 'rgb(176,196,222)'}}>Select location</span>
                </button>
                </div>

                <div className="col-sm" style={{paddingTop: '10px'}}>
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'rgb(176,196,222)'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step3" 
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
                <button type="button" className="btn btn-link" name="step4" 
                onClick={goStep4} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(176,196,222)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">4</strong>
                </span>
                <span style={{ color: 'rgb(176,196,222)'}}>Write ad</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'rgb(176,196,222)', paddingTop: '10px'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step5" 
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
        );
    } else if (step === 'step2') {
        return (
            <div className="container">
            <div className="row" style={{ 
                textAlign: 'center', 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 2fr 1fr 2fr 1fr 2fr 1fr 2fr',
                maxWidth: '100px' }}>
                    
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
                <span style={{ color: 'rgb(30,144,255)'}}>Select location</span>
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
                <span style={{ color: 'rgb(176,196,222)'}}>Write ad</span>
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

        )
        
    } else if (step === 'step3') {
        return (
            <div className="container">
            <div className="row" style={{ 
                textAlign: 'center', 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 2fr 1fr 2fr 1fr 2fr 1fr 2fr',
                maxWidth: '100px' }}>
                    
                <div className="col-sm">
                <button type="button" className="btn btn-link" name="go back" 
                onClick={goStep1} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
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
                    <i className="fas fa-check-circle fa-2x" style={{ color: 'green' }}></i>  
                </span>
                <span style={{ color: 'green'}}>Select location</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'green', paddingTop: '10px'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="go back" 
                onClick={goStep3} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">3</strong>
                </span>
                <span style={{ color: 'rgb(30,144,255)'}}>Select keywords</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'rgb(30,144,255)', paddingTop: '10px'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="go back" 
                onClick={goStep4} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(176,196,222)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">4</strong>
                </span>
                <span style={{ color: 'rgb(176,196,222)'}}>Write ad</span>
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

        )
        
    } else if (step === 'step4') {
        return (
            <div className="container">
            <div className="row" style={{ 
                textAlign: 'center', 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 2fr 1fr 2fr 1fr 2fr 1fr 2fr',
                maxWidth: '100px' }}>
                    
                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step1" 
                onClick={goStep1} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
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
                <button type="button" className="btn btn-link" name="step2" 
                onClick={goStep2} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fas fa-check-circle fa-2x" style={{ color: 'green' }}></i>  
                </span>
                <span style={{ color: 'green'}}>Select location</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'green', paddingTop: '10px'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step3" 
                onClick={goStep3} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fas fa-check-circle fa-2x" style={{ color: 'green' }}></i>  
                </span>
                <span style={{ color: 'green'}}>Select keywords</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'green', paddingTop: '10px'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step4" 
                onClick={goStep4} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">4</strong>
                </span>
                <span style={{ color: 'rgb(30,144,255)'}}>Write ad</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'rgb(30,144,255)', paddingTop: '10px'}}></i>
                </div>

                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step5" 
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
        )
        
    } else if (step === 'step5') {
        return (
            <div className="container">
            <div className="row" style={{ 
                textAlign: 'center', 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 2fr 1fr 2fr 1fr 2fr 1fr 2fr',
                maxWidth: '100px' }}>

                {/* Step 1 starts here */}    
                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step1" 
                onClick={goStep1} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fas fa-check-circle fa-2x" style={{ color: 'green' }}></i>  
                </span>
                <span style={{ color: 'green'}}>General information</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'green', paddingTop: '10px'}}></i>
                </div>
                {/* Step 1 ends here */}

                {/* Step 2 starts here */}
                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step2" 
                onClick={goStep2} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fas fa-check-circle fa-2x" style={{ color: 'green' }}></i>  
                </span>
                <span style={{ color: 'green'}}>Select location</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'green', paddingTop: '10px'}}></i>
                </div>
                {/* Step 2 ends here */}

                {/* Step 3 starts here */}
                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step3" 
                onClick={goStep3} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fas fa-check-circle fa-2x" style={{ color: 'green' }}></i>  
                </span>
                <span style={{ color: 'green'}}>Select keywords</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'green', paddingTop: '10px'}}></i>
                </div>
                {/* Step 3 ends here */}

                {/* Step 4 starts here */}
                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step4" 
                onClick={goStep4} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fas fa-check-circle fa-2x" style={{ color: 'green' }}></i>  
                </span>
                <span style={{ color: 'green'}}>Write ad</span>
                </button>
                </div>

                <div className="col-sm">
                <i className="fas fa-long-arrow-alt-right fa-3x" 
                style={{ color: 'green', paddingTop: '10px'}}></i>
                </div>
                {/* Step 4 ends here */}

                {/* Step 5 starts here */}
                <div className="col-sm">
                <button type="button" className="btn btn-link" name="step5" 
                onClick={goStep5} 
                style={{ color: 'white' }}>
                <span className="fa-stack fa-2x" style={{ color: 'rgb(30,144,255)'}}>
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <strong className="fa-stack-1x">5</strong>
                </span>
                <span style={{ color: 'rgb(30,144,255)'}}>Select budget</span>
                </button>
                </div>
                {/* Step 5 ends here */}

               

            </div>
        </div>
        )
        
    }

};

ProgressionTracker.propTypes = {
    step: PropTypes.string.isRequired,
}

export default ProgressionTracker