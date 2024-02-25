import Header from './Header';
import Input from './Input';
import Chat from './Chat';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useClassroomContext } from '../../hooks/UseClassroomContext';
import VoiceChannel from '../VoiceChannel';

const Channel = () => {
	const { channel_code } = useParams();

	const { classroom, setClassroom } = useClassroomContext();

	useEffect(() => {
		const channel = classroom?.channels.find((ch) => ch.name === channel_code);
		setClassroom((prev) => ({ ...prev!, activeChannel: channel }));
	}, [channel_code]);

	return (
		<div className='flex h-full flex-col bg-gray-800'>
			<Header />
			{classroom?.activeChannel && 'room_name' in classroom.activeChannel ? (
				<VoiceChannel room_name={classroom.activeChannel.room_name} />
			) : (
				<>
					<Chat /> <Input />
				</>
			)}
		</div>
	);
};

export default Channel;
