import React from 'react'

export const About = () => {
    return (
        <div className="container mt-4">
        
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            About FranAds
        </h4>
        <br />
        <p className="mb-0" font="gotham-rounded-bold" align="center" style={{color:'black', fontSize:'20px'}}>
        FranAds is a <strong style={{color:'rgb(248,172,6)'}} >web app designed and built by Francisco Blasco</strong> to learn
        about <strong style={{color:'rgb(248,172,6)'}} >Google Ads API</strong>.
        <br/>
        <br/>
        It is an SPA (single-page application) that uses Django for the backend and React for the frontend.
        <br />
        <br />
        The idea is to use this web app to better help Google's partners to build Google Ads solutions that 
        help their customers around the world.
        </p>
        <br />
        <br />
        <div className="row">
            <div className="col-sm-6">
                <div className="card mb-3" style={{"maxWidth": "540px"}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="Fran_Blasco_profile_pic.jpeg" className="card-img-top" alt="Francisco Blasco" />
                        </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text-center">Francisco Blasco</h5>
                            <p className="card-text">Designed and developed this app.
                            Check out his <a href="https://www.linkedin.com/in/franciscoblascogarma/" target="_blank" rel="noopener noreferrer">LinkedIn </a> 
                            or <a href="https://github.com/fblascogarma" target="_blank" rel="noopener noreferrer">GitHub</a> profile.
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default About