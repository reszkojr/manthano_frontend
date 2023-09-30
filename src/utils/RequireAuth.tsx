import { useNavigate } from 'react-router-dom';
import Props from './Props';
import { useEffect, useState } from 'react';

const RequireAuth = ({ children }: Props) => {
	const navigate = useNavigate();
	const [isAuthenticated, setAuthenticated] = useState(false);

	const checkUserToken = () => {
		const userToken = localStorage.getItem('token');
		if (!userToken) {
			setAuthenticated(false);
			return navigate('/login');
		}
		setAuthenticated(true);
	};

	useEffect(() => {
		checkUserToken();
	}, [isAuthenticated]);

	return <>{isAuthenticated ? children : null}</>;
};

export default RequireAuth;
