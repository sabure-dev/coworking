import {useState} from 'react'
import './App.css'
import HomePage from "./components/HomePage/HomePage.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProtectedRoutes from "./components/Utils/ProtectedRoutes.jsx";


function App() {
    return (<div>
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<LoginPage/>}/>

                <Route element={<ProtectedRoutes/>}>
                    <Route path='/' element={<HomePage/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    </div>)
}

export default App
