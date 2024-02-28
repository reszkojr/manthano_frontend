import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import Sidebar from '../../components/classroom/Sidebar';
import ActionsPanel from '../../components/classroom/ActionsPanel';
import { useClassroomContext } from '../../components/hooks/UseClassroomContext';

const ClassroomPage = () => {
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
