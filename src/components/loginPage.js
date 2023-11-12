import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignin } from "../redux/userSlice";
import { getUserFromLocalStorage } from "../utils/localStorageForUser";
import LoadingBar from "./homepage/loadingBar";

export default function LoginPage() {
  const [userData, setUserData] = useState({});
  const [noUser, setNoUser] = useState(false);
  const dispatch = useDispatch();
  const {loading} = useSelector((store) => store.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignin(userData)).then(() => {
    if(!getUserFromLocalStorage()) {
      setNoUser((prevState) => prevState = true);
    }});
  }
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }


  return(
    <>
    <div className="login-body">
      <div className={loading? 'login-loading' : 'no-loading'}><LoadingBar /></div>
      <h1>EE-PREP</h1>
      <p className='inspire-text'>Nourish your inner skills</p>
      { noUser && <p className="invalid-login">Invalid Email or Password</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input">
          <label>Username</label><br/>
          <input name="username" onChange={handleInputChange} required className="username-input"/>
        </div>
        <div className="input">
          <label>Password</label><br/>
          <input type="password" name="password" onChange={handleInputChange} required className="password-input"/>
        </div>
        <input type="submit" className="submit" value="Login"/>
      </form>
      <div className="signup-link">
        <p className="to-signup">Don't have an account?</p>
        <a href="/signup" className="sign-up">Sign-up</a>
      </div>
    </div>
    </>
  );
}