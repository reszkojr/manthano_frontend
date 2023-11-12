import { useEffect, useRef } from 'react';
import { useClassroomContext } from '../hooks/UseClassroomContext';

const ChannelChat = () => {
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const { messages } = useClassroomContext();

	// scroll to the bottom when new messages are added
	useEffect(() => scrollToBottom(), [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
	};

	return (
		<div className='flex-1 overflow-y-auto p-4'>
			<div>
				{messages ? (
					messages.map((message, index) => (
						<div key={index} className='mb-4 flex'>
							<div className='mr-4 mt-2 h-10 w-10 overflow-hidden rounded-full'>
								<img src={message.avatar} alt='pp' className='h-10 w-10 object-cover' />
							</div>
							<div className='w-11/12'>
								<div className='font-semibold'>{message.user}</div>
								<div className='whitespace-pre-line'>{message.text}</div>
							</div>
						</div>
					))
				) : (
					<div></div>
				)}
			</div>
			<div ref={messagesEndRef}></div>
		</div>
	);
};

export default ChannelChat;
