import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/homePage';
import './App.css';
import LoginPage from './components/loginPage';
import SignupPage from './components/signupPage';
import { useEffect, useState } from 'react';
import { loadUserFromLocalStorage } from './redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/protectedRoute';
import SideBar from './components/homepage/sideBar';
import { images } from './utils/images';
import CoursesPage from './components/coursesPage';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [menuClicked, setMenuClicked] = useState(false);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  },[dispatch]);

  document.addEventListener('click', (e) => {
    if(e.target.className !== 'trigram' && e.target.className !== 'sidebar'
      && e.target.className !== 'link' && e.target.className !== 'side-links'
      && e.target.className !== 'logo' && e.target.className !== 'menu-head'
      && e.target.className !== 'profile' && e.target.className !== 'side-link'){
      setMenuClicked(false);
    }
  });

  function ShowMenu() {
    setMenuClicked(!menuClicked);
  };

  function Navbar() {
    return (
      <>
        <SideBar showMenu={ShowMenu} menuClicked={menuClicked} />
        <img src={images.trigram} onClick={()=> ShowMenu()} alt="menu" className='trigram' />
        <Outlet />
      </>
    );
  }

  return (
    <>
    <Routes>
      <Route element={<ProtectedRoute userAllowed={!user} redirect_to='/home' />}>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute userAllowed={!!user} redirect_to='/' />}>
        <Route path='/home' element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path='/home/courses' element={<CoursesPage />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
