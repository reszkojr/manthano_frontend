import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Props from './Props';

const RequireAuth = ({ children }: Props) => {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('/login');
		}
	});

	return <>{token ? children : null}</>;
};

export default RequireAuth;
