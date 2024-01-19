import { useDispatch } from "react-redux";
import { createReset } from "../redux/resetSlice";
import { useState } from "react";

export default function PasswordReset() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

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