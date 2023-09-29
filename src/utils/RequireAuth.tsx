import { Navigate } from 'react-router-dom';
import Props from './Props';

const RequireAuth = ({ children }: Props) => {
	let auth = false;

	return auth ? children : <Navigate to={'/login'} />;
};

export default RequireAuth;
