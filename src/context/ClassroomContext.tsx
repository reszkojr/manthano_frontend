import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useAuth } from '../components/hooks/UseAuth';
import { Outlet, useParams } from 'react-router-dom';
import Props from '../utils/Props';

interface ClassroomContextType {
	classroomName: string;
	setClassroomName: Dispatch<SetStateAction<string>>;

	classroomCode: string;
	setClassroomCode: Dispatch<SetStateAction<string>>;

	classroomChannels: string[];
	setClassroomChannels: Dispatch<SetStateAction<string[]>>;

	classroomActiveChannelCode: string;
	setClassroomActiveChannelCode: Dispatch<SetStateAction<string>>;

	message: Message;
	setMessage: Dispatch<SetStateAction<Message>>;

	messages: Message[];
	setMessages: Dispatch<SetStateAction<Message[]>>;

	sendMessage: (message: Message) => void;

	isPanelCollapsed: boolean;
	setPanelCollapsed: Dispatch<SetStateAction<boolean>>;
}

interface Message {
	user: string;
	user_id: number;
	message: string;
	avatar: string;
}

export const ClassroomContext = createContext<ClassroomContextType>({} as ClassroomContextType);

export const ClassroomProvider = () => {
	const [classroomName, setClassroomName] = useState('');
	const [classroomCode, setClassroomCode] = useState('');
	const [classroomChannels, setClassroomChannels] = useState([] as string[]);
	const [classroomActiveChannelCode, setClassroomActiveChannelCode] = useState('');
	const [message, setMessage] = useState<Message>({} as Message);
	const [messages, setMessages] = useState<Message[]>([] as Message[]);
	const [isPanelCollapsed, setPanelCollapsed] = useState(false);

	const { user, tokenCheck } = useAuth();

	const { classroom_code } = useParams();

	const { sendJsonMessage } = useWebSocket(`ws://localhost:8000/ws/${classroom_code}/?token=${user!.token}`, {
		onError: () => {
			tokenCheck(user!.token || '');
		},
		onOpen: () => {
			console.log('connection opened');
		},
		onMessage: (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			const { user, user_id, avatar, message } = data;
			const newMessage: Message = { user, user_id, avatar, message };
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		},
		shouldReconnect: () => true,
		reconnectAttempts: 2,
	});

	useEffect(() => {
		setClassroomCode(classroom_code || '');
	}, [classroomCode, classroom_code]);

	const sendMessage = (message: Message) => {
		sendJsonMessage(message);
	};

	return (
		<ClassroomContext.Provider
			value={{
				classroomName,
				setClassroomName,
				classroomCode,
				setClassroomCode,
				classroomChannels,
				setClassroomChannels,
				classroomActiveChannelCode,
				setClassroomActiveChannelCode,
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
