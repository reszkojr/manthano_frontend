import { useParams } from 'react-router-dom';
import Header from './channel/Header';
import { ReactElement, useEffect, useRef } from 'react';
import JitsiFrame from './channel/JitsiFrame';
import { useClassroomContext } from '../hooks/UseClassroomContext';
import { isJitsiChannel } from '../../utils/Utils';
import { JitsiChannel } from '../../types/Types';

const VoiceChannel = () => {
	const ref = useRef<ReactElement | null>(null);
	const { classroom } = useClassroomContext();

	useEffect(() => {
		if (isJitsiChannel(classroom?.activeChannel) && classroom?.activeChannel !== null && classroom?.activeChannel !== undefined) {

			const room_name = (classroom?.activeChannel as JitsiChannel).room_name || '';
			ref.current = <JitsiFrame room_name={room_name || ''} />;
		}
		return () => {
			// console.log('unmount');
			ref.current = null;
		};
	}, []);

	if (!ref.current) return null;

	return (
		<div className='flex h-full flex-col bg-gray-800'>
			<Header />
			{ref.current}
		</div>
	);
};

export default VoiceChannel;
