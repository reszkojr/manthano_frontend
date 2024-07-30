import Header from '../channel/Header.tsx';
import JitsiFrame from './JitsiFrame.tsx';
import { useClassroomContext } from '../../hooks/UseClassroomContext.tsx';
import { JitsiChannel } from '../../../types/Types.tsx';
import { useEffect, useState } from 'react';
import useApi from '../../../hooks/useApi.tsx';

const VoiceChannel = () => {
	const [token, setToken] = useState('');

	const { classroom } = useClassroomContext();
	const api = useApi();

	useEffect(() => {
		const getToken = async () => {
			await api.get('auth/token/jaas').then((response) => {
				if (response) setToken(response.data);
			});
		};
		getToken();
	}, []);

	if (classroom?.activeChannel === undefined) return;

	return (
		<div className='flex h-full flex-col bg-gray-800'>
			<Header />
			<JitsiFrame token={token} room_name={(classroom?.activeChannel as JitsiChannel).room_name || ''} />
		</div>
	);
};

export default VoiceChannel;
