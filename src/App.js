import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './Header';
import Catalog from "./Catalog";
import Basket from "./Basket";
import Form from "./Form";
import RoomSwitcher from "./RoomSwitcher";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Catalog/>} />
                    <Route path="/basket" element={<Basket/>} />
                    <Route path="/add" element={<Form/>} />
                </Routes>
                <RoomSwitcher/>
            </div>
        </Router>
    );
}

export default App;
