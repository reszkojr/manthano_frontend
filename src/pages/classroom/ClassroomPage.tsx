import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import NavigationPanel from '../../components/classroom/NavigationPanel';
import Sidebar from '../../components/classroom/Sidebar';
import { useClassroomContext } from '../../components/hooks/UseClassroomContext';

const ClassroomPage = () => {
	const { classroom_code } = useParams();

	const { setClassroom } = useClassroomContext();

	useEffect(() => {
		setClassroom((prev) => ({ ...prev!, code: classroom_code || '' }));
	}, []);

	return (
		<div className='flex h-[100dvh] w-screen overflow-hidden'>
			<div className='flex w-min'>
				<Sidebar />
				<NavigationPanel />
			</div>
			<div className='w-full'>
				<Outlet />
			</div>
		</div>
	);
};

export default ClassroomPage;
