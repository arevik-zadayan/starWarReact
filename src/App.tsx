import React from 'react';
import './App.css';
import Characters from "./Pages/Characters/Charecters";
import Character from "./Pages/Character/Charecter";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='' element={<Characters/>} />
                    <Route path='character' element={<Character/>} />
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;
