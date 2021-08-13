import React from 'react';


const MessageError = ({ msg }) => {
    return (
        <div className="alert alert-danger alert-dismissible fade show" 
        role="alert" style={{ display: 'inline-block', font:"gotham-rounded-bold", fontSize:'16px' }}>
            {msg}
            
        </div>  
    );
};

export default MessageError