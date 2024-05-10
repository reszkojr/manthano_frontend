import { Outlet } from 'react-router-dom';

import Sidebar from '../../../components/classroom/Sidebar';
import ActionsPanel from '../../../components/classroom/ActionsPanel';
import { useEffect, useState } from 'react';

const Classroom = () => {
	const [key, setKey] = useState(Date.now());

	useEffect(() => setKey(Date.now()), []);

	return (
		<div className='flex h-[100dvh] w-screen overflow-hidden'>
			<div className='flex w-min'>
				<ActionsPanel />
				<Sidebar />
			</div>
			<div className='w-full'>
				<Outlet key={key} />
			</div>
		</div>
	);
};

export default Classroom;
