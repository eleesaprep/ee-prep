import { useState } from "react";
import { userSignup } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export default function SignupPage() {
  const [userData, setUserData ] = useState({"user": {}});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignup(userData));
  }
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUserData({
      "user": {
        ...userData.user,
        [name]: value,
      }
    });
  }
  return(
    <div className="signup-body">
      <h1>EE-PREP</h1>
      <p className='inspire-text'>Nourish your inner skills</p>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input">
          <label>Username</label><br/>
          <input name="username" onChange={handleInputChange} type="text" required className="input"/>
        </div>

        <div className="input">
          <label>Email</label><br/>
          <input name="email" onChange={handleInputChange} type="email" required className="input"/>
        </div>

        <div className="input">
          <label>Password</label><br/>
          <input name="password" onChange={handleInputChange} type="password" required className="input"/>
        </div>

        <div className="input">
          <label>Full Name</label><br/>
          <input name="full_name" onChange={handleInputChange} type="text" required className="input"/>
        </div>

        <input type="submit" className="submit" value="Sign Up"/>
      </form>

      <div className="login-link">
        <p className="to-login">Already have an account?</p>
        <a href="/" className="login">Login</a>
      </div>
    </div>
  );
}