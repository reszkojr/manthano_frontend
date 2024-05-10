import { PiChalkboardTeacher, PiStudentFill } from 'react-icons/pi';
import { FaArrowLeft } from 'react-icons/fa';
import Button from '../../components/elements/Button';
import { useState } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Question from '../../components/auth/Question';
import { Question as QuestionType } from '../../components/auth/Types';

import './transitions.css';

const AccountSetupPage = () => {
	const questionsList = [
		{
			description: "What's gonna be your role in the Classroom?",
			center: false,
			size: 'w-[300px]',
			options: [
				{
					icon: <PiChalkboardTeacher className='text-lapis-400 h-auto w-10' />,
					title: 'Teacher',
					data: 'professor',
				},
				{
					icon: <PiStudentFill className='text-lapis-400 h-auto w-10' />,
					title: 'Student',
					data: 'student',
				},
			],
		},
		{
			description: 'Do you want to create a Classroom or have an invite code?',
			center: true,
			size: 'w-[1000px]',
			options: [
				{
					icon: undefined,
					title: 'I want to create my own classroom',
					data: 'create',
				},
				{
					icon: undefined,
					title: 'I have an invite code',
					data: 'join',
				},
			],
		},
	] as QuestionType[];

	const [questions] = useState<QuestionType[]>(questionsList);
	const [questionsAnswered, setQuestionsAnswered] = useState([] as string[]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const handleOptionClick = (data: string) => {
		setQuestionsAnswered([...questionsAnswered, data]);

		setCurrentQuestionIndex((prev) => prev + 1);
	};

	return (
		<div className='absolute bottom-0 left-0 right-0 top-0 mx-auto flex w-[400px] min-w-[400px] max-w-[700px] flex-col items-center justify-center'>
			<header className='w-full rounded-xl rounded-b-none border border-gray-700 bg-gray-600 p-3'>
				<h1 className='text-center text-xl font-semibold text-gray-300'>Let's setup your account</h1>
			</header>
			<div className='w-full rounded-lg rounded-t-none border border-gray-700 bg-gray-800 shadow transition-all duration-500'>
				<TransitionGroup>
					<CSSTransition addEndListener={() => {}} classNames='question' timeouts={{ enter: 500, exit: 500 }} key={currentQuestionIndex}>
						<Question question={questions[currentQuestionIndex]} handleClick={handleOptionClick} />
					</CSSTransition>
				</TransitionGroup>
			</div>
			<div className='m-2 w-full'>
				<Button disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex((prev) => prev - 1)} className={`w-28 bg-gray-700 transition-opacity duration-150 ${currentQuestionIndex > 0 ? 'opacity-100' : 'disabled opacity-0'}`} icon={<FaArrowLeft className='text-lapis-400' />} label='Return' />
			</div>
		</div>
	);
};

export default AccountSetupPage;
