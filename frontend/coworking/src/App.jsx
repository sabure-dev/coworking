import HomePage from "./components/HomePage/HomePage.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProtectedRoutes from "./components/Utils/ProtectedRoutes.jsx";
import LoginPage from "./components/Auth/Login/LoginPage.jsx";
import RegisterPage from "./components/Auth/Register/RegisterPage.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import Profile from "./components/Profile/Profile.jsx";
import EnterPage from "./components/Group/Enter/EnterPage.jsx";
import CreatePage from "./components/Group/Create/CreatePage.jsx";
import AllProject from "./components/Project/All/allProject.jsx";
import AboutPage from "./components/About/AboutPage.jsx";
import NewsPage from "./components/News/NewsPage.jsx";
import MyProjectPage from "./components/Project/My/myProject.jsx";
import Events from "./components/Event/Event.jsx";
import CreateNews from "./components/News/CreateNews.jsx";
import CreateProject from "./components/Project/Create/CreateProject.jsx";
import CreateEvent from "./components/Event/CreateEvent.jsx";
import Guide from "./components/Pdf/pdf.jsx"


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
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/projects' element={<AllProject/>}/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/about' element={<AboutPage/>}/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/news' element={<NewsPage/>}/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/events' element={<Events/>}/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/projects/my' element={<MyProjectPage/>}/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/news/create' element={<CreateNews/>}/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/projects/create' element={<CreateProject/>}/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/events/create' element={<CreateEvent/>}/>
                </Route>



                <Route path='/group/create' element={<CreatePage/>}/>
                <Route path='/guide' element={<Guide/>}/>
                <Route path='/group/enter' element={<EnterPage/>}/>


            </Routes>

        </BrowserRouter>
    </div>)
}

export default App
