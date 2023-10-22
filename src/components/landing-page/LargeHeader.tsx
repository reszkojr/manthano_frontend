import { Link, useNavigate } from 'react-router-dom';
import { HiUserCircle } from 'react-icons/hi2';

import { useAuth } from '../hooks/UseAuth';

const LargeHeader = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const redirect = () => navigate('/');
	return (
		<nav className='border-b border-b-gray-600'>
			<div className='text-gray flex items-center justify-between p-4 px-12'>
				<div className='flex space-x-12 items-center'>
					<img src='/m_manthano.png' onClick={() => redirect()} className='w-8 cursor-pointer' />
					<nav className='flex space-x-4 text-gray-200'>
						<Link className='hover:rounded-md hover:bg-gray-700 px-3 py-2 hover:text-white' to='/'>
							Home
						</Link>
						<Link className='hover:rounded-md hover:bg-gray-700 px-3 py-2 hover:text-white' to='/classroom'>
							Classroom
						</Link>
						<Link className='hover:rounded-md hover:bg-gray-700 px-3 py-2 hover:text-white' to='/faq'>
							FAQ
						</Link>
						<Link className='hover:rounded-md hover:bg-gray-700 px-3 py-2 hover:text-white' to='/contribute'>
							Contribute
						</Link>
					</nav>
				</div>
				<>
					{user!.username ? (
						<Link to='/profile'>
							<div className='flex space-x-2 items-center hover:rounded-md text-gray-200 hover:bg-gray-700 px-3 py-2 hover:text-white'>
								<HiUserCircle className='mt-1 h-auto w-5' /> <span>{user!.username}</span>
							</div>
						</Link>
					) : (
						<div className='space-x-8 text-gray-50'>
							<Link className='' to='/login'>
								Login
							</Link>
							<Link className='w-60 rounded-[4px] bg-gradient-to-bl from-teal-500 to-lapis-500 px-4 py-2 hover:bg-white' to='/signup'>
								Sign up for free
							</Link>
						</div>
					)}
				</>
			</div>
		</nav>
	);
};

export default LargeHeader;
