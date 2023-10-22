import { FormEvent, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../components/hooks/UseAuth';
import { NavigationPanelCollapseProvider } from '../../context/NavigationPanelCollapseContext';
import Sidebar from '../../components/classroom/Sidebar';
import NavigationPanel from '../../components/classroom/NavigationPanel';
import ClassroomChannel from '../../components/classroom/ClassroomChannel';

const ClassroomPage = () => {
	const { classroom_code } = useParams();
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<string[]>([]);
	const { token, tokenCheck } = useAuth();

	const { sendJsonMessage } = useWebSocket(`ws://localhost:8000/ws/${classroom_code}/?token=${token}`, {
		onError: () => {
			tokenCheck(token || '');
		},
		onMessage: (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			const message = `${data['user']}: ${data['message']}`;
			setMessages([...messages, message]);
		},
		shouldReconnect: () => true,
		reconnectAttempts: 2,
	});

	const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const message = event.currentTarget.message.value;
		sendJsonMessage({ message: message });

		setMessage('');
		// setMessages([...messages, message]);
	};

	return (
		<div className='flex w-full'>
			<NavigationPanelCollapseProvider>
				<div className='flex w-min'>
					<Sidebar />
					<NavigationPanel />
				</div>
				<div className='w-full'>
					<ClassroomChannel />
				</div>
			</NavigationPanelCollapseProvider>
		</div>
	);
};

export default ClassroomPage;
