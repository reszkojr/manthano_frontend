import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {useAuth} from '../components/hooks/UseAuth';

const RequireAuth = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.token) {
            navigate('/auth/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return <>{user ? <Outlet/> : null}</>;
};

export default RequireAuth;
