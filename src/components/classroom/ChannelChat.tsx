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
			<ul>
				{messages ? (
					messages.map((message, index, msgs) => (
						<>
							{msgs[index - 1] !== undefined ? (
								message.user === msgs[index - 1].user ? (
									<li key={index} className='mb-1 flex'>
										<div className='ml-14 w-11/12'>
											<div className='whitespace-pre-line'>{message.text}</div>
										</div>
									</li>
								) : (
									<li key={index} className='mt-4 flex'>
										<div className='mr-4 mt-2 h-10 w-10 overflow-hidden rounded-full'>
											<img src={message.avatar} alt='pp' className='h-10 w-10 object-cover' />
										</div>
										<div className='w-11/12'>
											<div className='flex items-center gap-2'>
												<div className='font-semibold'>{message.user}</div>
												<span className='text-sm text-gray-400'>{`${message.date}`}</span>
											</div>
											<div className='whitespace-pre-line'>{message.text}</div>
										</div>
									</li>
								)
							) : (
								<li key={index} className='flex'>
									<div className='mr-4 mt-2 h-10 w-10 overflow-hidden rounded-full'>
										<img src={message.avatar} alt='pp' className='h-10 w-10 object-cover' />
									</div>
									<div className='w-11/12'>
										<div className='font-semibold'>{message.user}</div>
										<div className='whitespace-pre-line'>{message.text}</div>
									</div>
								</li>
							)}
						</>
					))
				) : (
					<div></div>
				)}
			</ul>
			<div ref={messagesEndRef}></div>
		</div>
	);
};

export default ChannelChat;
