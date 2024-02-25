import ChannelHeader from './ChannelHeader';
import ChannelInput from './ChannelInput';
import ChannelChat from './ChannelChat';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useClassroomContext } from '../hooks/UseClassroomContext';
import VoiceChannel from './VoiceChannel';

const Channel = () => {
	const { channel_code } = useParams();

	const { classroom, setClassroom } = useClassroomContext();

	useEffect(() => {
		const channel = classroom?.channels.find((ch) => ch.name === channel_code);
		setClassroom((prev) => ({ ...prev!, activeChannel: channel }));
	}, [channel_code]);

	return (
		<div className='flex h-full flex-col bg-gray-800'>
			<ChannelHeader />
			{classroom?.activeChannel && 'room_name' in classroom.activeChannel ? (
				<VoiceChannel room_name={classroom.activeChannel.room_name} />
			) : (
				<>
					<ChannelChat /> <ChannelInput />
				</>
			)}
		</div>
	);
};

export default Channel;
