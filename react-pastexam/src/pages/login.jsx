import React from "react";
import { useState } from "react";
export const Login = () =>{
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
        setEmail(document.getElementById("email").value);
        setPasswd(document.getElementById("password").value);
        console.log(email, passwd);
    }
    return (
        <form>
            <label htmlFor="email">email</label>
            <input type="email" placeholder="請輸入Email" id="email"></input><br/>
            <label htmlFor="password">密碼</label>
            <input type="password" placeholder="請輸入密碼" id="password"></input><br/>
            <button type="submit" onClick={handleSubmit}>Log In</button>
        </form>
    )
}