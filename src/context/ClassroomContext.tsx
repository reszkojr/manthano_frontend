import {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useAuth} from '../components/hooks/UseAuth';
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {Channel, Classroom, JitsiChannel, Message} from '../types/Types';
import useApi from '../hooks/useApi';
import {isJitsiChannel} from '../utils/Utils';


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
    const [isPanelCollapsed, setPanelCollapsed] = useState(true);
    const [websocket, setWebsocket] = useState<WebSocket | null>(null);
    const {channel_code, classroom_code} = useParams();

    const navigate = useNavigate();
    const {user, tokenCheck, getClassroom} = useAuth();
    const api = useApi();

    // Get Classroom information
    useEffect(() => {
        setClassroom((prev) => ({...prev!, code: classroom_code!}));

        const setClassroomInformation = async () => {
            return await getClassroom(api).then((data) => {
                if (data) setClassroom(data);
            });
        };

        setClassroomInformation();

        if (classroom?.activeChannel !== undefined && classroom?.activeChannel !== null) {
            const channelType = isJitsiChannel(classroom?.activeChannel) ? 'vc' : 'c';

            return navigate(`/classroom/${classroom?.code}/${channelType}/${classroom.activeChannel.name}`);
        }
    }, []);

    useEffect(() => {
        let channel: JitsiChannel | Channel | undefined;
        if (location.pathname.includes('/vc/')) {
            channel = classroom?.jitsi_channels.find((ch) => ch.name === channel_code);
        } else if (location.pathname.includes('/c/')) {
            channel = classroom?.channels.find((ch) => ch.name === channel_code);
        }
        setClassroom((prev) => ({...prev!, activeChannel: channel}));
    }, [classroom?.jitsi_channels, classroom?.channels, channel_code]);

    // Instantiate WebSocket instance
    useEffect(() => {
        if (classroom === undefined || !classroom.code) return;
        if (classroom.activeChannel === null || classroom.activeChannel === undefined) return;
        if (isJitsiChannel(classroom.activeChannel)) return;
        const webSocketURL = `ws://${import.meta.env.VITE_REACT_APP_API}/ws/${classroom.code}/${classroom.activeChannel?.name}/?token=${user!.token}`;

        const ws = new WebSocket(webSocketURL);
        setWebsocket(ws);

        ws.onerror = () => {
            tokenCheck(); // Checking the token makes the user refresh
        };

        ws.onmessage = (event) => {
            const {text, user, username, date, id, avatar} = JSON.parse(event.data);
            const newMessage = {text, user, username, date, id, avatar};
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

    const sendMessage = (message: Message) => {
        if (websocket) {
            const messageString = JSON.stringify(message);
            websocket.send(messageString);
        }
    };

    if (classroom === undefined || classroom === null || classroom.channels === undefined || classroom.channels === null) {
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
            <Outlet/>
        </ClassroomContext.Provider>
    );
};
