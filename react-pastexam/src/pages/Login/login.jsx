import React from "react";
import { useState } from "react";

import { clientId } from "../../credential";
import { GoogleLogin,GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { Button } from "@mui/material";

export const Login = () =>{
    const googleOath= useGoogleLogin({
        clientId: clientId,
        onSuccess: (credentialResponse) => {
            console.log(credentialResponse);
            console.log(credentialResponse.credential);
            const responsePayload = jwtDecode(credentialResponse.credential);
            console.log(responsePayload);
        }
    })
    return (
        <GoogleOAuthProvider clientId={clientId} >
        <Button onClick={googleOath}>
            LOgin
        </Button>
        </GoogleOAuthProvider>
    )
}