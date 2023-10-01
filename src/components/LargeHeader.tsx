import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { HiUserCircle } from 'react-icons/hi2';

import AuthContext from '../context/AuthContext';

const Header = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const redirect = () => navigate('/');
	return (
		<header id='header'>
			<div className='flex items-center px-20 pt-10 text-xl text-gray'>
				<ReactSVG src='/m_manthano.svg' onClick={() => redirect()} className='w-12 cursor-pointer' />
				<div className='flex-end ml-auto flex space-x-64'>
					<div className='ml-6 flex space-x-12'>
						<Link className='transition-colors hover:text-white' to='/'>
							Home
						</Link>
						<Link className='transition-colors hover:text-white' to='/classroom'>
							Classroom
						</Link>
						<Link className='transition-colors hover:text-white' to='/faq'>
							FAQ
						</Link>
						<Link className='transition-colors hover:text-white' to='/contribute'>
							Contribute
						</Link>
					</div>
					<div className='ml-auto'>
						{user ? (
							<Link to='/profile'>
								<div className='flex space-x-2 transition-colors hover:text-white'>
									<HiUserCircle className='mt-1 h-auto w-6' /> <span>{user.username}</span>
								</div>
							</Link>
						) : (
							<Link to='/login'>Login</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
