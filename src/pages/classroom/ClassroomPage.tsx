import { FormEvent, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useParams } from 'react-router-dom';

import { useClassroomContext } from '../../components/hooks/UseClassroomContext';
import Sidebar from '../../components/classroom/Sidebar';
import NavigationPanel from '../../components/classroom/NavigationPanel';
import ClassroomChannel from '../../components/classroom/ClassroomChannel';
import { useAuth } from '../../components/hooks/UseAuth';

const ClassroomPage = () => {
	const { classroom_code } = useParams();

	// const { token, tokenCheck } = useAuth();
	// const { classroomCode, setClassroomCode, setMessages } = useClassroomContext();

	useEffect(() => {
		// setClassroomCode(classroom_code || '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroom_code]);

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
