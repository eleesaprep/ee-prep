import { useDispatch } from 'react-redux';
// eslint-disable-next-line
import { PropTypes } from 'prop-types';
import dashboard from '../../assets/dashboard.png';
import course from '../../assets/course.png';
import quiz from '../../assets/quiz.png';
import closeBtn from '../../assets/close.png';
import { userSignout } from '../../redux/userSlice';
import signout from '../../assets/sign-out.png';
import images from '../../utils/images';

export default function SideBar({
  menuClicked, phone, onChildClick, showMenu,
}) {
  const name = phone ? 'sidebar' : 'desktop-sidebar';
  const dispatch = useDispatch();
  document.addEventListener('scroll', () => {
    onChildClick();
  });
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  const handleSignout = () => {
    dispatch(userSignout());
  };

  return (
    <>
      <div className={menuClicked ? `${name}` : 'no-sidebar'}>
        <div className="menu-head">
          <div className="profile"><img className="eleesa-logo" src={isDarkMode ? images.logo2 : images.logo1} alt="logo" /></div>
          <div
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Space') {
                showMenu();
              }
            }}
            role="button"
            tabIndex={0}
            onClick={() => showMenu()}
          >
            <img src={closeBtn} alt="close-btn" className="close-btn" />
          </div>
        </div>
        <ul className="side-links">
          <li className="side-link">
            <img src={dashboard} alt="" className="logo" />
            <a className="link" href="/home">Dashboard</a>
          </li>
          <li className="side-link">
            <img src={course} alt="" className="logo" />
            <a className="link" href="/home/courses">Courses</a>
          </li>
          <li className="side-link">
            <img src={quiz} alt="" className="logo" />
            <a className="link" href="/home/quizzes">Quizzes</a>
          </li>
          <div
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Space') {
                handleSignout();
              }
            }}
            role="button"
            tabIndex={0}
            className="side-link"
            onClick={handleSignout}
          >
            <img src={signout} alt="logout" className="logo" />
            <a className="link" href="#signout">Sign Out</a>
          </div>
        </ul>
      </div>

    </>
  );
}

SideBar.propTypes = {
  phone: PropTypes.bool.isRequired,
  menuClicked: PropTypes.bool.isRequired,
  onChildClick: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
};
