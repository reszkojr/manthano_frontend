import { FaHashtag } from 'react-icons/fa';

const ChannelHeader = () => {
	return (
		<div className='flex h-12 items-center gap-2 border-b border-b-gray-600 px-4 text-gray-200'>
			<FaHashtag className='mt-1 h-auto w-4' />
			<span className='text-xl font-bold'>math</span>
		</div>
	);
};

export default ChannelHeader;
