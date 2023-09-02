import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from './pages/Main/main';
import { Login } from './pages/Login/login';
import { NoPage } from './pages/NoPage/nopage';
import { Upload } from './pages/Upload/upload';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { clientId } from './credential';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/:id" element={<Main/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.style.backgroundColor = "#040D12";
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId} >
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
