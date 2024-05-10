import { MdAccountCircle } from 'react-icons/md';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoSettings } from 'react-icons/io5';
import { useClassroomContext } from '../hooks/UseClassroomContext';

const ActionsPanel = () => {
	const { isPanelCollapsed } = useClassroomContext();

	return (
		<div className={`transition-[border-radius, background-color] hidden h-full w-16 flex-col items-center gap-3 rounded-2xl p-3 duration-200 md:flex ${isPanelCollapsed && 'bg-gray-850'} ${!isPanelCollapsed && 'rounded-r-none bg-gray-800'}`}>
			<div className='mb-4 h-12 w-full'>
				<img src='/m_manthano.png' className='mx-auto h-auto w-8' alt='m_manthano' />
			</div>
			<ul className='mb-4 flex flex-col gap-2'>
				<MdAccountCircle className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter' />
				<MdAccountCircle className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter' />
				<MdAccountCircle className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter' />
				<MdAccountCircle className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter' />
				<MdAccountCircle className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter' />
				<MdAccountCircle className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter' />
				<MdAccountCircle className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter' />
				<MdAccountCircle className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter' />
			</ul>
			<AiFillPlusCircle className='h-auto w-8 text-gray-200 text-opacity-20 hover:cursor-pointer hover:brightness-150 hover:filter' />
			<IoSettings className='mt-auto h-auto w-8 text-gray-200 text-opacity-20 hover:cursor-pointer hover:brightness-150 hover:filter' />
		</div>
	);
};

export default ActionsPanel;
