import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import About from './pages/About';
import Home from './pages/Home';
import Login from  './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services'; 
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Userdashboard from './pages/user-routes/Userdashboard';
import Privateroute from './components/Privateroute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import PostPage from './pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';
import UpdateNotes from './pages/UpdatePost';
import UpdatePost from './pages/UpdatePost';
import ContactUs from './components/ContactUs';
function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/services" element={<Services />}/>
        <Route path="/contact" element={<ContactUs />}/>
        <Route path="/posts/:postId" element={<PostPage />}/>
        <Route path="/categories/:categoryId" element={<Categories/>} />

        <Route path="/user" element={<Privateroute />}>
           <Route path="dashboard" element={<Userdashboard />}/>
           <Route path="profile-info/:userId" element={<ProfileInfo />}/>
           <Route path="update-blog/:blogId" element={<UpdatePost />}/>
        </Route>   
      </Routes>
     </BrowserRouter>
     </UserProvider>
     
  );
}

export default App;
