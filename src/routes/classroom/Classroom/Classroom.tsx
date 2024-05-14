import { Outlet } from 'react-router-dom';

import Sidebar from '../../../components/classroom/Sidebar';
import { useEffect, useState } from 'react';
import UserList from '../../../components/classroom/UserList/UserList.tsx';

const Classroom = () => {
	const [key, setKey] = useState(Date.now());

	useEffect(() => setKey(Date.now()), []);

	return (
		<div className={`bg-gray-850 flex h-screen w-screen p-4`}>
			<div className='flex md:mr-4'>
				<UserList />
				<Sidebar />
			</div>
			<div className='w-full'>
				<Outlet key={key} />
			</div>
		</div>
	);
};

export default Classroom;
