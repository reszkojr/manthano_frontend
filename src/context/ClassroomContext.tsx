import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../components/hooks/UseAuth';

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

interface Classroom {
	name: string;
	code: string;
	channels: string[];
	activeChannelCode: string;
}

interface Message {
	user: string;
	user_id: number;
	message: string;
	avatar: string;
}

export const ClassroomContext = createContext<ClassroomContextType>({} as ClassroomContextType);

export const ClassroomProvider = () => {
	const [classroom, setClassroom] = useState<Classroom>({
		name: '',
		code: '',
		channels: [],
		activeChannelCode: '',
	});
	const [message, setMessage] = useState<Message>({} as Message);
	const [messages, setMessages] = useState<Message[]>([] as Message[]);
	const [isPanelCollapsed, setPanelCollapsed] = useState(false);
	const [websocket, setWebsocket] = useState<WebSocket | null>(null);

	const { user, tokenCheck } = useAuth();

	useEffect(() => {
		if (!classroom.code) return;

		const webSocketURL = 
			`ws://localhost:8000/ws/${classroom.code}/?token=${user!.token}`;

		const ws = new WebSocket(webSocketURL);
		setWebsocket(ws);

		ws.onopen = () => {
			console.log('WebSocket connection opened');
		};

		ws.onclose = () => {
			console.log('WebSocket connection closed');
		}

		ws.onerror = () => {
			console.log('Error trying to connect to socket. Trying to reconnect in one second..')
			setTimeout(() => {
				const ws = new WebSocket(webSocketURL);
				setWebsocket(ws);
			})
			tokenCheck()
		}

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const { user, user_id, avatar, message } = data;
			const newMessage = { user, user_id, avatar, message };
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		};

		return () => {
			ws.close();
		};
	}, [classroom, user]);

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
