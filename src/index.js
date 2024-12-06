import React from 'react';
import ReactDOM from 'react-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import App from './App';

const msalConfig = {
    auth: {
        clientId: "42545bdf-ac52-4cbb-bdcc-07526ec228f7", //  client ID hoặc Application ID
        authority: "https://login.microsoftonline.com/a7380202-eb54-415a-9b66-4d9806cfab42", //  tenant ID
        redirectUri: "http://localhost:3000",
    }
};

const msalInstance = new PublicClientApplication(msalConfig);


ReactDOM.render(
    <MsalProvider instance={msalInstance}>
        <App />
    </MsalProvider>,
    document.getElementById('root')
);
