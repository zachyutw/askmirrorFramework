import React from 'react';
const Html = (props) => {
    return (
        <html>
            <head>
                <title>{props.title}</title>
            </head>
            <body>
                <div id='app'>{props.body}</div>
            </body>
        </html>
    );
};
export default Html;
