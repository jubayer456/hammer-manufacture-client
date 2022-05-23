import logo from './logo.svg';
import './App.css';
import NavBar from './Pages/Shared/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About'
import Blog from './Pages/Blog/Blog'
import Login from './Pages/Login/Login';

function App() {
  return (
    <div >
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
