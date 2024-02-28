import Header from './channel/Header';
import JitsiFrame from './channel/JitsiFrame';
import { useClassroomContext } from '../hooks/UseClassroomContext';
import { JitsiChannel } from '../../types/Types';
import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';

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
