import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAuth } from '../components/hooks/UseAuth';
import { Outlet, useNavigate } from 'react-router-dom';
import { Channel, Classroom, Message } from '../types/Types';
import useApi from '../hooks/useApi';

interface ClassroomContextType {
	classroom: Classroom;
	setClassroom: Dispatch<SetStateAction<Classroom>>;

	message: Message;
	setMessage: Dispatch<SetStateAction<Message>>;

	messages: Message[];
	setMessages: Dispatch<SetStateAction<Message[]>>;

	sendMessage: (message: Message) => void;

	isPanelCollapsed: boolean;
	setPanelCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const ClassroomContext = createContext<ClassroomContextType>({} as ClassroomContextType);

export const ClassroomProvider = () => {
	const [classroom, setClassroom] = useState<Classroom>({
		name: '',
		code: '',
		channels: [],
		activeChannel: undefined,
	});
	const [message, setMessage] = useState<Message>({} as Message);
	const [messages, setMessages] = useState<Message[]>([] as Message[]);
	const [isPanelCollapsed, setPanelCollapsed] = useState(false);
	const [websocket, setWebsocket] = useState<WebSocket | null>(null);

	const { user } = useAuth();
	const navigate = useNavigate();
	const api = useApi();

	// Instantiate WebSocket instance
	useEffect(() => {
		if (!classroom.code || !classroom.activeChannel) return;

		const webSocketURL = `ws://localhost:8000/ws/${classroom.code}/${classroom.activeChannel.name}/?token=${user!.token}`;

		const ws = new WebSocket(webSocketURL);
		setWebsocket(ws);

		ws.onopen = () => {
			console.log('WebSocket connection opened');
		};

		ws.onclose = () => {
			console.log('WebSocket connection closed');
		};

		ws.onerror = () => {
			navigate('/404');
			console.log('WebSocket connection error');
			// console.log('Error trying to connect to socket. Trying to reconnect in one second..');
			// setTimeout(() => {
			// 	const ws = new WebSocket(webSocketURL);
			// 	setWebsocket(ws);
			// });
			// tokenCheck();
		};

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const { user, user_id, avatar, message } = data;
			const newMessage = { user, user_id, avatar, message };
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		};

		return () => {
			ws.close();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroom.activeChannel]);

	// Set Classroom's channels
	useEffect(() => {
		const getChannels = async () => {
			await api.get('classroom/channels/').then((response) => {
				const channels: Channel[] = [];
				for (const key in response.data) {
					const id = Number(key);
					channels.push({ id: id, name: response.data[id] });
				}
				setClassroom((prev) => ({ ...prev, channels: [...channels] }));
			});
		};

		getChannels();
	}, []);

	// Change URL based on the current active channel
	useEffect(() => {
		if (classroom.activeChannel?.name === undefined) return;
		const url = `/classroom/${classroom.code}/${classroom.activeChannel.name}`;
		navigate(url);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroom.activeChannel]);

	const sendMessage = (message: Message) => {
		if (websocket) {
			const messageString = JSON.stringify(message);
			websocket.send(messageString);
		}
	};

	return (
		<ClassroomContext.Provider
			value={{
				classroom,
				setClassroom,
				message,
				setMessage,
				messages,
				setMessages,
				sendMessage,
				isPanelCollapsed,
				setPanelCollapsed,
			}}
		>
			<Outlet />
		</ClassroomContext.Provider>
	);
};
