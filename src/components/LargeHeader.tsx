import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import AuthContext from '../context/AuthContext';

const Header = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const redirect = () => navigate('/');
	return (
		<header id='header'>
			<div className='flex items-center px-20 pt-10 text-2xl text-gray'>
				<ReactSVG src='/m_manthano.svg' onClick={() => redirect()} className='w-12' />
				<div className='flex-end ml-auto flex space-x-64'>
					<div className='ml-6 flex space-x-12'>
						<Link to='/'>Home</Link>
						<Link to='/classroom'>Classroom</Link>
						<Link to='/faq'>FAQ</Link>
						<Link to='/contribute'>Contribute</Link>
					</div>
					<div className='ml-auto'>{user ? <Link to='/profile'>{user.username}</Link> : <Link to='/login'>Login</Link>}</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
