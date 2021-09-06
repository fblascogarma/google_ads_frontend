import React, { useState, useEffect } from 'react'
import { NavLink as Link } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';




export const NavBar = () => {

    // Config to collapse navbar options on click
    const [toggle, setToggle] = useState(false)
    const onClick = () => setToggle(toggle => !toggle)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [token, setToken, removeToken] = useCookies(['mytoken'])
    let history = useHistory()

    // cookies to be removed when user logouts
    // not including the ones from step 1 because those have a high chance of
    // being used again when user wants to create a new campaign

    // refresh token
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken'])

    // customer id
    const [customerId, setCustomerId, removeCustomerID] = useCookies(['customer_id'])

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

    // cookie from step 4 (not sure I want to remove it)
    const [geo_location, setGeo_location, removeGeo_location] = useCookies(['geo_location'])


    // remove all cookies when user logsout
    const logoutBtn = () => {
        removeToken(['mytoken']);
        removeRefreshToken(['refreshToken']);
        removeCustomerID(['customerID']);
        removeCountry_code(['country_code']);
        removeBusiness_name(['business_name']);
        removeLanding_page(['landing_page']);
        removePhone_number(['phone_number']);
        removeHeadline_1(['headline_1']);
        removeHeadline_2(['headline_2']);
        removeHeadline_3(['headline_3']);
        removeDesc_1(['desc_1']);
        removeDesc_2(['desc_2']);
        removeKeyword_themes(['keyword_themes']);
        removeGeo_location(['geo_location']);

    }

    const redirectLogin = () => {
        history.push('/login')

    }
    

    return (
        <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{backgroundColor: 'rgb(248,172,6)'}}>
            <div className="container-fluid">
            <Link to="/" className="navbar-brand d-flex w-50 mr-auto" href="/#">
                    <img src="FranAds_logo.png" alt="company logo company name Fran Ads" width="40%" height="auto"></img> 
            </Link>
            
            <button className="navbar-toggler float-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" 
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"
                    onClick={onClick} style={{ border: 'none'}}>
                <span className="navbar-toggler-icon"></span>
            </button>
            
                <div className="collapse navbar-collapse col-md-auto" id="navbarResponsive" style={{display: toggle ? '' : 'none'}} align='center'>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0 w-100 justify-content-end">
                        
                        <li className="nav-item">
                        <Link exact to="/" className="nav-link active" activeClassName="nav-link--active" aria-current="page" href="/#" activeStyle={{fontWeight: 'bold'}}
                        onClick={onClick}>
                            Home
                        </Link>
                        </li>
                        
                        
                        <li className="nav-item">
                        <Link exact to="/learnmore" className="nav-link" href="/#" activeClassName="nav-link--active" activeStyle={{fontWeight: 'bold'}}
                        onClick={onClick}>
                            Why use Google Ads?
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                        <Link exact to="/login" className="nav-link" href="/#" activeClassName="nav-link--active" activeStyle={{fontWeight: 'bold'}}
                        onClick={onClick}>
                            Google Ads
                        </Link>
                        </li>
                        
                        <li className="nav-item">
                        <Link exact to="/about" className="nav-link" href="/#" activeClassName="nav-link--active" activeStyle={{fontWeight: 'bold'}}
                        onClick={onClick}>
                            About
                        </Link>
                        </li>
                        
                        <li className="nav-item">
                        <Link exact to="/contact" className="nav-link" href="/#" activeClassName="nav-link--active" activeStyle={{fontWeight: 'bold'}}
                        onClick={onClick}>
                            Contact
                        </Link>
                        </li>
                        
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Google Ads Products
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/#">Smart Campaigns</a></li>
                                <li><a className="dropdown-item" href="/#">Search</a></li>
                                <li><a className="dropdown-item" href="/#">Shopping</a></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li><a className="dropdown-item" href="/#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li> */}
                    {/* <div class="navbar-nav ml-auto action-buttons">
                        <div class="nav-item dropdown">
                            <a href="/#" data-toggle="dropdown" class="nav-link dropdown-toggle mr-4">Login</a>
                            <div class="dropdown-menu action-form">
                                <form action="/examples/actions/confirmation.php" method="post">
                                    <p class="hint-text">Sign in with your social media account</p>
                                    <div class="form-group social-btn clearfix">
                                        <a href="/#" class="btn btn-secondary facebook-btn float-left"><i class="fa fa-facebook"></i> Facebook</a>
                                        <a href="/#" class="btn btn-secondary twitter-btn float-right"><i class="fa fa-twitter"></i> Twitter</a>
                                    </div>
                                    <div class="or-seperator"><b>or</b></div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Username" required="required"></input>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="Password" required="required"></input>
                                    </div>
                                    <input type="submit" class="btn btn-primary btn-block" value="Login"></input>
                                    <div class="text-center mt-2">
                                        <a href="/#">Forgot Your password?</a>
                                    </div>

                                </form>

                            </div>

                        </div>
                    </div> */}
                    </ul>
                    
                </div>
                
                {/* if there is a cookie called 'mytoken', then show Logout because user is logged in, 
                if not show Login/Register */}
                {token['mytoken'] ? 
                    <div className="col-4">
                        <button onClick={logoutBtn} className="btn btn-outline-dark">LOGOUT</button>
                    </div> :
                    
                    <div className="col-4">
                        <button onClick={redirectLogin} className="btn btn-outline-dark">LOGIN / SIGNUP</button>
                    </div>}
                
                </div>
        </nav>
    )
}

export default NavBar