import ChannelHeader from './ChannelHeader';
import MessageInput from './MessageInput';
import Chat from './Chat';

const Channel = () => {
	return (
		<div className='flex h-screen w-full flex-col bg-gray-800'>
			<ChannelHeader />
			<Chat />
			<MessageInput />
		</div>
	);
};

export default Channel;
