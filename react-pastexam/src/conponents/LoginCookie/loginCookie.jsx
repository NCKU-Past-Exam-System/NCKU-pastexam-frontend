import React from 'react';
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { clientId } from "../../credential";
export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/;";
}
export function getCookie(name) {
    // Add the equal sign to the cookie name (representing the start of its value)
    const nameEQ = name + "=";
    // Split document.cookie on semicolons into an array of all the cookies
    const ca = document.cookie.split(';');

    // Loop through the cookies array
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        // Trim whitespace from the start of the cookie string
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        // Check if this cookie string begins with the name we want
        if (c.indexOf(nameEQ) === 0) {
            // Return the cookie value, which starts after the name and the equal sign, and goes until the end of the string
            return c.substring(nameEQ.length, c.length);
        }
    }

    // Return null if the cookie with the specified name is not found
    return '';
}
export function eraseCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

export const googleOathLogin = <GoogleLogin
theme="filled_black"
clientId={clientId}
onSuccess={async (tokenResponse) => {
    setCookie('token', tokenResponse.credential, 1); // Expires in 1 day
    setCookie('info', JSON.stringify(jwtDecode(tokenResponse.credential)), 1); // Expires in 1 day
    window.location.reload();
}}
onError={(error) => {
    alert('Login failed');
    console.log(error);
}}
/>;

export const googleOathLoginMobile = <GoogleLogin
  type='icon'
  logo_alignment='center'
  clientId={clientId}
  onSuccess={async (tokenResponse) => {
    window.location.reload();
  }}
  onError={(error) => {
    alert('Login failed');
    console.log(error);
  }}
/>

export const googleOathLogout = () => {
  googleLogout();
  eraseCookie('token');
  eraseCookie('info');
  window.location.reload();
}