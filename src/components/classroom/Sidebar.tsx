import { MdAccountCircle } from 'react-icons/md';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoSettings } from 'react-icons/io5';

const Sidebar = () => {
	return (
		<div className='hidden h-screen w-16 flex-col items-center gap-3 border-r border-r-gray-600 bg-gray-900 md:flex '>
			<div className='h-12 w-full border-b border-b-gray-600 p-2'>
				<img src='/m_manthano.png' className='mx-auto h-auto w-8' alt='m_manthano' />
			</div>
			<MdAccountCircle className='h-auto w-8 text-gray-400 hover:cursor-pointer hover:brightness-150 hover:filter' />
			<AiFillPlusCircle className='h-auto w-8 text-gray-400 hover:cursor-pointer hover:brightness-150 hover:filter' />
			<div className='mt-auto h-12 w-full space-y-2 border-t border-t-gray-600'>
				<IoSettings className='mx-auto my-2 h-auto w-8 text-gray-400 hover:cursor-pointer hover:brightness-150 hover:filter' />
			</div>
		</div>
	);
};

export default Sidebar;
