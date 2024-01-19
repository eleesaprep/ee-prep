import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/resetSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ChangePassword() {

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const { error } = useSelector((store) => store.reset);

  useEffect(() => {
    if(error === false) {
      navigate("/");
    }
  }, [error]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(password === confirm) {
        dispatch(updatePassword({ token, password }));
    }
    else {
      alert("Passwords do not match");
    }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    if (name === 'password') {
      setPassword(value);
    }
    else {
      setConfirm(value);
    }
  }
  return(
    <form onSubmit={handleFormSubmit}>
      <div>
      <label>New Password</label>
      <input name="password" type="password" required onChange={handleInputChange}/>
      </div>
      <div>
        <label>Confirm New Password</label>
        <input name="confirm" type="password" required onChange={handleInputChange}/>
      </div>
      <input type="submit" value="Change Password"/>
    </form>
  );
}