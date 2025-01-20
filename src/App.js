import React, {  } from "react";
import "./App.css";
 
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import View from "./admin/PurseDetail";
import Edit from "./admin/EditPurse";
import HomeAdmin from "./admin/Home";
import Login from "./components/Login";
 
function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/view/:id" element={<View/>}/>
              <Route exact path="/edit/:id" element={<Edit/>}/>
              <Route exact path="/admin/home" element={<HomeAdmin/>}/>
              <Route exact path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;