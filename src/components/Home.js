import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {

    return (
        
    <div className="container mt-4">
        
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Create marketing campaigns on Google!
        </h4>

        <p className="mb-0" font="gotham-rounded-bold" align="center" style={{color:'black', fontSize:'20px'}}>
        FranAds is a <strong style={{color:'rgb(248,172,6)'}} >free</strong> app that that will <strong style={{color:'rgb(248,172,6)'}} >help you promote your business on Google Search, 
        Google Maps, YouTube, Gmail, and Google partner websites</strong>.
        </p>
        
        <div className='mt-4' align="center">
            <br></br>
            <Link to="/login">
                <button type="button" className="btn btn-primary btn-block" style={{margin:'10px'}}>START</button>
            </Link>
            <Link to="/learnmore">
            <button type="button" className="btn btn-outline-primary btn-block" style={{margin:'10px'}}>LEARN MORE</button>
            </Link>
        </div>
        
    </div>
)}

export default Home;