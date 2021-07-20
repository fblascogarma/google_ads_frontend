import React from 'react';


const MessageError = ({ msg }) => {
    return (
        <div className="alert alert-danger alert-dismissible fade show" 
        role="alert" style={{ display: 'inline-block', font:"gotham-rounded-bold", fontSize:'16px' }}>
            {msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>  
    );
};

export default MessageError