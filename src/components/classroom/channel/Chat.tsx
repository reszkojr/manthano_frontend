import { useEffect, useRef, useState } from 'react';
import SkeletonTheme from 'react-loading-skeleton';
import { useClassroomContext } from '../../hooks/UseClassroomContext';
import { useContextMenu } from '../../../hooks/useContextMenu';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import ContextMenu from '../../elements/ContextMenu';
import { Message } from '../../../types/Types';
import useApi from '../../../hooks/useApi';
import axios from 'axios';
import { toast } from 'react-toastify';

const Chat = () => {
	const messagesRef = useRef<Array<HTMLDivElement | null>>([]);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const [, setLoading] = useState(true);

	const { clicked, setClicked, context, setContext, coords, setCoords } = useContextMenu();
	const { messages, setMessages, classroom } = useClassroomContext();
	const api = useApi();

	useEffect(() => {
		if (messages === undefined || messages === null) {
			setLoading(true);
			return;
		}
		setLoading(false);
	}, [messages]);

	useEffect(() => {
		if (messages === undefined || messages === null) return;
		if (messages.length > 0) messagesRef.current = messagesRef.current?.slice(0, messages?.length);
	}, [messages]);

	// Fetch Channel messages
	useEffect(() => {
		if (classroom?.activeChannel === undefined) return;
		setMessages(undefined);

		const controller = new AbortController();

		api.get('classroom/messages', { params: { channel_name: classroom?.activeChannel?.name }, signal: controller.signal }).then((response) => {
			if (response) {
				setMessages(response.data);
			}
		});

		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroom?.activeChannel]);

	// scroll to the bottom when new messages are added
	useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'instant' }), [messages]);

	const handleMessageContextMenu = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, message: Message) => {
		event.preventDefault();
		setClicked(true);
		setContext(message);
		setCoords({ x: event.clientX, y: event.pageY });
	};

	const handleEditMessage = async (context: unknown) => {
		const message = context as Message;
		const messageEl = messagesRef.current.find((el) => el?.getAttribute('message-id') === message.id?.toString());
		if (!messageEl) return;

		messageEl.focus();
		messageEl.contentEditable = 'true';
		messageEl.className = 'w-fit py-[2px] px-2 bg-gray-900 rounded-md outline-none';

		const sendEditedMessage = async (e: KeyboardEvent) => {
			if (e.key !== 'Enter') return;
			e.preventDefault();
			message.text = messageEl.textContent || '';

			await api
				.put(`/classroom/message/edit/${message.id}`, {
					message: JSON.stringify(message),
				})
				.then(() => {
					messageEl.contentEditable = 'false';
					messageEl.className = '';
					if (!message.edited) {
						const editedSpan = document.createElement('span');
						editedSpan.className = 'text-[12px] text-gray-500';
						editedSpan.textContent = 'edited';
						messageEl.parentElement?.insertAdjacentElement('beforeend', editedSpan);
						message.edited = true;
					}
					messageEl.removeEventListener('keydown', sendEditedMessage);
				})
				.catch((err) => {
					if (axios.isAxiosError(err)) {
						toast.error(err.response?.data);
					}
				});
		};
		messageEl.addEventListener('keydown', sendEditedMessage);
	};

	const handleDeleteMessage = async (context: unknown) => {
		const message = context as Message;
		const messageEl = messagesRef.current.find((el) => el?.getAttribute('message-id') === message.id?.toString());
		if (messageEl === null || messageEl === undefined) return;
		await api.delete(`/classroom/message/delete/${message?.id}`).then(() => {
			setMessages((prev) => prev?.filter((msg) => msg.id !== message.id));
			if (messageEl.getBoundingClientRect().bottom > window.innerHeight) {
				return;
			}

			if (messageEl.getBoundingClientRect().top < 0) {
				messageEl.scrollIntoView({ block: 'nearest' });
			}
		});
	};

	return (
		<div className='mb-4 min-w-max flex-1 gap-0 overflow-y-auto overflow-x-hidden p-4'>
			{/* Context menu logic */}
			{clicked && (
				<ContextMenu
					top={coords.y}
					left={coords.x}
					context={context}
					options={[
						{
							icon: <FaRegEdit />,
							label: 'Edit',
							onClick: handleEditMessage,
						},
						{
							icon: <FaRegTrashAlt />,
							label: 'Delete',
							onClick: handleDeleteMessage,
						},
					]}
				/>
			)}
			{messages ? (
				messages.length > 0 ? (
					<ul className='bottom-0 justify-end'>
						<div className='h-5/6' />
						{messages.map((message, index, msgs) => {
							let content = null;
							if (msgs[index - 1] !== undefined && msgs[index - 1].user === message.user) {
								content = (
									<li key={index} onContextMenu={(event) => handleMessageContextMenu(event, message)} className='flex gap-4'>
										<div className='w-10'></div>
										<div className='flex w-11/12 items-center gap-2'>
											<div message-id={message.id} ref={(el) => (messagesRef.current[index] = el)} className='my-[2px] whitespace-pre-line'>
												{message.text}
											</div>
											{message.edited && <span className='text-[12px] text-gray-500'>edited</span>}
										</div>
									</li>
								);
							} else {
								content = (
									<li key={index} onContextMenu={(event) => handleMessageContextMenu(event, message)} className='mt-4 flex gap-4'>
										<div className='mt-2 h-10 w-10 overflow-hidden rounded-full'>
											<img src={message.avatar} alt='pp' className='h-10 w-10 object-cover' />
										</div>
										<div className='w-11/12'>
											<div className='flex items-center gap-2'>
												<div className='font-semibold'>{message.username}</div>
												<span className='text-sm text-gray-400'>{`${message.date}`}</span>
											</div>
											<div className='flex items-center gap-2'>
												<div message-id={message.id} ref={(el) => (messagesRef.current[index] = el)} className='whitespace-pre-line'>
													{message.text}
												</div>
												{message.edited && <span className='text-[12px] text-gray-500'>edited</span>}
											</div>
										</div>
									</li>
								);
							}
							return content;
						})}
					</ul>
				) : (
					<div className='flex h-full select-none items-center justify-center'>
						<div className='my-auto text-center text-2xl text-gray-400'>No messages here!</div>
					</div>
				)
			) : (
				<ul>
					<div className='h-5/6'>{/* TODO */}</div>
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
				</ul>
			)}
			<div ref={messagesEndRef} className='h-24'></div>
		</div>
	);
};

export default Chat;
