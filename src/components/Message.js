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