import './App.css';
import NavBar from './Pages/Shared/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About'
import Blog from './Pages/Blog/Blog'
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth';
import Register from './Pages/Login/Register';
import Footer from './Pages/Shared/Footer';
import PurchasePage from './Pages/PurchasePage/PurchasePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div >
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/tools/:id' element={<RequireAuth>
          <PurchasePage></PurchasePage>
        </RequireAuth>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
      <Footer></Footer>

    </div>
  );
}

export default App;
