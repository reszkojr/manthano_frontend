import { FormEvent, useEffect, useState } from 'react';
import { FaUsersSlash, FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';

import axios from 'axios';
import { useAuth } from '../../components/hooks/UseAuth';
import { useNavigate } from 'react-router-dom';

import TextInputWithButton from '../../components/elements/TextInputWithButton';
import Card from '../../components/elements/Card';
import useApi from '../../hooks/useApi';

const ClassroomJoinPage = () => {
	const [classroomCode, setClassroomCode] = useState('');
	const [loading, setLoading] = useState(true);

	const { getClassroom } = useAuth();
	const navigate = useNavigate();
	const api = useApi();

	useEffect(() => {
		const checkUserClassroom = async () => {
			return await getClassroom(api).then((data) => {
				if (data === null) return;
				const { code } = data;
				navigate(`/classroom/${code}`);
				setLoading(false);
			});
		};
		checkUserClassroom();
	});

	const handleJoinClassroomSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		api.post('/classroom/join/', { classroom_code: classroomCode })
			.then(async (response) => {
				if (response.status === 200) {
					toast.success(response.data);
					return navigate(`/classroom/${classroomCode}`);
				}
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					toast.error(error.response?.data, {});
				}
			});
	};

	if (loading) {
		return <div></div>;
	}

	return (
		<>
			<div className='absolute bottom-1/2 right-1/2 mt-0 w-[400px] translate-x-1/2 translate-y-1/2 rounded-lg border border-gray-700 bg-gray-800 p-0 shadow md:w-[500px]'>
				<div className='space-y-4 p-6'>
					<div>
						<h1 className='mb-3 text-2xl font-bold'>Let's get you socializing.</h1>
						<h2 className='text-gray-300'>Using Manthano gives you the ability to be more productive with Classrooms.</h2>
						<h2 className='mt-4 text-gray-300'>Choose a Classroom template to start.</h2>
						<div className='mb-4 mt-4 space-y-4'>
							<Card icon={<FaUsers className='h-auto w-10' />} title='With Teachers' subtitle='Teachers will control and manage the Classroom.' href='/classroom' />
							<Card icon={<FaUsersSlash className='h-auto w-10' />} title='Without Teachers' subtitle='A Classroom with no Teachers to rule them all.' href='/classroom' />
						</div>
						<div className='my-2 flex items-center'>
							<hr className='mx-auto h-[3px] w-1/2 rounded border-0 bg-gray-600' />
							<span className='-translate-y-[7%] px-6 align-baseline text-gray-300'>or</span>
							<hr className='mx-auto h-[3px] w-1/2 rounded border-0 bg-gray-600' />
						</div>
						<form method='POST' onSubmit={handleJoinClassroomSubmit}>
							<div className='flex flex-col'>
								<h1 className='text-gray-300'>Have an invitation code?</h1>
								<h2 className='mb-2 text-gray-300'>Insert the code below and let's get you to socialize.</h2>
								<div className='flex gap-2'>
									<TextInputWithButton className='w-full' type='text' name='classroom_code' placeholder='Classroom code' buttonLabel='Join' buttonType='submit' value={classroomCode} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setClassroomCode(event.target.value)} />
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClassroomJoinPage;
