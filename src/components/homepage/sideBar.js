import dashboard from '../../assets/dashboard.png';
import course from '../../assets/course.png';
import quiz from '../../assets/quiz.png';
import chat from '../../assets/chat.png';
import closeBtn from '../../assets/close.png';
import { userSignout } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import signout from '../../assets/sign-out.png';

export default function SideBar({ menuClicked, showMenu }) {
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(userSignout());
  }

  return(
    <>
      <div className={menuClicked? 'sidebar':'no-sidebar'}>
        <div className='menu-head'>
          <div className='profile'>Logo</div>
          <img src={closeBtn} onClick={()=> showMenu()} alt='close-btn' className='close-btn' />
        </div>
        <ul className='side-links'>
          <li className='side-link'>
            <img src={dashboard} alt="" className="logo"/>
            <a className='link' href="#dashboard">Dashboard</a>
          </li>
          <li className='side-link'>
            <img src={course} alt="" className="logo"/>
            <a className='link' href="/home/courses">Courses</a>
          </li>
          <li className='side-link'>
            <img src={quiz} alt="" className="logo"/>
            <a className='link' href="#quizzes">Quizzes</a>
          </li>
          <li className='side-link'>
            <img src={chat} alt="" className="logo"/>
            <a className='link' href="#chat">Chat Room</a>
          </li>
          <li className='side-link' onClick={handleSignout}>
            <img src={signout} alt='logout' className='logo'/>
            <a className='link' href='#signout'>Sign Out</a>
          </li>
        </ul>
      </div>

    </>
  );
}