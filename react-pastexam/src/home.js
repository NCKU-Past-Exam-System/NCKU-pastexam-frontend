import logo from './logo.svg';
import './App.css';
import React from "react";
import { Login } from './pages/login';
import { Main } from './pages/main';
import { BrowserRouter, Link,Route,Router,redirect } from "react-router-dom";
import { ReactDOM } from 'react';
function Home() {
  return (
    <div className="App">
      <h1>成功大學資訊工程學系考古題系統</h1>
      <Link to='/login'>
          登入
        </Link><br/>
      <Link to='/main'>
          訪客參觀
        </Link>


    </div>
  );
}
export default Home;
