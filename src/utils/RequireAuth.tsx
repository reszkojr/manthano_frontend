import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { useAuth } from '../components/hooks/UseAuth';

const RequireAuth = () => {
	const { token } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('/auth/login');
		}
	});

	return <>{token ? <Outlet /> : null}</>;
};

export default RequireAuth;
