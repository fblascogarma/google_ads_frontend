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

import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg }) => {
    return (
        <div className="alert alert-info alert-dismissible fade show" 
        role="alert" 
        style={{ 
            display: 'inline-block', 
            font:"gotham-rounded-bold", 
            fontSize:'16px' }}>
            <span className="spinner-border spinner-border-sm" role="status" style={{ 
                color:'rgb(48,152,229)'}} aria-hidden="true"></span>
            {msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>  
    );
};

Message.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default Message