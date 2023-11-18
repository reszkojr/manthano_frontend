import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAuth } from '../components/hooks/UseAuth';
import { Outlet, useNavigate } from 'react-router-dom';
import { Channel, Classroom, Message } from '../types/Types';
import useApi from '../hooks/useApi';

interface ClassroomContextType {
	classroom: Classroom | undefined;
	setClassroom: Dispatch<SetStateAction<Classroom | undefined>>;

	message: Message;
	setMessage: Dispatch<SetStateAction<Message>>;

	messages: Message[] | undefined;
	setMessages: Dispatch<SetStateAction<Message[] | undefined>>;

	sendMessage: (message: Message) => void;

	isPanelCollapsed: boolean;
	setPanelCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const ClassroomContext = createContext<ClassroomContextType>({} as ClassroomContextType);

export const ClassroomProvider = () => {
	const [classroom, setClassroom] = useState<Classroom | undefined>(undefined);
	const [message, setMessage] = useState<Message>({} as Message);
	const [messages, setMessages] = useState<Message[] | undefined>([] as Message[]);
	const [isPanelCollapsed, setPanelCollapsed] = useState(false);
	const [websocket, setWebsocket] = useState<WebSocket | null>(null);

	const navigate = useNavigate();
	const { user, tokenCheck, getClassroom } = useAuth();
	const api = useApi();

	// Get Classroom information
	useEffect(() => {
		const retrieveAndSetClassroom = async () => {
			return await getClassroom(api).then((data) => {
				if (data) setClassroom(data);
			});
		};

		retrieveAndSetClassroom();
	}, []);

	// Instantiate WebSocket instance
	useEffect(() => {
		if (classroom === undefined || !classroom.code) return;

		if (!classroom.activeChannel) {
			if (classroom.channels.length > 0) {
				return navigate(`/classroom/${classroom?.code}`);
			}
			return navigate(`/classroom/${classroom?.code}/${classroom.channels[0].name}`);
		}

		const webSocketURL = `ws://${import.meta.env.VITE_REACT_APP_API}/ws/${classroom.code}/${classroom.activeChannel?.name}/?token=${user!.token}`;

		const ws = new WebSocket(webSocketURL);
		setWebsocket(ws);

		ws.onerror = () => {
			tokenCheck(); // Checking the token makes the user refresh
		};

		ws.onmessage = (event) => {
			const { text, user_id, username, date, id, avatar } = JSON.parse(event.data);
			console.log(JSON.parse(event.data));
			const newMessage = { text, user_id, username, date, id, avatar };
			setMessages((prevMessages) => {
				if (prevMessages) return [...prevMessages, newMessage];
				else return [newMessage];
			});
		};

		return () => {
			try {
				ws.close();
			} catch (error) {
				console.log('error');
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroom?.activeChannel]);

	// Set Classroom's channels
	useEffect(() => {
		const getChannels = async () => {
			await api.get('classroom/channels/').then((response) => {
				const channels: Channel[] = [];
				for (const key in response.data) {
					const id = Number(key);
					channels.push({ id: id, name: response.data[id] });
				}
				setClassroom((prev) => ({ ...prev!, channels: [...channels], activeChannel: channels[0] }));
			});
		};

		getChannels();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const channelsOrder = localStorage.getItem('channels_order');
		if (channelsOrder) {
			const ids = JSON.parse(channelsOrder || '');
			if (!classroom?.channels.length) return;

			const orderedChannels = classroom.channels.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
			setClassroom((prev) => ({
				...prev!,
				channels: orderedChannels,
			}));
			return;
		}
	}, [classroom?.channels]);

	// Fetch Channel messages
	useEffect(() => {
		if (classroom?.activeChannel === undefined) return;
		setMessages(undefined);

		api.get('classroom/messages', { params: { channel_name: classroom?.activeChannel?.name } }).then((response) => {
			setMessages(response.data);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroom?.activeChannel]);

	const sendMessage = (message: Message) => {
		if (websocket) {
			const messageString = JSON.stringify(message);
			websocket.send(messageString);
		}
	};

	if (classroom === undefined || classroom === null) {
		return <div>Loading...</div>;
	}

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
