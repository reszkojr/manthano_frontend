import ChannelHeader from './ChannelHeader';
import ChannelInput from './ChannelInput';
import ChannelChat from './ChannelChat';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useClassroomContext } from '../hooks/UseClassroomContext';

const ClassroomChannel = () => {
	const { channel_code } = useParams();
	const { setClassroom } = useClassroomContext();

	useEffect(() => {
		setClassroom((prev) => ({ ...prev, activeChannelCode: channel_code || '' }));
	}, []);

	return (
		<div className='flex h-screen w-full flex-col bg-gray-800'>
			<ChannelHeader />
			<ChannelChat />
			<ChannelInput />
		</div>
	);
};

export default ClassroomChannel;
