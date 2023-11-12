import { Outlet, useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';

export default function ProtectedRoute({ userAllowed, redirect_to }) {
  const navigate = useNavigate();
  if(userAllowed) return <Outlet />;
  return navigate(redirect_to);
};

ProtectedRoute.propTypes = {
  userAllowed: PropTypes.bool.isRequired,
  redirect_to: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  redirect_to: '/login',
};