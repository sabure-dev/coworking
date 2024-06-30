import HomePage from "./components/HomePage/HomePage.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProtectedRoutes from "./components/Utils/ProtectedRoutes.jsx";
import LoginPage from "./components/Auth/Login/LoginPage.jsx";
import RegisterPage from "./components/Auth/Register/RegisterPage.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import Profile from "./components/Profile/Profile.jsx";
import EnterPage from "./components/Group/Enter/EnterPage.jsx";
import CreatePage from "./components/Group/Create/CreatePage.jsx";


function App() {
    return (<div>
        <BrowserRouter>
            <Routes>
                <Route path='/auth/login' element={<LoginPage/>}/>
                <Route path='/auth/register' element={<RegisterPage/>}/>
                <Route path='/' element={<HomePage/>}/>

                <Route element={<ProtectedRoutes/>}>
                    <Route path='/main' element={<MainPage/>}/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/profile' element={<Profile/>}/>
                </Route>

                <Route path='/group/create' element={<CreatePage/>}/>
                <Route path='/group/enter' element={<EnterPage/>}/>


            </Routes>
        </BrowserRouter>
    </div>)
}

export default App
