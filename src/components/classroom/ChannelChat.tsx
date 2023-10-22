import { useClassroomContext } from '../hooks/UseClassroomContext';

const ChannelChat = () => {
	// const messages = [
	// 	{
	// 		user: 'User1',
	// 		user_id: 1,
	// 		message: 'hey man',
	// 		avatar: 'user1.jpg',
	// 	},
	// ];

	const { messages } = useClassroomContext();

	return (
		<div className='flex-1 overflow-y-auto p-4'>
			{messages
				? messages.map((message, index) => (
						<div key={index} className='mb-2 flex'>
							<img src={message.avatar} alt={`pp`} className='mr-2 h-10 w-10' />
							<div>
								<div className='font-semibold'>{message.user}</div>
								<div>{message.message}</div>
							</div>
						</div>
				))
				: ''}
		</div>
	);
};

export default ChannelChat;
