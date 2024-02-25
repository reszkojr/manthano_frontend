import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import Sidebar from '../../components/classroom/Sidebar';
import ActionsPanel from '../../components/classroom/ActionsPanel';
import { useClassroomContext } from '../../components/hooks/UseClassroomContext';

const ClassroomPage = () => {
	const { classroom_code, channel_code } = useParams();

	const { classroom, setClassroom } = useClassroomContext();
	const location = useLocation();

	useEffect(() => {
		setClassroom((prev) => ({ ...prev!, code: classroom_code || '' }));
	}, []);

	useEffect(() => {
		if (classroom?.jitsi_channels === undefined) return;

		let channel = null;
		if (location.pathname.includes('/vc/')) {
			channel = classroom?.jitsi_channels.find((ch) => ch.name === channel_code);
		} else if (location.pathname.includes('/c/')) {
			channel = classroom?.channels.find((ch) => ch.name === channel_code);
		}
		setClassroom((prev) => ({ ...prev!, activeChannel: channel }));
	}, [channel_code]);

	return (
		<div className='flex h-[100dvh] w-screen overflow-hidden'>
			<div className='flex w-min'>
				<ActionsPanel />
				<Sidebar />
			</div>
			<div className='w-full'>
				<Outlet />
			</div>
		</div>
	);
};

export default ClassroomPage;
