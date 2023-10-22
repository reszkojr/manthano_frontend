import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const RequireAuth = () => {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('/auth/login');
		}
	});

	return <>{token ? <Outlet /> : null}</>;
};

export default RequireAuth;
