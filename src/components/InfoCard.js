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

import React, { useState } from 'react';


const InfoCard = () => (
        
    <div className="card">
        <div className="card-body">
        <p className="mb-0" font="gotham-rounded-bold" align="left" style={{color:'black', fontSize:'20px'}}>
        The budget column shows your campaign's daily budget. 
        If the campaign draws from a shared budget, 
        then the amount in this column reflects the entire shared budget.
        </p>
        </div>
    </div>
    
)

export default InfoCard;