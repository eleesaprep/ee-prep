import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/userSlice';

export default function ProfileUpdate() {
  const { student, loading } = useSelector((store) => store.student);
  const [userData, setUserData] = useState({
    user: {
      username: student.username || '',
      email: student.email || '',
      password: '',
      full_name: student.full_name || '',
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userData));
    if (!loading) {
      navigate('/home');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      user: {
        ...prevUserData.user,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <form className="user-update-form" onSubmit={handleSubmit}>
        <div className="input">
          <label>Username</label>
          <br />
          <input value={userData.user.username} name="username" onChange={handleInputChange} type="text" required className="input" />
        </div>

        <div className="input">
          <label>Email</label>
          <br />
          <input name="email" value={userData.user.email} onChange={handleInputChange} type="email" required className="input" />
        </div>

        <div className="input">
          <label>Password</label>
          <br />
          <input name="password" onChange={handleInputChange} type="password" required className="input" />
        </div>

        <div className="input">
          <label>Full Name</label>
          <br />
          <input name="full_name" value={userData.user.full_name} onChange={handleInputChange} type="text" required className="input" />
        </div>

        <input type="submit" className="submit" value="Update" />
      </form>
    </>
  );
}
