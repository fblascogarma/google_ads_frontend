import React from 'react';
import PropTypes from 'prop-types';

const MessageWarning = ({ msg }) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show" 
        role="alert" 
        style={{ 
            display: 'inline-block', 
            font:"gotham-rounded-bold", 
            fontSize:'16px' }}>
            {msg}
           
        </div>  
    );
};

MessageWarning.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default MessageWarning