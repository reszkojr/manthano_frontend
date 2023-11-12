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

	const { user, tokenCheck } = useAuth();
	const navigate = useNavigate();
	const api = useApi();

	// Instantiate WebSocket instance
	useEffect(() => {
		if (!classroom.code || !classroom.activeChannel) return;

		const webSocketURL = `ws://localhost:8000/ws/${classroom.code}/${classroom.activeChannel.name}/?token=${user!.token}`;

		const ws = new WebSocket(webSocketURL);
		setWebsocket(ws);

		ws.onerror = () => {
			tokenCheck(); // Checking the token makes the user refresh
		};

		ws.onmessage = (event) => {
			const { text, user, data, id, avatar } = JSON.parse(event.data);
			const newMessage = { text, user, data, id, avatar };
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		};

		return () => {
			ws.close();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroom.activeChannel, user!]);

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroom.activeChannel]);

	// Change URL based on the current active channel
	useEffect(() => {
		if (classroom.activeChannel === undefined) {
			if (classroom.code) navigate(`/classroom/${classroom.code}/`);
			return;
		}
		const url = `/classroom/${classroom.code}/${classroom.activeChannel?.name}`;
		navigate(url);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroom.activeChannel, classroom.code]);

	// Fetch Channel messages
	useEffect(() => {
		if (classroom.activeChannel === undefined) return;

		api.get('classroom/messages', { params: { channel_name: classroom.activeChannel?.name } }).then((response) => {
			setMessages(response.data);
		});
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
