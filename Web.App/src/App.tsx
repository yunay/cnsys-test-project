import { LayoutUI } from 'common';
import { FullFormUI, HomeUI } from 'pages';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<LayoutUI />} >
                    <Route path="/" element={<HomeUI />} />
                    <Route path="/full-form" element={<FullFormUI />} />
                </Route>
            </Routes>
        </BrowserRouter >
    );
}

export default App;
