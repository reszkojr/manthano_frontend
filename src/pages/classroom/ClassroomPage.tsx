import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ClassroomChannel from '../../components/classroom/ClassroomChannel';
import NavigationPanel from '../../components/classroom/NavigationPanel';
import Sidebar from '../../components/classroom/Sidebar';
import { useClassroomContext } from '../../components/hooks/UseClassroomContext';

const ClassroomPage = () => {
	const { classroom_code } = useParams();

	// const { token, tokenCheck } = useAuth();
	const { setClassroom } = useClassroomContext();

	useEffect(() => {
		setClassroom((prev) => ({...prev, code: classroom_code || ''}));
	}, []);

	return (
		<div className='flex w-full'>
			<div className='flex w-min'>
				<Sidebar />
				<NavigationPanel />
			</div>
			<div className='w-full'>
				<ClassroomChannel />
			</div>
		</div>
	);
};

export default ClassroomPage;
