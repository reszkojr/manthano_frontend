import { Outlet } from 'react-router-dom';

import Sidebar from '../../../components/classroom/Sidebar';
import { useEffect, useState } from 'react';
import ActionsPanel from '../../../components/classroom/ActionsPanel';

const Classroom = () => {
	const [key, setKey] = useState(Date.now());

	useEffect(() => setKey(Date.now()), []);

	return (
		<div className={`bg-classroom-950 flex h-screen w-screen p-4`}>
			<div className='flex md:mr-4'>
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
