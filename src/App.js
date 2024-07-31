import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Views/Home';
import ViewAlbum from './Views/Album/ViewAlbum';
import ListAlbums from './Views/Album/ListAlbums';
import ListTracks from './Views/Track/ListTracks';
import {AlertProvider} from "./Components/AlertContext";

function App() {
    return (
        <>
            <AlertProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/albums" element={<ListAlbums />} />
                    <Route path="/tracks" element={<ListTracks />} />
                    <Route path="/album/:id" element={<ViewAlbum />} />
                </Routes>
            </AlertProvider>
        </>
    );
}

export default App;
