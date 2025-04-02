
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
        <ToastContainer />
    </BrowserRouter>
)
