import React from 'react';
import PropTypes from 'prop-types';

const MessageSuccess = ({ msg }) => {
    return (
        <div className="alert alert-success alert-dismissible fade show" 
        role="alert" 
        style={{ 
            display: 'inline-block', 
            font:"gotham-rounded-bold", 
            fontSize:'16px' }}>
            <i className="fas fa-check-circle fa-fw" 
            style={{marginRight: '5px'}}></i>
            {msg}
        </div>  
    );
};

MessageSuccess.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default MessageSuccess