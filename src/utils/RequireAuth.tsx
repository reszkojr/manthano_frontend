import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Props from './Props';
import { useAuth } from '../components/hooks/UseAuth';

const RequireAuth = ({ children }: Props) => {
	const { token } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('/login');
		}
	});

	return <>{token ? children : null}</>;
};

export default RequireAuth;
