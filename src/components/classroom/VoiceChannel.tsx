import Header from './channel/Header';
import JitsiFrame from './channel/JitsiFrame';
import { useClassroomContext } from '../hooks/UseClassroomContext';
import { JitsiChannel } from '../../types/Types';
import { useEffect, useState } from 'react';

const VoiceChannel = () => {
	const { classroom } = useClassroomContext();
	const [key, setKey] = useState(Date.now());

	useEffect(() => {
		setKey(Date.now());
	}, []);

	if (classroom?.activeChannel === undefined) return;

	return (
		<div className='flex h-full flex-col bg-gray-800'>
			<Header />
			<JitsiFrame key={key} room_name={(classroom?.activeChannel as JitsiChannel).room_name || ''} />
		</div>
	);
};

export default VoiceChannel;
