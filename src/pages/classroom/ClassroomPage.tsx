import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import TextInputWithButton from '../../components/elements/TextInputWithButton';

const ClassroomPage = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		new WebSocket('ws://localhost:8000/ws/');
	}, []);

	const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setMessage('');
		setMessages([...messages, event.currentTarget.message.value]);
	};

	return (
		<div className='w-96 h-96 bg-gray-800 rounded-lg m-auto'>
			<div className='w-full h-full mb-4 p-4'>
				{messages.map((message, i) => (
					<div key={i}>{message}</div>
				))}
			</div>
			<form method='POST' onSubmit={handleMessageSubmit}>
				<TextInputWithButton type='text' value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} className='flex-1 w-full' name='message' placeholder='Type your message here' buttonLabel='Send' buttonType='submit' />
			</form>
		</div>
	);
};

export default ClassroomPage;
