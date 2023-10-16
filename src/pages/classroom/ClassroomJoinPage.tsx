import { FormEvent } from 'react';
import { FaUsersSlash, FaUsers } from 'react-icons/fa';

import TextInputWithButton from '../../components/elements/TextInputWithButton';
import Card from '../../components/elements/Card';

const ClassroomJoinPage = () => {
	const handleJoinClassroomSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		alert('joining classroom...');
	};

	return (
		<>
			<div className='mt-0 w-[400px] md:w-[500px] rounded-lg border border-gray-700 bg-gray-800 p-0 shadow absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2'>
				<div className='space-y-4 p-6'>
					<div>
						<h1 className='mb-3 text-2xl font-bold'>Let's get you socializing.</h1>
						<h2 className='text-gray-300'>Using Manthano gives you the ability to be more productive with Classrooms.</h2>
						<h2 className='mt-4 text-gray-300'>Choose a Classroom template to start.</h2>
						<div className='mt-4 space-y-4 mb-4'>
							<Card icon={<FaUsers className='w-10 h-auto' />} title='With Teachers' subtitle='Teachers will control and manage the Classroom.' href='/classroom' />
							<Card icon={<FaUsersSlash className='w-10 h-auto' />} title='Without Teachers' subtitle='A Classroom with no Teachers to rule them all.' href='/classroom' />
						</div>
						<div className='flex items-center my-2'>
							<hr className='w-1/2 h-[3px] mx-auto border-0 rounded bg-gray-600' />
							<span className='text-gray-300 px-6 align-baseline -translate-y-[7%]'>or</span>
							<hr className='w-1/2 h-[3px] mx-auto border-0 rounded bg-gray-600' />
						</div>
						<form method='POST' onSubmit={handleJoinClassroomSubmit}>
							<div className='flex flex-col'>
								<h1 className='text-gray-300'>Already have an invitation?</h1>
								<h2 className='text-gray-300 mb-2'>Insert the code below and let's get you to socialize.</h2>
								<div className='flex gap-2'>
									<TextInputWithButton className='w-full' type='number' name='classroom_code' placeholder='Classroom code' buttonLabel='Join' buttonType='submit' />
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
