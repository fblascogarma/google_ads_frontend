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
// import Message from './Message';
import MessageWarning from './MessageWarning';
import ProgressionTracker from './ProgressionTracker';


const Location = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()

    // messages to give feedback to users
    const [message, setMessage] = useState('')
    const [messageWarning, setMessageWarning] = useState('')

    // cookies that have value to send to the backend to get 
    // GeoTargetConstants by given location names
    const [country_code, setCountry_code, removeCountry_code] = useCookies(['country_code'])
    const [language_code, setLanguage_code, removeLanguage_code] = useCookies(['language_code'])

    // cookie to save the selected locations
    const [geo_location, setGeo_location, removeGeo_location] = useCookies(['geo_location'])

    // object to store the locations selected by users
    const [location_targeting, setLocation_targeting] = useState([])

    // object to manage location input
    const [location_input, setLocation_input] = useState('')

    // set location in location_input state
    const onChangeLocation = (e) => {
        setLocation_input(e.target.value);
    }

    // capture the location suggestions sent by Google's API from the text user input in text field
    const [locationSuggestions, setLocationSuggestions] = useState([])

    // capture the additional location suggestions sent by Google's API from the selected recommendations
    const [additional_locationSuggestions, setAdditional_locationSuggestions] = useState([])

    // add the location the user input in the text field
    // and get recommendations from API
    const addLocation = (e) => {
        if (location_input.length > 0 && 
            // add location if it has not been added yet to the selected object
            (location_targeting.indexOf(location_input) === -1)) {
            // eliminate warning message of no input in text box
            setMessageWarning('')
            // add it to the selected array
            setLocation_targeting([...location_targeting, location_input]);

            // data to send to the backend and then to the API
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'location': location_input, 
                'country_code': country_code['country_code'], 
                'language_code': language_code['language_code']
            }

            // call the API to get location recommendations
            fetch('http://127.0.0.1:8000/api/location-recommendations/', {
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
                if (resp !== null) {
                    setLocationSuggestions(resp)
                } else if (resp === null) {
                    setMessageWarning('No recommendations for that location.')
                }
            })
            // .then(resp => resp.length && setLocationSuggestions(resp))
            .catch(error => console.log(error))
        } else if (location_targeting.indexOf(location_input) !== -1) {
            setMessageWarning('You already added '+location_input+'.')

        } else {setMessageWarning('Enter a location in the text box above.')}
        
    }

    // add the location selected from the suggestions
    const addLocationRecommended = (e) => {
        
            // store selected recommendation
            const selectedRecomm = e.currentTarget.value
        
            // add it to the selected array
            setLocation_targeting([...location_targeting, selectedRecomm]);
            // remove it from the suggestion array
            const itemToRemove = selectedRecomm
            const newArray = locationSuggestions.filter(el => el !== itemToRemove);
            setLocationSuggestions(newArray);

            // get more recommendations from the API based on the selected one
            // data to send to the backend and then to the API
            const data_recomm = { 'refreshToken': refreshToken['refreshToken'], 
            'location': selectedRecomm, 
            'country_code': country_code['country_code'], 
            'language_code': language_code['language_code']}

            // call the API to get location recommendations
            fetch('http://127.0.0.1:8000/api/location-recommendations/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data_recomm),
                
            })
            .then(resp => resp.json())
            .then(resp => resp.length && setAdditional_locationSuggestions(resp))
            .catch(error => console.log(error))
        
    }
    
    // remove location from selected object
    const removeLocation = (e) => {
        const itemToRemove = e.currentTarget.value
        const newArray = location_targeting.filter(el => el !== itemToRemove)
        setLocation_targeting(newArray)
    }

    
    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // if there are locations saved as a cookie, store them in the location_targeting object
    // possible use case: if user is in step 5 and goes back to this step 4
    useEffect(() => {
        if(geo_location['geo_location']) {
            setLocation_targeting(geo_location['geo_location'])
        }
    }, [geo_location])


    const goStep1 = () => {
        history.push('/googleads/campaigns/create-campaign')
    }

    const goStep3 = () => {
        if (location_targeting.length > 0 || geo_location['geo_location']) {
            // save the selected keyword themes as cookies
            setGeo_location("geo_location", location_targeting, { encode: String})
            // and send user to the next step
            history.push('/googleads/campaigns/keyword-themes')
        } else {
            setMessageWarning('Add at least one location, please.')
        }
    }


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create New Campaign
        </h4> 

        <br/>

        <ProgressionTracker step="step2" />
        
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
            2. Select location
        </h6>

        <br/>
        <p>
            Your ads show to people physically or regularly in the locations you select, 
            and to people who express interest in these locations.
        </p>
        
        <br/>
        <br/>

        <label>Location</label>
            <br/>
            <textarea className="form-control" placeholder="Enter location..." 
            id="location" rows="1"
            onChange={onChangeLocation} ></textarea>
            <small className= "form-text text-muted">
                Enter country, state, province, city. 
                Add 1 location at a time and add as many as you like.
            </small> 
            <br/>
            <br/>
            <button onClick={addLocation} className="btn btn-success">
                ADD & RECOMMEND
            </button>
            

        <br/>
        <br/>

        {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
        <br/>

        {location_targeting.length > 0 && 
        <Fragment>
            <label>Selected locations:</label>
            <br/>
            <div className="row">
                    {location_targeting.map(item => {
                        return <div className="col-sm" style={{paddingTop: '10px'}} key={item}>
                        <button type="button" className="btn btn-primary btn-sm" 
                        style={{whiteSpace: 'nowrap'}} 
                        value={item} 
                        key={item}
                        onClick={removeLocation}>
                            
                            {item}
                            <i className="fas fa-times fa-fw" 
                            style={{marginLeft: '5px'}}
                            key={item}></i>
                        </button>
                        </div>
                    })}
            </div>
        </Fragment>
        }

        {locationSuggestions.length > 0 && 
        <Fragment>
            <br/>
            <label>Recommended locations:</label>
            <br/>
            <div className="row">
                    {/* show recommended locations from the location input by user in the text field */} 
                    {locationSuggestions.map(item => {
                        // map value if item is not already in the recommendations
                        if (location_targeting.indexOf(item.geo_name) === -1) {
                            return <div className="col-sm" style={{paddingTop: '10px'}} key={item.geo_id}>
                            <button type="button" className="btn btn-outline-primary btn-sm" 
                            style={{whiteSpace: 'nowrap'}} 
                            value={item.geo_name} 
                            key={item.geo_id}
                            onClick={addLocationRecommended}>
                                <i className="fas fa-plus fa-fw" 
                                style={{marginRight: '5px'}}
                                key={item.geo_name}></i>

                                {item.geo_name}
                                
                            </button>
                            </div>

                        } else {
                            return console.log('Not showing item that is already selected.')
                        }
                        
                    })}

                    {/* show recommended locations from the last location selected by user from the recommendations */}
                    {additional_locationSuggestions.map(item => {
                        // map value if item is not already in the recommendations nor on the recommendations from text input
                        if (location_targeting.indexOf(item.geo_name) === -1 &&
                        locationSuggestions.indexOf(item.geo_name) === -1) {
                            return <div className="col-sm" style={{paddingTop: '10px'}} key={item.geo_id}>
                            <button type="button" className="btn btn-outline-primary btn-sm" 
                            style={{whiteSpace: 'nowrap'}} 
                            value={item.geo_name} 
                            key={item.geo_id}
                            onClick={addLocationRecommended}>
                                <i className="fas fa-plus fa-fw" 
                                style={{marginRight: '5px'}}
                                key={item.geo_name}></i>

                                {item.geo_name}
                                
                            </button>
                            </div>

                        } else {
                            return console.log('Not showing item that is already selected.')
                        }
                        
                    })}
            </div>
        </Fragment>
        }

        <br/>
        <br/>

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

export default Location;