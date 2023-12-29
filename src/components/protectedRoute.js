import { Outlet, useNavigate } from 'react-router-dom';
// eslint-disable-next-line
import { PropTypes } from 'prop-types';

export default function ProtectedRoute({ userAllowed, redirectTo }) {
  const navigate = useNavigate();
  if (userAllowed) return <Outlet />;
  return navigate(redirectTo);
}

ProtectedRoute.propTypes = {
  userAllowed: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  redirectTo: '/login',
};
