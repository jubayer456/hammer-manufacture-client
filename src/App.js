import './App.css';
import NavBar from './Pages/Shared/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About'
import Blog from './Pages/Blog/Blog'
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import Footer from './Pages/Shared/Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PurchasePage from './Pages/PurchasePage/PurchasePage';
import NotFound from './Pages/Shared/NotFound';
import RequireAuth from './Pages/Login/RequireAuth';
import DashBoard from './Pages/DashBoard/DashBoard';
import MyOrders from './Pages/DashBoard/MyOrders';
import MyReviews from './Pages/DashBoard/MyReviews';
import MyProfile from './Pages/DashBoard/MyProfile';
import ManageUser from './Pages/DashBoard/ManageUser';
import AddProduct from './Pages/DashBoard/AddProduct';
import AllProducts from './Pages/DashBoard/AllProducts';


function App() {
  return (
    <div >
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route path='/tools/:id' element={
          <RequireAuth><PurchasePage /></RequireAuth>
        }></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/dashboard' element={<RequireAuth><DashBoard />  </RequireAuth>}>
          <Route index element={<MyProfile />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="myreview" element={<MyReviews />} />
          <Route path="manageuser" element={<ManageUser />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="allproduct" element={<AllProducts />} />

        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
      <Footer></Footer>

    </div>
  );
}

export default App;
