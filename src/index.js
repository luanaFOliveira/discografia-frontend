import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import {createBrowserRouter, Route, RouterProvider} from 'react-router-dom';
import Home from './Views/Home';
import ViewAlbum from "./Views/Album/ViewAlbum";
import ListAlbums from "./Views/Album/ListAlbums";
import ListTracks from "./Views/Track/ListTracks";
import {AlertProvider} from "./Components/AlertContext";

const router = createBrowserRouter([

    {
        path:"/",
        element:<Home/>,
    },
    {
        path:"/albums",
        element:<ListAlbums/>,
    },
    {
        path:"/tracks",
        element:<ListTracks/>,
    },
    {
        path:"/album/:id",
        element:<ViewAlbum/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <AlertProvider>
            <RouterProvider router={router}/>,
        </AlertProvider>
    </StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();