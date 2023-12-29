import { Outlet, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import LoginPage from './components/loginPage';
import SignupPage from './components/signupPage';
import { getUserById, loadUserFromLocalStorage, userSignout } from './redux/userSlice';
import ProtectedRoute from './components/protectedRoute';
import SideBar from './components/homepage/sideBar';
import CoursesPage from './components/coursesPage';
import images from './utils/images';
import QuizPage from './components/quizzesPage';
import QuestionsPage from './components/questionsPage';
import ResultsPage from './components/resultsPage';
import DarkModeToggle from './utils/darkModeToggle';
import ProfileUpdate from './components/profileUpdate';
import HomePage from './components/homepage/homePage';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [isDarkMode, setIsDarkMode] = useState('');

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if(loadUserFromLocalStorage()){
      dispatch(getUserById());
    }
  }, [dispatch]);

  function Navbar() {
    const [menuClicked, setMenuClicked] = useState(false);
    const [profileClicked, setProfileClicked] = useState(false);

    document.addEventListener('click', (e) => {
      if (e.target.className !== 'trigram' && e.target.className !== 'sidebar'
        && e.target.className !== 'link' && e.target.className !== 'side-links'
        && e.target.className !== 'logo' && e.target.className !== 'menu-head'
        && e.target.className !== 'profile' && e.target.className !== 'side-link') {
        setMenuClicked(false);
      }
      if (e.target.className !== 'profile-details'
        && e.target.className !== 'profile-container'
        && e.target.className !== 'profile'
        && e.target.className !== 'arrow-down') {
        setProfileClicked(false);
      }
    });

    const handleMenuClicked = () => {
      setMenuClicked(false);
    };

    function ShowMenu() {
      setMenuClicked(!menuClicked);
    }

    const handleToggleMode = (dataFromChild) => {
      setIsDarkMode(dataFromChild);
    };

    const handleProfileClick = () => {
      setProfileClicked(!profileClicked);
    };

    const handleSignout = () => {
      dispatch(userSignout());
    };

    return (
      <>
        <main className={isDarkMode ? 'dark-mode' : 'light-mode'}>
          <div className="nav-container">
            <div
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space') {
                  ShowMenu();
                }
              }}
              role="button"
              tabIndex={0}
              onClick={() => ShowMenu()}
            >
              <img src={images.trigram} alt="menu" className="trigram" />
            </div>
            <div className="phone-sidebar"><SideBar phone showMenu={() => ShowMenu} onChildClick={handleMenuClicked} menuClicked={menuClicked} /></div>
            <div className="nav-links">
              <DarkModeToggle onChildClick={handleToggleMode} />
              <div
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Space') {
                    ShowMenu();
                  }
                }}
                role="button"
                tabIndex={0}
                onClick={() => handleProfileClick()}
                className="profile-container"
              >
                <img className="profile" src={images.profile2} alt="profile" />
                <img className="arrow-down" src={images.expand} alt="arrow-down" />
              </div>
              <ul className={profileClicked ? 'profile-details' : 'none'}>
                <li><a href="/home/profile_update">Edit Profile</a></li>
                <li><a href="/home/settings">Settings</a></li>
                <li><button type="button" onClick={handleSignout}>Sign-out</button></li>
              </ul>
            </div>

          </div>
          <div className="desktop-container">
            <div className="desktop-sidebar-container"><SideBar onChildClick={() => {}} menuClicked phone={false} showMenu={() => {}} /></div>
            <div className="outlet"><Outlet /></div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute userAllowed={!user} redirectTo="/home" />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute userAllowed={!!user} redirectTo="/" />}>
          <Route path="/home" element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="/home/courses" element={<CoursesPage />} />
            <Route path="/home/quizzes" element={<QuizPage />} />
            <Route path="/home/questions" element={<QuestionsPage />} />
            <Route path="/home/quiz/results" element={<ResultsPage />} />
            <Route path="/home/profile_update" element={<ProfileUpdate />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
