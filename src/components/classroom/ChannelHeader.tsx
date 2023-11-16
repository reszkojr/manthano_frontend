import { FaHashtag } from 'react-icons/fa';
import { useClassroomContext } from '../hooks/UseClassroomContext';
import { AiOutlineMenu } from 'react-icons/ai';

const ChannelHeader = () => {
	const { setPanelCollapsed, classroom } = useClassroomContext();

	return (
		<div className='flex h-12 items-center gap-2 border-b border-b-gray-600 px-4 text-gray-200'>
			<button onClick={() => setPanelCollapsed((prev) => !prev)}>
				<AiOutlineMenu />
			</button>
			<div className='flex gap-2'>
				<FaHashtag className='mt-1 h-auto w-4' />
				<span className='min-w-max select-none text-xl font-bold'>{classroom?.activeChannel?.name}</span>
			</div>
		</div>
	);
};

export default ChannelHeader;
