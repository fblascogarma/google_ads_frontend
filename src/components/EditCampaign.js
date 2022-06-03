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
// import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import Message from './Message';
import MessageWarning from './MessageWarning';
import MessageSuccess from './MessageSuccess';
import MessageError from './MessageErrorNoClose';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const EditCampaign = () => {

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])
    let history = useHistory()

    // store campaign info from the api
    const [campaignInfo, setCampaignInfo] = useState([])

    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])
    const [campaignId, setCampaignId, removeCampaignID] = useCookies(['campaign_id'])

    // to capture the status the user wants for the campaign
    const [status, setStatus] = useState()

    // to capture the new status of the campaign in the response
    // that comes from the backend
    const [new_status, setNewStatus] = useState()

    // to store the campaign name if user changes it
    const [campaignName, setCampaignName] = useState("")

    // store headlines of the ad
    const [headlineOne, setHeadlineOne] = useState("")
    const [headlineTwo, setHeadlineTwo] = useState("")
    const [headlineThree, setHeadlineThree] = useState("")

    // count characters of the headlines
    const [headlineOneCharacters, setHeadlineOneCharacters] = useState(0)
    const [headlineTwoCharacters, setHeadlineTwoCharacters] = useState(0)
    const [headlineThreeCharacters, setHeadlineThreeCharacters] = useState(0)

    // store descriptions of the ad
    const [descOne, setDescOne] = useState("")
    const [descTwo, setDescTwo] = useState("")

    // count characters of the descriptions
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

    // messages to inform users
    const [message, setMessage] = useState(' Fetching your data... It can take a few seconds.')
    const [messageWarning, setMessageWarning] = useState('')
    const [messageSuccess, setMessageSuccess] = useState('')
    const [messageError, setMessageError] = useState('') 
    const [messageEditingKeywords, setMessageEditingKeywords] = useState('')
    const [messageEditingGeoTargets, setMessageEditingGeoTargets] = useState('')
    const [messageGeoTargetRecommendations, setMessageGeoTargetRecommendations] = useState('')
    const [messageAddKeyword, setMessageAddKeyword] = useState('')
    const [messageEditingAdSchedule, setMessageEditingAdSchedule] = useState('')



    // if there is no mytoken in the cookie, redirect user to the home page (denying access)
    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // if there is a campaign_id in the cookies
    // send it to the backend with the refreshToken and customer_id
    // where they will be used to get the campaigns settings associated with that campaign_id
    useEffect(() => {
        if(campaignId) {

            // tell user you are fetching their data
            setMessage(' Fetching your data... It can take a few seconds.');
            
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'campaign_id': campaignId['campaignID']
            }

            fetch('http://127.0.0.1:8000/api/get-campaign-settings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp !== null) {
                    console.log(resp);
                    // save campaign info in campaignInfo object
                    setCampaignInfo(resp);
                    setMessage('')
                    
                } else if (resp === null) {
                    console.log(resp);
                    setMessage('');
                    setMessageWarning('Error when trying to get your campaign settings')
                }
            })
            .catch(error => console.log(error))
           
            
        }
    }, [campaignId, customerId, refreshToken, token])

    // if campaignInfo object has data
    useEffect(() => {
        if(campaignInfo.length > 0) {
            // delete the 'fetching data' message
            setMessage('')
            // save keyword themes of campaign to selectedKeywordThemes object
            setSelectedKeywordThemes(campaignInfo[0].keyword_themes)
            // save geo targets of campaign to selectedGeoTargets object
            setLocation_targeting(campaignInfo[0].geo_targets)
        }
    }, [campaignInfo])


    // change state that holds the status of campaign
    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    // change state of the campaign
    useEffect(() => {
        if (status === 'Active') {
            // tell user you are changing the status of the campaign
            setMessage(' Activating campaign... It can take a few seconds.');
                        
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'campaign_id': campaignId['campaignID']
            }

            fetch('http://127.0.0.1:8000/api/sc-settings/enable/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp !== null) {
                    console.log(resp);
                    setNewStatus(resp)
                    setMessage('')
                } else if (resp === null) {
                    console.log(resp);
                    setMessage('');
                    setMessageWarning('Error when trying to change status')

                }
            })
            .catch(error => console.log(error))

        }

        else if (status === 'Paused') {
            // tell user you are changing the status of the campaign
            setMessage(' Pausing campaign... It can take a few seconds.');
                        
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'campaign_id': campaignId['campaignID']
            }

            fetch('http://127.0.0.1:8000/api/sc-settings/pause/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp !== null) {
                    console.log(resp);
                    setNewStatus(resp)
                    setMessage('')
                } else if (resp === null) {
                    console.log(resp);
                    setMessage('');
                    setMessageWarning('Error when trying to change status')

                }
            })
            .catch(error => console.log(error))

        }

        else if (status === 'Deleted') {
            // tell user you are changing the status of the campaign
            setMessage(' Deleting campaign... It can take a few seconds.');
                        
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'campaign_id': campaignId['campaignID']
            }

            fetch('http://127.0.0.1:8000/api/sc-settings/delete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp !== null) {
                    console.log(resp);
                    setNewStatus(resp)
                    setMessage('')
                } else if (resp === null) {
                    console.log(resp);
                    setMessage('');
                    setMessageWarning('Error when trying to change status')

                }
            })
            .catch(error => console.log(error))

        }
    }, [campaignId, customerId, refreshToken, status, token])

    // when user clicks on pencil icon to edit campaign name
    // change the h5 tag to a input button to capture name changes
    const [showEditName, setShowEditName] = useState(false)
    const enableNameChange = () => setShowEditName(showEditName ? false : true)
    
    // set campaign name
    const onChangeCampaignName = (e) => {
        setCampaignName(e.target.value)
    }

    // store new campaign name returned from API
    const [newCampaignName, setNewCampaignName] = useState()

    // send new campaign name to backend and to Google's API
    const onClickSendNewName = () => {
        // show again the h5 tag
        setShowEditName(false)
        // tell user you are changing the name of the campaign
        setMessage(' Changing campaign name... It can take a few seconds.');
                        
        // data to send to the backend
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'campaign_name': campaignName
        }

        fetch('http://127.0.0.1:8000/api/sc-settings/edit-name/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp !== null) {
                console.log(resp);
                setNewCampaignName(resp);
                setMessage('')
            } else if (resp === null) {
                console.log(resp);
                setMessage('');
                setMessageWarning('Error when trying to change name')

            }
        })
        .catch(error => console.log(error))

    }
    // end of edit campaign name

    // start of edit budget config

    // when user clicks on pencil icon to edit campaign budget
    // open modal with budget settings
    const [modalShow, setModalShow] = useState(false)

    // store budget recommendations
    const [budget_recommendations, setBudget_recommendations] = useState([])

    // store selected budget
    const [budget, setBudget] = useState("recommended")
    const [custom_budget, setCustom_budget] = useState("")
    const [selected_budget, setSelected_budget] = useState()

    // store new budget returned from API
    const [newBudget, setNewBudget] = useState()
    
    // set budget in custom_budget state
    const changeBudget = (e) => {
        setCustom_budget(e.target.value);
    }
    
    // set budget in budget state
    const onChangeBudget = (e) => {
        setBudget(e.target.value);
    }

    const getBudgetRecomm = () => {
        // open modal
        setModalShow(true)

        // tell user you are getting recommendations
        setMessage(' Fetching recommendations for you... It can take a few seconds.')

        // data to send to the API
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'country_code': campaignInfo[0].country_code, 
            'language_code': campaignInfo[0].language_code,
            'geo_target_names': JSON.stringify(campaignInfo[0].geo_targets),
            'landing_page': campaignInfo[0].final_url,
            'display_name': JSON.stringify(campaignInfo[0].keyword_themes)
        }
        console.log(data)
        console.log(campaignInfo)

        // create AbortController function to cancel fetch when it ends
        const ac = new AbortController()

        // get recommendations from api
        fetch('http://127.0.0.1:8000/api/get-budget-recommendation/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => setBudget_recommendations(resp))
        .then(resp => {
            if (resp !== null) {
                setMessage('')
            } else {
                setMessageWarning('There was a problem and we could not get budget recommendations.')
            }

            })
        .catch(error => console.log(error));

        return () => ac.abort();
    }

    // send new budget to backend and to Google's API
    const onClickEditBudget = () => {
        if (selected_budget> 0) {
            // close modal
            setModalShow(false)

            // tell user you are changing the budget of the campaign
            setMessage(' Changing campaign budget... It can take a few seconds.');
            setMessageError('')
                            
            // data to send to the backend
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'customer_id': customerId['customerID'], 
                'campaign_id': campaignId['campaignID'],
                'new_budget': selected_budget,
                'budget_id': campaignInfo[0].budget_id
            }
            console.log(data)

            fetch('http://127.0.0.1:8000/api/sc-settings/edit-budget/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['mytoken']}`
                },
                body: JSON.stringify(data),
                
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp !== null) {
                    console.log(resp);
                    setNewBudget(resp);
                    setMessage('')
                } else if (resp === null) {
                    console.log(resp);
                    setMessage('');
                    setMessageWarning('Error when trying to change budget. Please try again.')

                }
            })
            .catch(error => console.log(error))

        }

        else if (selected_budget < 0 || selected_budget === 0) {
            setMessageError('Provide a valid budget. More than $0.')
        }
        
    }

    // set selected budget
    useEffect(() => {
        if (budget === 'custom') {
            setSelected_budget(custom_budget*1000000)
        } else if (budget === 'high') {
            setSelected_budget(budget_recommendations.high)
        } else if (budget === 'recommended') {
            setSelected_budget(budget_recommendations.recommended)
        } else if (budget === 'low') {
            setSelected_budget(budget_recommendations.low)
        }

    }, [
        selected_budget, 
        budget, custom_budget, 
        budget_recommendations.high, 
        budget_recommendations.low, 
        budget_recommendations.recommended
        ]
    )

    // end of edit budget config

    // set headline 1
    const onChangeHeadlineOne = (e) => {
        
        setHeadlineOneUser(e.target.value); 
        setHeadlineOneUserCharacters(e.target.value.length)
    }

    // set headline 2
    const onChangeHeadlineTwo = (e) => {
        
        setHeadlineTwoUser(e.target.value);
        setHeadlineTwoUserCharacters(e.target.value.length)
    }

    // set headline 3
    const onChangeHeadlineThree = (e) => {
        
        setHeadlineThreeUser(e.target.value);
        setHeadlineThreeUserCharacters(e.target.value.length)
    }

    // set description 1
    const onChangeDescOne = (e) => {
        
        setDescOneUser(e.target.value); 
        setDescOneUserCharacters(e.target.value.length)
    }
    
    // set description 2
    const onChangeDescTwo = (e) => {
        
        setDescTwoUser(e.target.value);
        setDescTwoUserCharacters(e.target.value.length)
    }

    // store new ad creative returned from API
    const [newAdCreative, setNewAdCreative] = useState()
    
    // send new ad creative to backend and to Google's API
    const onClickEditAdCreative = () => {
       
        // close modal
        setModalAdCreative(false)

        // tell user you are changing the ad creative of the campaign
        setMessage(' Changing campaign ad creative... It can take a few seconds.');
        setMessageError('')

        // prepare data to send to the backend
        if (headlineOneUser) {
            setHeadlineOne(headlineOneUser)
        }

        if (headlineTwoUser) {
            setHeadlineTwo(headlineTwoUser)
        }

        if (headlineThreeUser) {
            setHeadlineThree(headlineThreeUser)
        }

        if (descOneUser) {
            setDescOne(descOneUser)
        }

        if (descTwoUser) {
            setDescTwo(descTwoUser)
        }
                        
        // data to send to the backend
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'new_headline_1': headlineOneUser,
            'new_headline_2': headlineTwoUser,
            'new_headline_3': headlineThreeUser,
            'new_desc_1': descOneUser,
            'new_desc_2': descTwoUser
        }
        console.log(data)

        fetch('http://127.0.0.1:8000/api/sc-settings/edit-ad-creative/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp !== null) {
                console.log(resp);
                setNewAdCreative(resp);
                setMessage('')
            } else if (resp === null) {
                console.log(resp);
                setMessage('');
                setMessageWarning('Error when trying to change ad creative. Please try again.')

            }
        })
        .catch(error => console.log(error))
        
    }

    // info for search terms report modal start here

    // to filter the query to be sent to the api
    const [date, setDate] = useState("ALL_TIME")

    // store search terms performance info from api
    const [searchTerms, setSearchTerms] = useState([])

    // filter search terms report by date
    const onChangeDate = (e) => {
        setDate(e.target.value);
        setSearchTerms([])

    }

    // messages to inform users
    const [messageSearchTerms, setMessageSearchTerms] = useState(' Fetching your data... It can take a few seconds.')

    // when user clicks on search terms report button
    // open modal with search terms report
    const [modalSearchTermShow, setModalSearchTermShow] = useState(false)

    const getSearchTermsReport = () => {
        // open modal
        setModalSearchTermShow(true)

        // tell user you are getting info
        setMessageSearchTerms(' Fetching information on search terms... It can take a few seconds.')

        // data to send to the API
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'date_range': date
        }
        console.log(data)

        // get search terms report from api
        fetch('http://127.0.0.1:8000/api/get-search-terms-report/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => setSearchTerms(resp))
        .then(resp => {
            if (resp !== null) {
                setMessageSearchTerms('')
            } else {
                setMessageWarning('There was a problem and we could not get budget recommendations.')
            }

            })
        .catch(error => console.log(error));
    }
    
    // when user clicks on negative keywords button
    // open modal to edit negative keywords
    const [modalNegativeKeywords, setModalNegativeKeywords] = useState(false)

    // store negative keyword themes from Google Ads API
    const [negativeKeywords, setNegativeKeywords] = useState([])

    // messages to inform users we are getting the negative keywords info
    const [messageNegativeKeywords, setMessageNegativeKeywords] = useState(' Fetching your data... It can take a few seconds.')

    const [messageEditingNegativeKeywords, setMessageEditingNegativeKeywords] = useState('')

    const openNegativeKeywords = () => {
        // open modal
        setModalNegativeKeywords(true)

        // tell user you are getting info
        setMessageNegativeKeywords(' Fetching your data... It can take a few seconds.')

        // data to send to the API
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID']
        }
        console.log(data)

        // get negative keywords of smart campaign from api
        fetch('http://127.0.0.1:8000/api/get-negative-keywords/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => setNegativeKeywords(resp))
        .then(resp => {
            if (resp !== null) {
                setMessageNegativeKeywords('')
            } else {
                setMessageWarning('There was a problem and we could not get the negative keyword themes.')
            }

            })
        .catch(error => console.log(error));
    }

    // store user's text input for negative keyword theme
    const [negativeKeyword, setNegativeKeyword] = useState("")
    const [negativeKeywordCharacters, setNegativeKeywordCharacters] = useState()

    // add the negative keyword themes selected from the suggestions
    const onChangeNegativeKeyword = (e) => {
        setNegativeKeyword(e.target.value);
        setNegativeKeywordCharacters(e.target.value.length)
    }

    // when user clicks on ADD the negative keyword they input in the text field
    const addNegativeKeywordToList = () => {
        // only add it if it hasn't been already added
        if (negativeKeywords.indexOf(negativeKeyword) === -1) {
            setNegativeKeywords([...negativeKeywords, negativeKeyword])
        }
    }

    // when user removes a negative keyword
    const removeNegativeKeyword = (e) => {
        const itemToRemove = e.currentTarget.value
        const newArray = negativeKeywords.filter(el => el !== itemToRemove)
        setNegativeKeywords(newArray) 
    }

    // send edits of negative keywords to Google Ads API
    const onClickEditNegativeKeywords = () => {

        // tell user you are changing the negative keyword themes of the campaign
        setMessageEditingNegativeKeywords(' Changing the categories of negative keywords... It can take a few seconds.')

        // data to send to Google to edit keyword themes
        const data = { 
            'refreshToken': refreshToken['refreshToken'],
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'display_name': JSON.stringify(negativeKeywords), 
        }
        console.log('data sent to the backend')
        console.log(data)

        fetch('http://127.0.0.1:8000/api/edit-negative-keywords/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => {
            // console.log(resp)
            if (resp.length > 0) {
                setNegativeKeywords(resp)
                setMessageEditingNegativeKeywords('')
            } 
        })
        .catch(error => console.log(error))

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

    // fetch data to API when user selects a new date to filter the info
    useEffect(() => {
        // tell user you are getting info
        setMessageSearchTerms(' Fetching information on search terms... It can take a few seconds.')

        // data to send to the API
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'date_range': date
        }
        console.log(data)

        // get search terms report from api
        fetch('http://127.0.0.1:8000/api/get-search-terms-report/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => setSearchTerms(resp))
        .then(resp => {
            if (resp !== null) {
                setMessageSearchTerms('')
            } else {
                setMessageWarning('There was a problem and we could not get budget recommendations.')
            }

            })
        .catch(error => console.log(error));

    }, [date, customerId, campaignId, refreshToken, token])

    // when user clicks on EDIT button of Ad creative card
    // open modal to offer edits
    const [modalAdCreative, setModalAdCreative] = useState(false)

    // when user clicks on EDIT button of keyword themes card
    // open modal to offer edits
    const [modalKeywords, setModalKeywords] = useState(false)

    // keyword themes state management
    const [keywordOne, setKeywordOne] = useState("")

    // to display number of characters for each keyword theme
    const [keywordOneCharacters, setKeywordOneCharacters] = useState(0)

    // capture the keyword themes suggestions sent by Google's API
    const [keywordSuggestions, setKeywordSuggestions] = useState([])

    // store the keyword themes suggestions that the user selects
    const [selectedKeywordThemes, setSelectedKeywordThemes] = useState([])

    // store the updated keyword themes after making changes
    const [updatedKeywordThemes, setUpdatedKeywordThemes] = useState([])

    // set first keyword theme
    const onChangeKeywordOne = (e) => {
        setKeywordOne(e.target.value);
        setKeywordOneCharacters(e.target.value.length)
    }

    const [messageWarning2, setMessageWarning2] = useState('')

    // get keyword themes suggestions from API
    const keywordThemesSuggestions = () => {
        // if there was a warning message, remove it
        setMessageWarning('');
        setMessageWarning2('');
        // tell user it can take a few seconds to show results
        setMessageAddKeyword(' Fetching recommendations... It can take a few seconds.');

        // data to send to Google to get keyword theme recommendations
        const data_keywords = { 
            'refreshToken': refreshToken['refreshToken'],
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'keyword_text': keywordOne, 
            'country_code': campaignInfo[0].country_code, 
            'language_code': campaignInfo[0].language_code,
            'final_url': campaignInfo[0].final_url,
            'business_name': campaignInfo[0].business_name,
            'geo_target_names': JSON.stringify(campaignInfo[0].geo_targets),
        }

        // if keyword theme is already selected, do not add it again to the object
        if ((selectedKeywordThemes.indexOf(toTitleCase(keywordOne)) === -1) && 
        keywordOneCharacters > 0 && 
        selectedKeywordThemes.length < 7) {
            setSelectedKeywordThemes([...selectedKeywordThemes, toTitleCase(keywordOne)])
        } else if (selectedKeywordThemes.length > 6) {
            setMessageWarning2('Remove one category to add this one.');
        }
        console.log(data_keywords)

        fetch('http://127.0.0.1:8000/api/keywords-recommendations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data_keywords),
            
        })
        .then(resp => resp.json())
        .then(resp => {
            // console.log(resp)
            if (resp.length > 0) {
                setKeywordSuggestions(resp)
                setMessageAddKeyword('')
            } else if (resp.length === 0) {
                setMessageWarning('Please try again. No recommendations for that category.')
            }
        })
        .catch(error => console.log(error))

    }

    // add the keyword themes selected from the suggestions
    const addSelectedKeyTheme = (e) => {
        if (selectedKeywordThemes.length < 7) {
            // remove warning message
            setMessageWarning('')
            // add it to the selected array
            setSelectedKeywordThemes([...selectedKeywordThemes, e.currentTarget.value]);
            // remove it from the suggestion array
            const itemToRemove = e.currentTarget.value
            const newArray = keywordSuggestions.filter(el => el !== itemToRemove);
            setKeywordSuggestions(newArray);
        } else {
            setMessageWarning('Remove selected categories to add new ones.')
        }
        
    }
    
    // remove the keyword theme from the selection
    const removeSelectedKeyTheme = (e) => {
        // remove it from the selected array
        const itemToRemove = e.currentTarget.value
        const newArray = selectedKeywordThemes.filter(el => el !== itemToRemove)
        setSelectedKeywordThemes(newArray)
        // add it again to the suggestion array if it's not already there
        if (keywordSuggestions.indexOf(itemToRemove) === -1) {
            setKeywordSuggestions([...keywordSuggestions, itemToRemove])
        } 
        
    }

    // send changes of keywords to Google's servers
    const onClickEditKeywords = () => {
        // close modal
        setModalKeywords(false)

        // tell user you are changing the keyword themes of the campaign
        setMessageEditingKeywords(' Changing the categories of keywords... It can take a few seconds.')

        // data to send to Google to edit keyword themes
        const data = { 
            'refreshToken': refreshToken['refreshToken'],
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'display_name': JSON.stringify(selectedKeywordThemes), 
        }
        console.log('data sent to the backend')
        console.log(data)

        fetch('http://127.0.0.1:8000/api/sc-settings/edit-keywords/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => {
            // console.log(resp)
            if (resp.length > 0) {
                setUpdatedKeywordThemes(resp)
                setMessageEditingKeywords('')
            } 
        })
        .catch(error => console.log(error))

    }

    // edit keywords ends here

    // edit target locations starts here

    // when user clicks on EDIT button of target locations card
    // open modal to offer edits
    const [modalGeoTargets, setModalGeoTargets] = useState(false)

    // object to store the locations selected by users
    const [location_targeting, setLocation_targeting] = useState([])

    // object to manage location input
    const [location_input, setLocation_input] = useState('')

    // capture the location suggestions sent by Google's API from the text user input in text field
    const [locationSuggestions, setLocationSuggestions] = useState([])

    // capture the additional location suggestions sent by Google's API from the selected recommendations
    const [additional_locationSuggestions, setAdditional_locationSuggestions] = useState([])

    // store the updated geo targets after making changes
    const [updatedGeoTargets, setUpdatedGeoTargets] = useState([])

    // add the location the user input in the text field
    // and get recommendations from API
    const addLocation = (e) => {
        if (location_input.length > 0 && 
            // add location if it has not been added yet to the selected object
            (location_targeting.indexOf(toTitleCase(location_input)) === -1)) {
            // eliminate warning message of no input in text box
            setMessageWarning('')
            // add message that we are looking for recommendations
            setMessageGeoTargetRecommendations(' Fetching recommendations... It can take a few seconds.')
            // add it to the selected array
            setLocation_targeting([...location_targeting, toTitleCase(location_input)]);

            // data to send to the backend and then to the API
            const data = { 
                'refreshToken': refreshToken['refreshToken'], 
                'location': location_input, 
                'country_code': campaignInfo[0].country_code, 
                'language_code': campaignInfo[0].language_code,
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
                    setMessageGeoTargetRecommendations('')
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
        const data_recomm = { 
            'refreshToken': refreshToken['refreshToken'], 
            'location': selectedRecomm, 
            'country_code': campaignInfo[0].country_code, 
            'language_code': campaignInfo[0].language_code,
        }

        // call our API to get location recommendations
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

    // set location in location_input state
    const onChangeLocation = (e) => {
        setLocation_input(e.target.value);
    }

    // send changes of geo targets to Google's servers
    const onClickEditGeoTargets = () => {
        // close modal
        setModalGeoTargets(false)

        // tell user you are changing the target locations of the campaign
        setMessageEditingGeoTargets(' Changing the target locations... It can take a few seconds.')

        // data to send to Google to edit keyword themes
        const data = { 
            'refreshToken': refreshToken['refreshToken'],
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'new_geo_target_names': JSON.stringify(location_targeting), 
            'country_code': campaignInfo[0].country_code, 
            'language_code': campaignInfo[0].language_code,
        }
        console.log('data sent to the backend')
        console.log(data)

        fetch('http://127.0.0.1:8000/api/sc-settings/edit-geo-targets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            },
            body: JSON.stringify(data),
            
        })
        .then(resp => resp.json())
        .then(resp => {
            // console.log(resp)
            if (resp.length > 0) {
                setUpdatedGeoTargets(resp)
                setMessageEditingGeoTargets('')
            } 
        })
        .catch(error => console.log(error))

    }

    // edit target locations ends here

    // when user clicks on edit button on the ad schedule card
    // change table row to input buttons to capture ad schedule changes
    const [showEditAdSchedule, setShowEditAdSchedule] = useState(false)
    const enableAdScheduleChange = () => setShowEditAdSchedule(showEditAdSchedule ? false : true)
    const [monStartSchedule, setMonStartSchedule] = useState()
    const [monEndSchedule, setMonEndSchedule] = useState()
    const [tueStartSchedule, setTueStartSchedule] = useState()
    const [tueEndSchedule, setTueEndSchedule] = useState()
    const [wedStartSchedule, setWedStartSchedule] = useState()
    const [wedEndSchedule, setWedEndSchedule] = useState()
    const [thuStartSchedule, setThuStartSchedule] = useState()
    const [thuEndSchedule, setThuEndSchedule] = useState()
    const [friStartSchedule, setFriStartSchedule] = useState()
    const [friEndSchedule, setFriEndSchedule] = useState()
    const [satStartSchedule, setSatStartSchedule] = useState()
    const [satEndSchedule, setSatEndSchedule] = useState()
    const [sunStartSchedule, setSunStartSchedule] = useState()
    const [sunEndSchedule, setSunEndSchedule] = useState()

    // store new campaign schedule returned from API
    const [newCampaignSchedule, setNewCampaignSchedule] = useState([])

    // set ad schedule
    const changeMonStartSchedule = (e) => {
        setMonStartSchedule(e.target.value)
    }
    const changeMonEndSchedule = (e) => {
        setMonEndSchedule(e.target.value);
    }
    const changeTueStartSchedule = (e) => {
        setTueStartSchedule(e.target.value)
    }
    const changeTueEndSchedule = (e) => {
        setTueEndSchedule(e.target.value);
    }
    const changeWedStartSchedule = (e) => {
        setWedStartSchedule(e.target.value)
    }
    const changeWedEndSchedule = (e) => {
        setWedEndSchedule(e.target.value);
    }
    const changeThuStartSchedule = (e) => {
        setThuStartSchedule(e.target.value)
    }
    const changeThuEndSchedule = (e) => {
        setThuEndSchedule(e.target.value);
    }
    const changeFriStartSchedule = (e) => {
        setFriStartSchedule(e.target.value)
    }
    const changeFriEndSchedule = (e) => {
        setFriEndSchedule(e.target.value);
    }
    const changeSatStartSchedule = (e) => {
        setSatStartSchedule(e.target.value)
    }
    const changeSatEndSchedule = (e) => {
        setSatEndSchedule(e.target.value);
    }
    const changeSunStartSchedule = (e) => {
        setSunStartSchedule(e.target.value)
    }
    const changeSunEndSchedule = (e) => {
        setSunEndSchedule(e.target.value);
    }

    // send new schedule to Google
    const onClickSendNewSchedule = () => {
        // show again the table with ad schedule
        setShowEditAdSchedule(false)
        // tell user you are changing the ad schedule of the campaign
        setMessageEditingAdSchedule(' Changing campaign ad schedule... It can take a few seconds.');
                        
        // data to send to the backend
        const data = { 
            'refreshToken': refreshToken['refreshToken'], 
            'customer_id': customerId['customerID'], 
            'campaign_id': campaignId['campaignID'],
            'mon_start': monStartSchedule,
            'mon_end': monEndSchedule,
            'tue_start': tueStartSchedule,
            'tue_end': tueEndSchedule,
            'wed_start': wedStartSchedule,
            'wed_end': wedEndSchedule,
            'thu_start': thuStartSchedule,
            'thu_end': thuEndSchedule,
            'fri_start': friStartSchedule,
            'fri_end': friEndSchedule,
            'sat_start': satStartSchedule,
            'sat_end': satEndSchedule,
            'sun_start': sunStartSchedule,
            'sun_end': sunEndSchedule,
        }
        console.log('data to send to backend for ad schedule')
        console.log(data)

        fetch('http://127.0.0.1:8000/api/sc-settings/edit-ad-schedule/', {
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
            if (resp.length > 0) {
                setNewCampaignSchedule(resp)
                setMessageEditingAdSchedule('')
            } else if (resp === null) {
                // console.log(resp);
                setMessageEditingAdSchedule('')
                setMessageWarning('Error when trying to change ad schedule of the campaign.')

            }
        })
        .catch(error => console.log(error))

    }
    // end of edit ad schedule

    // go back button
    const goBack = () => {
        
        history.push('/campaigns')
        
    }


    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" 
        style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Campaign Information
        </h4> 

        <br/>
        <button type="button" className="btn btn-link" name="go back" 
        onClick={goBack} 
        style={{ color: 'black' }}>
            <i className="fas fa-arrow-left fa-2x"></i>
        </button>
        <br/>
        <br/>
        {message ? <Message msg={message} /> : null}
        {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
        {messageSuccess ? <MessageSuccess msg={messageSuccess} /> : null}
        <br/>
        <br/>
        
        {/* here starts the info about the campaign settings */}
        {campaignInfo.map(item => {
            return(
                <div className="container" key={item.ad_id}>
                    {/* card with campaign name, status, budget, and metrics starts here */}
                    <div className="card">
                        <div className="card-body">
                            {showEditName ? 
                            // button to edit campaign name when user clicks on pencil icon
                            <Fragment>
                            <div className="row">
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" id="enter_campaign_name"
                                    name="enter_campaign_name" placeholder={item.campaign_name}
                                    value={campaignName ? campaignName : item.campaign_name}
                                    onChange={onChangeCampaignName}></input>
                                </div>
                                <div className="col-sm-1">
                                    <button type="button" className="btn btn-primary"
                                    onClick={onClickSendNewName}>
                                        SAVE
                                    </button>
                                </div>
                                <div className="col-sm-1">
                                    <button type="button" className="btn btn-outline-primary"
                                    onClick={enableNameChange}>
                                        CANCEL
                                    </button>
                                </div>

                            </div>
                            
                            </Fragment> :
                            // campaign name used as title 
                            <h5 className="card-title" font="gotham-rounded-bold" 
                            style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
                                {newCampaignName ? newCampaignName[0].new_campaign_name : item.campaign_name}
                                <i className="fas fa-pencil-alt fa-fw fa-xs"
                                style={{marginLeft: '5px', color:'black', cursor: 'pointer'}}
                                onClick={enableNameChange}></i>
                            </h5>
                            }
                            <br/>
                            <div className="row">
                                <div className="col-sm-1">
                                    <label>
                                        Status: 
                                    </label>
                                </div>
                                <div className="col-sm-2">
                                    <div className="btn-group" >
                                        <select className="form-select form-select-sm" 
                                        onChange={onChangeStatus} value={status ? status : item.status} 
                                        aria-label="Change the status of the campaign"
                                        style={{color: new_status ? 
                                            (new_status[0].new_status === "Active") && 'white' : 
                                            (item.status === "Active") && 'white', 
                                        backgroundColor: new_status ? 
                                        (new_status[0].new_status === "Active") && 'rgb(112, 153, 21)' : 
                                        (item.status === "Active") && 'rgb(112, 153, 21)'}}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Paused">Paused</option>
                                            <option value="Deleted">Deleted</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    {String(item.impressions).replace(/(.)(?=(\d{3})+$)/g,'$1,')} impressions
                                </div>
                                <div className="col-sm-2">
                                    {String(item.interactions).replace(/(.)(?=(\d{3})+$)/g,'$1,')} clicks
                                </div>
                                <div className="col-sm-2">
                                    {String(item.conv).replace(/(.)(?=(\d{3})+$)/g,'$1,')} conversions
                                </div>
                                <div className="col-sm-2">
                                    ${String(item.conv_value).replace(/(.)(?=(\d{3})+$)/g,'$1,')} conversions
                                </div>
                            </div>
                            <br/>
                            <div className="col-sm-4">
                                Budget: ${newBudget ? 
                                newBudget[0].new_budget_micros/1000000 :
                                item.budget_micros/1000000} per day
                                <i className="fas fa-pencil-alt fa-fw"
                                style={{marginLeft: '5px', cursor: 'pointer'}}
                                onClick={getBudgetRecomm}></i>
                            </div>

                            {/* start of budget modal */}
                            
                            <Modal show={modalShow} size="lg" centered
                                aria-labelledby="contained-modal-title-vcenter">
                                <Modal.Header closeButton onClick={() => setModalShow(false)}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Edit budget ({budget_recommendations.currency})
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                {message ? <Message msg={message} /> : null}
                                {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
                                <p>Current budget: ${newBudget ? 
                                newBudget[0].new_campaign_budget/1000000 : 
                                campaignInfo[0].budget_micros/1000000} per day</p>
                                <br/>
                                <br/>
                                <div className="list-group" role="group">
                                    <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
                                    color: (budget === 'high') && 'rgb(30,136,229)'}}>
                                        <input className="form-check-input me-1" type="radio" value="high" 
                                        onChange={onChangeBudget} 
                                        checked={ budget === "high"}/>
                                        ${budget_recommendations.high/1000000} per day / 
                                        ${Math.ceil(budget_recommendations.high/1000000*30.4)} max per month  
                                        | Between {String(Math.round(budget_recommendations.high_min_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} and {String(Math.round(budget_recommendations.high_max_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} potential customers per month
                                    </label>
                                    <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
                                    color: (budget === 'recommended') && 'rgb(30,136,229)'}}>
                                        <input className="form-check-input me-1" type="radio" value="recommended" 
                                        onChange={onChangeBudget} 
                                        checked={ budget === "recommended"}/>
                                        ${budget_recommendations.recommended/1000000} per day / 
                                        ${Math.ceil(budget_recommendations.recommended/1000000*30.4)} max per month 
                                        | Between {String(Math.round(budget_recommendations.recommended_min_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} and {String(Math.round(budget_recommendations.recommended_max_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} potential customers per month
                                    </label>
                                    <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
                                    color: (budget === 'low') && 'rgb(30,136,229)'}}>
                                        <input className="form-check-input me-1" type="radio" value="low" 
                                        onChange={onChangeBudget} 
                                        checked={ budget === "low"}/>
                                        ${budget_recommendations.low/1000000} per day / 
                                        ${Math.ceil(budget_recommendations.low/1000000*30.4)} max per month 
                                        | Between {String(Math.round(budget_recommendations.low_min_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} and {String(Math.round(budget_recommendations.low_max_clicks*30.4)).replace(/(.)(?=(\d{3})+$)/g,'$1,')} potential customers per month
                                    </label>
                                    <small className= "form-text text-muted">
                                        Every click to your ad is considered a potential customer.
                                    </small>
                                    <br/>
                                    <br/>
                                    <label className="list-group-item list-group-item-action" style={{ cursor: 'pointer', 
                                    color: (budget === 'custom') && 'rgb(30,136,229)'}}>
                                        <input className="form-check-input me-1" type="radio" value="custom" 
                                        onChange={onChangeBudget} 
                                        checked={ budget === "custom"}/>
                                        Enter other budget
                                    </label>
                                    {budget === "custom" && 
                                    <Fragment>
                                        <br/>
                                        <label>Budget per day in {budget_recommendations.currency}</label>
                                        <br/>
                                        {messageError && <MessageError msg={messageError} />}
                                        <div className="row">
                                            <div className="col-sm-2" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <input type="number" className="form-control" id="custom_budget" name="custom_budget"
                                                min="0" onChange={changeBudget} />
                                            </div>
                                            <div className="col-sm-4" style={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                                                {custom_budget && <label>${Math.ceil(custom_budget*30.4)} max per month</label>}
                                            </div>
                                        </div>
                                    </Fragment>}
                                </div>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => setModalShow(false)}>CLOSE</Button>
                                <Button variant="primary" onClick={onClickEditBudget}>SAVE</Button>
                                </Modal.Footer>
                            </Modal>
                            {/* end of budget modal */}
                        </div>
                    </div>
                    <br/>
                    <br/>
                    {/* card with campaign name, status, budget, and metrics ends here */}
                    
                    {/* card with ad creative starts here */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title" font="gotham-rounded-bold" 
                            style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
                                Ad creative
                            </h5>
                            <br/>
                            <p className="card-text">
                                <strong>Ad</strong> • {item.final_url}
                            </p>
                            <p className="card-text" 
                            style={{fontSize:'20px', color:'rgb(71,17,209)'}}>
                                <strong>
                                    {newAdCreative ? newAdCreative[0].new_head_1_api : item.headline_1} | {newAdCreative ? newAdCreative[0].new_head_2_api : item.headline_2} | {newAdCreative ? newAdCreative[0].new_head_3_api : item.headline_3}
                                </strong>
                            </p>
                            <p className="card-text" style={{fontSize:'16px'}}>
                            {newAdCreative ? newAdCreative[0].new_desc_1_api : item.desc_1} {newAdCreative ? newAdCreative[0].new_desc_2_api : item.desc_2}
                            </p>
                            <br/>
                            <button type="button" className="btn btn-outline-primary"
                            onClick={() => setModalAdCreative(true)}>
                                EDIT
                            </button>
                        </div>
                    </div>
                    {/* start of edit ad creatives modal */}
                    <Modal show={modalAdCreative} size="lg" centered
                        aria-labelledby="contained-modal-title-vcenter">
                        <Modal.Header closeButton onClick={() => setModalAdCreative(false)}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit your ad
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        
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
                        {((item.headline_1.length !== 0) || (headlineOneUser.length !== 0)) &&
                        <Fragment>
                        <label>Ad preview:</label>
                        <div className="card">
                        <div className="card-body">
                            <p className="card-text">
                                <strong>Ad</strong> • {item.final_url}
                            </p>
                            <p className="card-text" 
                            style={{fontSize:'20px', color:'rgb(71,17,209)'}}>
                                <strong>
                                {headlineOneUser ? headlineOneUser : item.headline_1} | {headlineTwoUser ? headlineTwoUser : item.headline_2} | {headlineThreeUser ? headlineThreeUser : item.headline_3}
                                </strong>
                            </p>
                            <p className="card-text" style={{fontSize:'16px'}}>
                            {descOneUser ? descOneUser : item.desc_1} {descTwoUser ? descTwoUser : item.desc_2}
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
                            value={headlineOneUser ? headlineOneUser : item.headline_1}></textarea>
                            <small className="form-text text-muted">
                                {headlineOneUserCharacters ? 
                                headlineOneUserCharacters : 
                                item.headline_1.length}/30 characters.
                            </small>
                            <br/>
                            <br/>

                            <label>Headline 2</label>
                            <br/>
                            <textarea className="form-control" placeholder="Enter second headline for your ad..." 
                            id="headline_2" rows="1" maxLength="30"
                            onChange={onChangeHeadlineTwo} 
                            value={headlineTwoUser ? headlineTwoUser : item.headline_2}></textarea>
                            <small className="form-text text-muted">
                                {headlineTwoUserCharacters ? 
                                headlineTwoUserCharacters : 
                                item.headline_2.length}/30 characters.
                            </small>
                            <br/>
                            <br/>

                            <label>Headline 3</label>
                            <br/>
                            <textarea className="form-control" placeholder="Enter third headline for your ad..." 
                            id="headline_3" rows="1" maxLength="30"
                            onChange={onChangeHeadlineThree} 
                            value={headlineThreeUser ? headlineThreeUser : item.headline_3}></textarea>
                            <small className="form-text text-muted">
                                {headlineThreeUserCharacters ? 
                                headlineThreeUserCharacters : 
                                item.headline_3.length}/30 characters.
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
                            value={descOneUser ? descOneUser : item.desc_1}></textarea>
                            <small className="form-text text-muted">
                                {descOneUserCharacters ? 
                                descOneUserCharacters : 
                                item.desc_1.length}/90 characters.
                            </small>
                            <br/>
                            <br/>

                            <label>Description 2</label>
                            <br/>
                            <textarea className="form-control" placeholder="Enter second description for your ad..." 
                            id="desc_2" rows="2" maxLength="90"
                            onChange={onChangeDescTwo} 
                            value={descTwoUser ? descTwoUser : item.desc_2}></textarea>
                            <small className="form-text text-muted">
                                {descTwoUserCharacters ? 
                                descTwoUserCharacters : 
                                item.desc_2.length}/90 characters.
                            </small>
                            <br/>
                            <br/>
                            {messageError && <MessageError msg={messageError} />}
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalAdCreative(false)}>CLOSE</Button>
                        <Button variant="primary" onClick={onClickEditAdCreative}>SAVE</Button>
                        </Modal.Footer>
                    </Modal>
                    {/* end of edit ad creatives modal */}
                    <br/>
                    <br/>
                    {/* card with ad creative ends here */}

                    <div>

                    {/* keyword themes settings starts */}
                    <div className="card">
                        <div className="card-body" font="gotham-rounded-bold">
                            <h5 className="card-title" font="gotham-rounded-bold" 
                            style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
                                Categories of keywords
                            </h5>
                            <p>
                            If there are certain words or phrases your customers use, 
                            consider including them as a category of keywords.
                            </p>
                            {messageEditingKeywords && 
                            <Fragment>
                            <br/>
                            <Message msg={messageEditingKeywords} />
                            <br/>
                            </Fragment>
                            }
                            <Fragment>
                                <br/>
                                <label>Selected category keywords:</label>
                                <br/>
                                {updatedKeywordThemes.length > 1 ? 
                                <Fragment>
                                    {
                                    updatedKeywordThemes.length === 7 ? 
                                    <small className= "form-text text-success">7 categories selected. 
                                    If you want to add more, create a new campaign or delete selected ones.</small> :
                                    <small className="form-text text-muted">
                                        You can select {7 - updatedKeywordThemes.length} more.
                                    </small>
                                    }
                                </Fragment> :
                                <Fragment>
                                    {
                                    item.keyword_themes.length === 7 ? 
                                    <small className= "form-text text-success">7 categories selected. 
                                    If you want to add more, create a new campaign or delete selected ones.</small> :
                                    <small className="form-text text-muted">
                                        You can select {7 - item.keyword_themes.length} more.
                                    </small>
                                    }
                                </Fragment>
                                }
                            </Fragment>
                            <div className="row">
                            {updatedKeywordThemes.length > 1 ?
                                <Fragment>
                                {updatedKeywordThemes.map(item => {
                                    return <div className="col-sm" style={{paddingTop: '10px'}} key={item}>
                                    <button type="button" className="btn btn-outline-secondary btn-sm" 
                                    style={{whiteSpace: 'nowrap'}} 
                                    value={item} 
                                    key={item}>
                                        
                                        {item}
                                    </button>
                                </div>
                                })}
                                </Fragment> :
                                <Fragment>
                                {item.keyword_themes.map(item => {
                                    return <div className="col-sm" style={{paddingTop: '10px'}} key={item}>
                                    <button type="button" className="btn btn-outline-secondary btn-sm" 
                                    style={{whiteSpace: 'nowrap'}} 
                                    value={item} 
                                    key={item}>
                                        
                                        {item}
                                    </button>
                                </div>
                                })}
                                </Fragment>
                            }
                            </div>
                            <br/>
                            <br/>
                            {/* start of edit keywords modal */}
                            <Modal show={modalKeywords} size="lg" centered
                                aria-labelledby="contained-modal-title-vcenter">
                                <Modal.Header closeButton onClick={() => setModalKeywords(false)}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Edit your categories of keywords
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                
                                <p><strong>Edit categories of keywords</strong></p>

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
                                    {messageAddKeyword ? <Message msg={messageAddKeyword} /> : null}
                                    {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
                                    {messageWarning2 ? <MessageWarning msg={messageWarning2} /> : null}
                                    <br/>
                                <Fragment>
                                <label>Selected category keywords:</label>
                                <br/>
                                {selectedKeywordThemes.length === 7 ? 
                                <small className= "form-text text-success">7 categories selected. 
                                If you want to add more, create a new campaign or delete selected ones.</small> :
                                <small className="form-text text-muted">
                                    You can select {7 - selectedKeywordThemes.length} more.
                                </small>}
                                </Fragment>
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
                                   
                                    <br/>
                                    <br/>
                                    {selectedKeywordThemes.length > 0 && 
            
                                    <Fragment>
                                    
                                        {keywordSuggestions.length > 0 && 
                                        <Fragment>
                                            <br/>
                                            <br/>
                                            <label>Recommended category keywords:</label>
                                            <br/>
                                            {keywordOne ? 
                                            <small className="form-text text-muted">
                                                {keywordSuggestions.length} recommendations for {keywordOne}.
                                            </small> :
                                            <small className="form-text text-muted">
                                                Enter a new category to get more recommendations.
                                            </small>
                                            }
                                        </Fragment>
                                        }
                                        <div className="container">
                                            {keywordSuggestions.length > 0 &&
                                            <Fragment>
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
                                            </Fragment>
                                            }
                                            
                                        </div>
                                    </Fragment>
                                }
                                </div>
                               
                                    <br/>
                                    <br/>
                                    {messageError && <MessageError msg={messageError} />}
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => setModalKeywords(false)}>CLOSE</Button>
                                <Button variant="primary" onClick={onClickEditKeywords}>SAVE</Button>
                                </Modal.Footer>
                            </Modal>
                            {/* end of edit keywords modal */}
                            {/* start of search terms modal */}
                            <Modal show={modalSearchTermShow} size="lg" centered
                                aria-labelledby="contained-modal-title-vcenter">
                                <Modal.Header closeButton onClick={() => setModalSearchTermShow(false)}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Search terms report
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                {messageSearchTerms ? <Message msg={messageSearchTerms} /> : null}
                                {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
                                {(searchTerms && searchTerms.length < 1) && <MessageWarning msg="No search terms data to show yet." />}
                                <p>Here's what people searched for before seeing and clicking your ads.</p>
                                <br/>
                                <br/>
                                {/* filter by date starts */}
                                <div className="col-sm" align='left'>
                                    <p><i className="fas fa-filter"></i>  Filter by date</p>
                            
                                    <div className="btn-group" >
                                        
                                    <select className="form-select form-select-sm" onChange={onChangeDate} value={date} aria-label="Filter table by date">
                                            
                                            <option value="TODAY">Today</option>
                                            <option value="YESTERDAY">Yesterday</option>
                                            <option value="THIS_WEEK_SUN_TODAY">This week (Sun - Today)</option>
                                            <option value="LAST_7_DAYS">Last 7 days</option>
                                            <option value="LAST_14_DAYS">Last 14 days</option>
                                            <option value="THIS_MONTH">This month</option>
                                            <option value="LAST_30_DAYS">Last 30 days</option>
                                            <option value="LAST_MONTH">Last month</option>
                                            <option value="ALL_TIME">All time</option>
                                        </select>
                                    </div>
                                </div>
                                <br/>
                                {/* filter by date starts */}

                                {/* search terms table starts */}
                                <table className="table table-bordered table-hover table-responsive">
                                    <thead className="thead-light" style={{backgroundColor: 'rgb(248,172,6)'}}>
                                    <tr key="search_terms_table" style={{ textAlign: 'center', verticalAlign: 'top'}}>
                                        <th key="search_terms" scope="col">Search terms</th>
                                        <th key="clicks" scope="col">Clicks</th>
                                        <th key="cost" scope="col">Spend</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {searchTerms.map(item => {
                                            return <tr key={item.search_term} id={item.search_term} value={item.search_term} 
                                            style={{ textAlign: 'center'}}>
                                                <td> {item.search_term}</td>
                                                <td> {String(item.search_term_clicks).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                                <td> ${String(item.search_term_cost).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                                            </tr>
                                        })}  
                                    </tbody>        
                                </table>
                                {/* search terms table ends */}
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => setModalSearchTermShow(false)}>CLOSE</Button>
                                </Modal.Footer>
                            </Modal>
                            {/* end of search terms modal */}
                            {/* start of negative keywords modal */}
                            <Modal show={modalNegativeKeywords} size="lg" centered
                                aria-labelledby="contained-modal-title-vcenter">
                                <Modal.Header closeButton onClick={() => setModalNegativeKeywords(false)}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Category of Negative Keywords
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                {/* message saying you are getting the negative keywords of the campaign */}
                                {messageNegativeKeywords ? <Message msg={messageNegativeKeywords} /> : null}
                                {/* message saying you are sending the changes of the negative keywords */}
                                {messageEditingNegativeKeywords ? <Message msg={messageEditingNegativeKeywords} /> : null}
                                {/* message saying that the campaign has no negative keyword themes yet */}
                                {(negativeKeywords && negativeKeywords.length < 1) && <MessageWarning msg="Your campaign is not using negative keywords." />}
                                <p>Category of keywords can also be used to exclude targeting.
                                    For example, you can create negative category of keywords to 
                                    exclude your ads from appearing when people search for free products.
                                </p>
                                <br/>
                                <br/>
                                {/* negative keywords starts */}
                                <label>Category of negative keywords</label>
                                <br/>
                                    <textarea className="form-control" 
                                    placeholder="Enter category of negative keywords..." 
                                    id="keyword_text" rows="1" maxLength="30"
                                    onChange={onChangeNegativeKeyword} value={negativeKeyword}>
                                    </textarea>
                                    <small className= "form-text text-muted">
                                        {negativeKeywordCharacters ? negativeKeywordCharacters : 0}/30 characters.
                                    </small>
                                    <br/>
                                    <br/>
                                    {negativeKeywordCharacters > 0 && 
                                    <Fragment>
                                        <button onClick={addNegativeKeywordToList} className="btn btn-success">
                                        ADD
                                        </button>
                                        <br/>
                                        <br/>
                                    </Fragment>
                                    }
                                    {messageAddKeyword ? <Message msg={messageAddKeyword} /> : null}
                                    {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
                                    {messageWarning2 ? <MessageWarning msg={messageWarning2} /> : null}
                                    <br/>
                                <label>Selected category of negative keywords:</label>
                                <br/>
                                <small className="form-text text-muted">
                                    {negativeKeywords.length} selected.
                                </small>
                                <div className="row">
                                    {negativeKeywords.map(item => {
                                        return <div className="col-sm" style={{paddingTop: '10px'}} key={item}>
                                        <button type="button" className="btn btn-primary btn-sm" 
                                        style={{whiteSpace: 'nowrap'}} 
                                        value={item} 
                                        key={item}
                                        onClick={removeNegativeKeyword}>
                                            
                                            {item}
                                            <i className="fas fa-times fa-fw" 
                                            style={{marginLeft: '5px'}}
                                            key={item}></i>
                                        </button>
                                    </div>
                                    })}
                                </div>
                                    <br/>
                                    <br/>
                                {/* negative keywords ends */}
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => setModalNegativeKeywords(false)}>CLOSE</Button>
                                <Button variant="primary" onClick={onClickEditNegativeKeywords}>SAVE</Button>
                                </Modal.Footer>
                            </Modal>
                            {/* end of negative keywords modal */}
                            <div className="row">
                                <div className="col-sm-2">
                                <button type="button" className="btn btn-outline-primary"
                                onClick={() => setModalKeywords(true)}>
                                    EDIT
                                </button>
                                </div>
                                <div className="col-sm-4">
                                <button type="button" className="btn btn-link" 
                                onClick={getSearchTermsReport}>
                                    SEARCH TERMS REPORT
                                </button> 
                                </div>
                                <div className="col-sm-4">
                                <button type="button" className="btn btn-link" 
                                onClick={openNegativeKeywords}>
                                    NEGATIVE KEYWORDS
                                </button> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>

                    {/* keyword themes settings ends */}

                    {/* geo targeting location setting starts */}
                    <div className="card" font="gotham-rounded-bold">
                        <div className="card-body">
                            <h5 className="card-title" 
                            style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
                                Target locations
                            </h5>
                            {messageEditingGeoTargets && 
                            <Fragment>
                            <br/>
                            <Message msg={messageEditingGeoTargets} />
                            <br/>
                            </Fragment>
                            }
                            <p className="card-text">
                                Your ads show to people physically or regularly in the locations you select, 
                                and to people who express interest in these locations.
                            </p>
                            <label>Selected locations:</label>
                            <br/>
                            {updatedGeoTargets.length > 1 ?
                            <Fragment>
                                <div className="row">
                                    {updatedGeoTargets.map(item => {
                                        return <div className="col-sm" style={{paddingTop: '10px'}} key={item}>
                                        <button type="button" className="btn btn-outline-secondary btn-sm" 
                                        style={{whiteSpace: 'nowrap'}} 
                                        value={item} 
                                        key={item}>
                                            
                                            {item}
                                        </button>
                                    </div>
                                    })}
                                </div>
                            </Fragment> :
                            <Fragment>
                                <div className="row">
                                    {item.geo_targets.map(item => {
                                        return <div className="col-sm" style={{paddingTop: '10px'}} key={item}>
                                        <button type="button" className="btn btn-outline-secondary btn-sm" 
                                        style={{whiteSpace: 'nowrap'}} 
                                        value={item} 
                                        key={item}>
                                            
                                            {item}
                                        </button>
                                    </div>
                                    })}
                                </div>
                            </Fragment>
                            }
                            <br/>
                            <br/>
                            {/* start of edit geo targets modal */}
                            <Modal show={modalGeoTargets} size="lg" centered
                                aria-labelledby="contained-modal-title-vcenter">
                                <Modal.Header closeButton onClick={() => setModalGeoTargets(false)}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Edit your target locations
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                
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

                                {messageGeoTargetRecommendations ? <Message msg={messageGeoTargetRecommendations} /> : null}
                                {messageWarning ? <MessageWarning msg={messageWarning} /> : null}
                                {messageWarning2 ? <MessageWarning msg={messageWarning2} /> : null}
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

                                
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => setModalGeoTargets(false)}>CLOSE</Button>
                                <Button variant="primary" onClick={onClickEditGeoTargets}>SAVE</Button>
                                </Modal.Footer>
                            </Modal>
                            {/* end of edit geo targets modal */}

                            {/* edit button in geo target card */}
                            <button type="button" className="btn btn-outline-primary"
                            onClick={() => setModalGeoTargets(true)}>
                                EDIT
                            </button>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    {/* geo targeting location setting ends */}
                    </div>

                    {/* ad schedule setting starts */}
                    <div className="card" font="gotham-rounded-bold">
                        <div className="card-body">
                            <h5 className="card-title" 
                            style={{color:'rgb(248,172,6)', fontSize:'20px'}}>
                                Ad Schedule
                            </h5>
                            {messageEditingAdSchedule && 
                            <Fragment>
                            <br/>
                            <Message msg={messageEditingAdSchedule} />
                            <br/>
                            </Fragment>
                            }
                            <p className="card-text">
                                You can set up a schedule for your campaign. 
                                This means that your ad will run only during the days and times you want. 
                                For example, many advertisers want their ads to appear during their 
                                opening business hours. 
                            </p>
                            <p className="card-text">
                                Time scale is from 0 to 23hs. For example, 4pm is 16hs.
                            </p>
                            <br/>
                            {showEditAdSchedule ?
                            // see edit fields
                            <Fragment>
                            <table className="table table-bordered table-hover table-responsive">
                                <thead className="thead-light" style={{backgroundColor: 'rgb(248,172,6)'}}>
                                    <tr key="ad_schedule_table" 
                                    style={{ textAlign: 'center', verticalAlign: 'top'}}>
                                        
                                        <th key="day" scope="col" className='col-sm-4'>Day</th>
                                        <th key="hours" scope="col" className='col-sm-2' colSpan={2}>Hours</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={item.MONDAY} id={item.MONDAY} value={item.MONDAY}
                                    style={{ textAlign: 'center'}} >
                                        <td >
                                            Monday
                                        </td>
                                        <td  > 
                                            <input type="number" className="form-control" 
                                            id="monday_start" name="monday_start" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].MONDAY_start_hour : item.MONDAY_start_hour}
                                            onChange={changeMonStartSchedule} />
                                        </td>
                                        <td >
                                            <input type="number" className="form-control" 
                                            id="monday_end" name="monday_end" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].MONDAY_end_hour : item.MONDAY_end_hour}
                                            onChange={changeMonEndSchedule} />
                                        </td>
                                    </tr>
                                    <tr key={item.TUESDAY} id={item.TUESDAY} value={item.TUESDAY}
                                    style={{ textAlign: 'center'}} >
                                        <td >
                                            Tuesday
                                        </td>
                                        <td  > 
                                            <input type="number" className="form-control" 
                                            id="tuesday_start" name="tuesday_start" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].TUESDAY_start_hour : item.TUESDAY_start_hour}
                                            onChange={changeTueStartSchedule} />
                                        </td>
                                        <td >
                                            <input type="number" className="form-control" 
                                            id="tuesday_end" name="tuesday_end" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].TUESDAY_end_hour : item.TUESDAY_end_hour}
                                            onChange={changeTueEndSchedule} />
                                        </td>
                                    </tr>
                                    <tr key={item.WEDNESDAY} id={item.WEDNESDAY} value={item.WEDNESDAY}
                                    style={{ textAlign: 'center'}} >
                                        <td >
                                            Wednesday
                                        </td>
                                        <td  > 
                                            <input type="number" className="form-control" 
                                            id="wednesday_start" name="wednesday_start" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].WEDNESDAY_start_hour : item.WEDNESDAY_start_hour}
                                            onChange={changeWedStartSchedule} />
                                        </td>
                                        <td >
                                            <input type="number" className="form-control" 
                                            id="wednesday_end" name="wednesday_end" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].WEDNESDAY_end_hour : item.WEDNESDAY_end_hour}
                                            onChange={changeWedEndSchedule} />
                                        </td>
                                    </tr>
                                    <tr key={item.THURSDAY} id={item.THURSDAY} value={item.THURSDAY}
                                    style={{ textAlign: 'center'}} >
                                        <td >
                                            Thursday
                                        </td>
                                        <td  > 
                                            <input type="number" className="form-control" 
                                            id="thursday_start" name="thursday_start" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].THURSDAY_start_hour : item.THURSDAY_start_hour}
                                            onChange={changeThuStartSchedule} />
                                        </td>
                                        <td >
                                            <input type="number" className="form-control" 
                                            id="thursday_end" name="thursday_end" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].THURSDAY_end_hour : item.THURSDAY_end_hour}
                                            onChange={changeThuEndSchedule} />
                                        </td>
                                    </tr>
                                    <tr key={item.FRIDAY} id={item.FRIDAY} value={item.FRIDAY}
                                    style={{ textAlign: 'center'}} >
                                        <td >
                                            Friday
                                        </td>
                                        <td  > 
                                            <input type="number" className="form-control" 
                                            id="friday_start" name="friday_start" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].FRIDAY_start_hour : item.FRIDAY_start_hour}
                                            onChange={changeFriStartSchedule} />
                                        </td>
                                        <td >
                                            <input type="number" className="form-control" 
                                            id="friday_end" name="friday_end" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].FRIDAY_end_hour : item.FRIDAY_end_hour}
                                            onChange={changeFriEndSchedule} />
                                        </td>
                                    </tr>
                                    <tr key={item.SATURDAY} id={item.SATURDAY} value={item.SATURDAY}
                                    style={{ textAlign: 'center'}} >
                                        <td >
                                            Saturday
                                        </td>
                                        <td  > 
                                            <input type="number" className="form-control" 
                                            id="saturday_start" name="saturday_start" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].SATURDAY_start_hour : item.SATURDAY_start_hour}
                                            onChange={changeSatStartSchedule} />
                                        </td>
                                        <td >
                                            <input type="number" className="form-control" 
                                            id="saturday_end" name="saturday_end" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].SATURDAY_end_hour : item.SATURDAY_end_hour}
                                            onChange={changeSatEndSchedule} />
                                        </td>
                                    </tr>
                                    <tr key={item.SUNDAY} id={item.SUNDAY} value={item.SUNDAY}
                                    style={{ textAlign: 'center'}} >
                                        <td >
                                            Sunday
                                        </td>
                                        <td  > 
                                            <input type="number" className="form-control" 
                                            id="sunday_start" name="sunday_start" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].SUNDAY_start_hour : item.SUNDAY_start_hour}
                                            onChange={changeSunStartSchedule} />
                                        </td>
                                        <td >
                                            <input type="number" className="form-control" 
                                            id="sunday_end" name="sunday_end" 
                                            min="0" max="23" defaultValue={newCampaignSchedule.length > 0 ? newCampaignSchedule[0].SUNDAY_end_hour : item.SUNDAY_end_hour}
                                            onChange={changeSunEndSchedule} />
                                        </td>
                                    </tr> 
                                </tbody>
                            </table>
                            <br/>
                            <br/>
                            <div className='row'>
                                <div className="col-sm-1">
                                    <button type="button" className="btn btn-primary"
                                    onClick={onClickSendNewSchedule}>
                                        SAVE
                                    </button>
                                </div>
                                <div className="col-sm-1">
                                    <button type="button" className="btn btn-outline-primary"
                                    onClick={enableAdScheduleChange}>
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                            </Fragment> :
                            // see table showing ad schedule
                            <Fragment>
                            <table className="table table-bordered table-hover table-responsive">
                                <thead className="thead-light" style={{backgroundColor: 'rgb(248,172,6)'}}>
                                    <tr key="ad_schedule_table" 
                                    style={{ textAlign: 'center', verticalAlign: 'top'}}>
                                        
                                        <th key="monday" scope="col">Monday</th>
                                        <th key="tuesday" scope="col">Tuesday</th>
                                        <th key="wednesday" scope="col">Wednesday</th>
                                        <th key="thursday" scope="col">Thursday</th>
                                        <th key="friday" scope="col">Friday</th>
                                        <th key="saturday" scope="col">Saturday</th>
                                        <th key="sunday" scope="col">Sunday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr key={item.campaign_id} id={item.campaign_id} value={item.campaign_id}
                                style={{ textAlign: 'center'}}>
                                    {/* if there was an update, use the newCampaignSchedule object */}
                                    {newCampaignSchedule.length > 0 ?
                                    <Fragment>
                                        {newCampaignSchedule[0].MONDAY ?
                                        <td> {newCampaignSchedule[0].MONDAY_start_hour} - {newCampaignSchedule[0].MONDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {newCampaignSchedule[0].TUESDAY ?
                                        <td> {newCampaignSchedule[0].TUESDAY_start_hour} - {newCampaignSchedule[0].TUESDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {newCampaignSchedule[0].WEDNESDAY ?
                                        <td> {newCampaignSchedule[0].WEDNESDAY_start_hour} - {newCampaignSchedule[0].WEDNESDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {newCampaignSchedule[0].THURSDAY ?
                                        <td> {newCampaignSchedule[0].THURSDAY_start_hour} - {newCampaignSchedule[0].THURSDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {newCampaignSchedule[0].FRIDAY ?
                                        <td> {newCampaignSchedule[0].FRIDAY_start_hour} - {newCampaignSchedule[0].FRIDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {newCampaignSchedule[0].SATURDAY ?
                                        <td> {newCampaignSchedule[0].SATURDAY_start_hour} - {newCampaignSchedule[0].SATURDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {newCampaignSchedule[0].SUNDAY ?
                                        <td> {newCampaignSchedule[0].SUNDAY_start_hour} - {newCampaignSchedule[0].SUNDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }

                                    </Fragment> :
                                    // and if not, use current settings object
                                    <Fragment>
                                        {/* if there is an ad schedule, show it */}
                                        {/* and if there is not, show that the ad is showing all day */}
                                        {item.MONDAY ?
                                        <td> {item.MONDAY_start_hour} - {item.MONDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {item.TUESDAY ?
                                        <td> {item.TUESDAY_start_hour} - {item.TUESDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {item.WEDNESDAY ?
                                        <td> {item.WEDNESDAY_start_hour} - {item.WEDNESDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {item.THURSDAY ?
                                        <td> {item.THURSDAY_start_hour} - {item.THURSDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {item.FRIDAY ?
                                        <td> {item.FRIDAY_start_hour} - {item.FRIDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {item.SATURDAY ?
                                        <td> {item.SATURDAY_start_hour} - {item.SATURDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                        {item.SUNDAY ?
                                        <td> {item.SUNDAY_start_hour} - {item.SUNDAY_end_hour} </td> :
                                        <td> All day</td>
                                        }
                                    </Fragment>}
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                            <br/>
                            {/* edit button in ad schedule card */}
                            <button type="button" className="btn btn-outline-primary"
                            onClick={enableAdScheduleChange}>
                                EDIT
                            </button>
                            </Fragment>
                            // table showing ad schedule ends here
                            }
                        </div>
                    </div>
                    {/* ad schedule setting ends */}
                </div>
            )
        })}

        <br/>
        <br/>

        <div className="container" align="left">
            
                <div className="col-6">
                    <button onClick={goBack} className="btn btn-outline-primary">BACK</button>
                </div>
            
        </div>
        <br/>
        <br/>

        

        <br/>
        
    </div>
)}

export default EditCampaign;