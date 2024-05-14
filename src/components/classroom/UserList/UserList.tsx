import { MdAccountCircle } from 'react-icons/md';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoSettings } from 'react-icons/io5';
import { useClassroomContext } from '../../hooks/UseClassroomContext.tsx';

const UserList = () => {
	const { isPanelCollapsed, classroom } = useClassroomContext();

	return (
		<div className={`transition-[border-radius, background-color] hidden h-full w-16 flex-col items-center gap-3 rounded-2xl p-3 duration-200 md:flex ${isPanelCollapsed && 'bg-gray-850'} ${!isPanelCollapsed && 'rounded-r-none bg-gray-800'}`}>
			<img src='/m_manthano.png' className='mx-auto h-auto w-8 mb-4 select-none' alt='m_manthano' />
			<ul className='flex flex-col gap-2'>
				{classroom?.users.map((user) => (
					<li>
						<div className='w-10 h-10'>
							{
								user.profile_picture ?
									<img src={user.profile_picture} alt={user.username} /> :
									<MdAccountCircle className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter' />
							}
						</div>
					</li>
				))}
			</ul>
			<AiFillPlusCircle className='h-auto w-8 text-gray-200 text-opacity-20 hover:cursor-pointer hover:brightness-150 hover:filter' />
			<IoSettings className='mt-auto h-auto w-8 text-gray-200 text-opacity-20 hover:cursor-pointer hover:brightness-150 hover:filter' />
		</div>
	);
};

export default UserList;
