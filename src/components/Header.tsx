import { Link } from 'react-router-dom';

const Header = () => {
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
		</div>
	);
};

export default Header;
