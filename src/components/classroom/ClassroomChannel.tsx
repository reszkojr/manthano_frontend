import ChannelHeader from './ChannelHeader';
import ChannelInput from './ChannelInput';
import ChannelChat from './ChannelChat';

const ClassroomChannel = () => {
	return (
		<div className='flex h-screen w-full flex-col bg-gray-800'>
			<ChannelHeader />
			<ChannelChat />
			<ChannelInput />
		</div>
	);
};

export default ClassroomChannel;
