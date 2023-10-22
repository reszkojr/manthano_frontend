import React from 'react';

const ChannelChat = () => {
	const messages = [
		{
			user: 'User1',
			user_id: 1,
			message: 'hey man',
			avatar: 'user1.jpg',
		},
		{
			user: 'User1',
			user_id: 1,
			message: 'do you like bananas?',
			avatar: 'user1.jpg',
		},
		{
			user: 'User2',
			user_id: 2,
			message: 'of course i like bananas man wth who doesnt like bananas',
			avatar: 'user1.jpg',
		},
		{
			user: 'User2',
			user_id: 2,
			message: 'i dont like them',
			avatar: 'user1.jpg',
		},
		{
			user: 'User1',
			user_id: 1,
			message: 'tf do you mean you dont like them',
			avatar: 'user1.jpg',
		},
		{
			user: 'User2',
			user_id: 2,
			message: 'idk man',
			avatar: 'user1.jpg',
		},
		{
			user: 'User2',
			user_id: 2,
			message: 'they taste funny',
			avatar: 'user1.jpg',
		},
		{
			user: 'User1',
			user_id: 1,
			message: 'what the fuck?',
			avatar: 'user1.jpg',
		},
		{
			user: 'User2',
			user_id: 2,
			message: 'yeah man idk',
			avatar: 'user1.jpg',
		},
		{
			user: 'User1',
			user_id: 1,
			message: 'your mom tastes funny',
			avatar: 'user1.jpg',
		},
	];

	return (
		<div className='flex-1 overflow-y-auto p-4'>
			{messages.map((message, index) => (
				<div key={index} className='mb-2 flex'>
					<img src={message.avatar} alt={`pp`} className='mr-2 h-10 w-10' />
					<div>
						<div className='font-semibold'>{message.user}</div>
						<div>{message.message}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChannelChat;
