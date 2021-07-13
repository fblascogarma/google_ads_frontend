import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const LearnMore = () => {

    // Manage state of component so it shows when user clicks it
    const [showCases, setShowCases] = useState(false)
    const onClick = () => setShowCases(showCases ? false : true)

    // Component that has the list of use cases
    const Cases = () => (
        
        <div className="card">
            <div className="card-body">
            <p className="mb-0" font="gotham-rounded-bold" align="left" style={{color:'black', fontSize:'20px'}}>
                    1. Create an online ad <strong style={{color:'rgb(248,172,6)'}} >quickly and easily</strong>.
                <br/>
                    2. Pay only when people click your ad.
                <br/>
                    3. <strong style={{color:'rgb(248,172,6)'}} >Attract more customers</strong> to your website or Google Maps listing.
                <br/>
                    4. Minimal ongoing management necessary. <strong style={{color:'rgb(248,172,6)'}} >Google Ads runs your ads for you</strong>.
                <br/>
                    5. Reach customers on desktop computers and mobile devices (such as mobile phones and tablets).
                <br/>
                    6. Review the effectiveness of your ads in your dashboard.
            </p>
            </div>
        </div>
        
    )

    return (
        
    <div className="container mt-4">
        
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Why use Google Ads?
        </h4>

        <p className="mb-0" font="gotham-rounded-bold" align="center" style={{color:'black', fontSize:'20px'}}>
        Google Ads allows you to take advantage of the benefits of online advertising: show your ads to the<strong style={{color:'rgb(248,172,6)'}} > right people, 
        in the right place, and at the right time.</strong>
        <br/>
        <br/>
        When you sign up for a Smart campaign, 
        you’ll write an ad that describes your business. 
        You’ll also choose which keyword themes you want to target your ad 
        and set a budget. Your ad will automatically show to potential customers 
        across Google Search, Google Maps, YouTube, Gmail, and Google partner websites.
        <br/>
        <br/>
        <br/>
        </p>
        
        <button type="button" className="btn btn-link" onClick={onClick} style={{ "textDecoration": "none", color:'rgb(248,172,6)', "font":"gotham-rounded-bold", fontSize:'20px' }}>See key benefits   <i className="fas fa-chevron-down"></i></button>
        { showCases ? <Cases /> : null }
        
        <div className='mt-4' align="center">
            <br></br>
            <Link to="/login">
                <button type="button" className="btn btn-primary btn-block" style={{margin:'10px'}}>START</button>
            </Link>
            <Link to="/">
            <button type="button" className="btn btn-outline-primary btn-block" style={{margin:'10px'}}>HOME</button>
            </Link>
        </div>
        
    </div>
)}

export default LearnMore;