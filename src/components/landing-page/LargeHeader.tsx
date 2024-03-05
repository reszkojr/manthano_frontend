import { Link, useNavigate } from 'react-router-dom';
import { HiUserCircle } from 'react-icons/hi2';

import { useAuth } from '../hooks/UseAuth';

const LargeHeader = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const redirect = () => navigate('/');
	return (
		<nav className='border-b border-b-gray-700'>
			<div className='text-gray flex items-center justify-between p-4 px-12'>
				<div className='flex items-center space-x-12'>
					<img src='/m_manthano.png' onClick={() => redirect()} className='w-8 cursor-pointer' />
					<nav className='flex space-x-4 text-gray-200'>
						<Link className='px-3 py-2 hover:rounded-md hover:bg-gray-700 hover:text-white' to='/'>
							Home
						</Link>
						<Link className='px-3 py-2 hover:rounded-md hover:bg-gray-700 hover:text-white' to='/classroom'>
							Classroom
						</Link>
						<Link className='px-3 py-2 hover:rounded-md hover:bg-gray-700 hover:text-white' to='/faq'>
							FAQ
						</Link>
						<Link className='px-3 py-2 hover:rounded-md hover:bg-gray-700 hover:text-white' to='/contribute'>
							Contribute
						</Link>
					</nav>
				</div>
				<>
					{user ? (
						<Link to='/profile'>
							<div className='flex items-center space-x-2 px-3 py-2 text-gray-200 hover:rounded-md hover:bg-gray-700 hover:text-white'>
								<HiUserCircle className='mt-1 h-auto w-5' /> <span>{user!.username}</span>
							</div>
						</Link>
					) : (
						<div className='flex items-center space-x-8 text-gray-50'>
							<Link to='/auth/login'>Login</Link>
							<Link to='/auth/signup'>
								<div className='to-lapis-500 rounded-[4px] bg-gradient-to-bl from-teal-500 px-4 py-2 hover:bg-white'>Sign up</div>
							</Link>
						</div>
					)}
				</>
			</div>
		</nav>
	);
};

export default LargeHeader;
