import { useDispatch, useSelector } from "react-redux";
import { createReset } from "../redux/resetSlice";
import { useEffect, useState } from "react";

export default function PasswordReset() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { error } = useSelector((store) => store.reset);
  
  useEffect(() => {
    if(error === false) {
      alert("Password Instruction has been sent to your email. Click on the link to continue");
    }
  }, [error]);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createReset(email));
  }

  const handleInputChange = (e) => {
    const input = e.target.value;
    setEmail(input);
  }
  return(
    <form onSubmit={handleFormSubmit}>
      <label>Enter Email</label>
      <input name="email" onChange={handleInputChange} type="email" required />
      <input type="submit" value="Send"/>
    </form>
  );
}