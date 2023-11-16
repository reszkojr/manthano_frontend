import { useEffect, useRef, useState } from 'react';
import SkeletonTheme from 'react-loading-skeleton';
import { useClassroomContext } from '../hooks/UseClassroomContext';

const ChannelChat = () => {
	const [loading, setLoading] = useState(true);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const { messages } = useClassroomContext();

	useEffect(() => {
		messages === undefined ? setLoading(true) : setLoading(false);
	}, [messages]);

	// scroll to the bottom when new messages are added
	useEffect(() => scrollToBottom(), [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
	};

	return (
		<div className='mb-4 min-w-max flex-1 gap-0 overflow-y-auto overflow-x-hidden p-4'>
			<ul className='h-full'>
				{loading && (
					<>
						<li className='mt-4 flex'>
							<div className='mb-2 mr-4 h-12 w-12'>
								<SkeletonTheme circle baseColor='#2f363b' height='100%' highlightColor='#1a2329' />
							</div>
							<div className='w-full'>
								<div className='mb-2'>
									<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'90px'} highlightColor='#1a2329' count={1} />
								</div>
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'40%'} highlightColor='#1a2329' count={1} />
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'35%'} highlightColor='#1a2329' count={1} />
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'19%'} highlightColor='#1a2329' count={1} />
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'22%'} highlightColor='#1a2329' count={1} />
							</div>
						</li>
						<li className='mt-4 flex'>
							<div className='mb-2 mr-4 h-12 w-12'>
								<SkeletonTheme circle baseColor='#2f363b' height='100%' highlightColor='#1a2329' />
							</div>
							<div className='w-full'>
								<div className='mb-2'>
									<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'80px'} highlightColor='#1a2329' count={1} />
								</div>
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'12%'} highlightColor='#1a2329' count={1} />
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'37%'} highlightColor='#1a2329' count={1} />
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'5%'} highlightColor='#1a2329' count={1} />
							</div>
						</li>
						<li className='mt-4 flex'>
							<div className='mb-2 mr-4 h-12 w-12'>
								<SkeletonTheme circle baseColor='#2f363b' height='100%' highlightColor='#1a2329' />
							</div>
							<div className='w-full'>
								<div className='mb-2'>
									<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'140px'} highlightColor='#1a2329' count={1} />
								</div>
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'35%'} highlightColor='#1a2329' count={1} />
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'40%'} highlightColor='#1a2329' count={1} />
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'61%'} highlightColor='#1a2329' count={1} />
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'24%'} highlightColor='#1a2329' count={1} />
								<SkeletonTheme baseColor='#2f363b' height={'20px'} width={'22%'} highlightColor='#1a2329' count={1} />
							</div>
						</li>
					</>
				)}
				{messages &&
					(messages.length > 0 ? (
						messages.map((message, index, msgs) => {
							let content = null;
							if (msgs[index - 1] !== undefined && msgs[index - 1].user === message.user) {
								content = (
									<li key={index} className='flex gap-4'>
										<div className='w-10'></div>
										<div className='w-11/12'>
											<div className='my-[2px] whitespace-pre-line'>{message.text}</div>
										</div>
									</li>
								);
							} else {
								content = (
									<li key={index} className='mt-4 flex gap-4'>
										<div className='mt-2 h-10 w-10 overflow-hidden rounded-full'>
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
								);
							}
							return content;
						})
					) : (
						<div className='flex h-full select-none items-center justify-center'>
							<div className='my-auto text-center text-2xl text-gray-400'>No messages here!</div>
						</div>
					))}
			</ul>
			<div ref={messagesEndRef}></div>
		</div>
	);
};

export default ChannelChat;
