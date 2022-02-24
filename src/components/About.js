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

import React from 'react'

export const About = () => {
    return (
        <div className="container mt-4">
        <br/>
        <h4 className="display-4 text-left mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            About Fran Ads
        </h4>
        <br />
        <p className="mb-0" font="gotham-rounded-bold" style={{color:'black', fontSize:'20px'}}>
        Fran Ads is a <strong style={{color:'rgb(248,172,6)'}} >web app designed and built by Francisco Blasco</strong> that is integrated with <strong style={{color:'rgb(248,172,6)'}} >Google Ads</strong> and Google My Business.
        <br/>
        <br/>
        It is an SPA (single-page application) that uses Django for the backend, React for the frontend, and Bootstrap for CSS.
        <br />
        <br />
        The goal of this project is to accelerate the Google Ads integration process, and decrease associated development costs. 
        <br/>
        <br/>
        Companies can use Fran Ads as an SDK to begin working with elements within the Google Ads API, 
        and serve as a guidance system for integrating with Google.
 

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