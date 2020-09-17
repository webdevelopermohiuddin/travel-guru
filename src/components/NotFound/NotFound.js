import React from 'react';

const NotFound = () => {
     const styles = {
         textAlign: 'center',
         color: 'red'
     }
    return (
        <div style={styles}>
            <h2>This page is not found</h2>
            <h1>404 error</h1>
        </div>
    );
};

export default NotFound;