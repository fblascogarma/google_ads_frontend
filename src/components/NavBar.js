import React, { useState } from 'react'
import { NavLink as Link } from 'react-router-dom';


export const NavBar = () => {

    // Config to collapse navbar options on click
    const [toggle, setToggle] = useState(false)
    const onClick = () => setToggle(toggle => !toggle)
    

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
            </div>
        </nav>
    )
}

export default NavBar