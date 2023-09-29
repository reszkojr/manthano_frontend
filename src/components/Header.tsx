import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
	const { user } = useContext(AuthContext);
	return (
		<div>
			<Link to='/'>Home</Link>
			<span> | </span>
			<Link to='/classroom'>Classroom</Link>
			<span> | </span>
			<Link to='/faq'>FAQ</Link>
			<span> | </span>
			<Link to='/contribute'>Contribute</Link>
			<span> | </span>
			<Link to='/login'>Login</Link>
			<span> | </span>
			<Link to='/signup'>Sign up</Link>
			{user && <p>Hello, {user.username}!</p>}
		</div>
	);
};

export default Header;
