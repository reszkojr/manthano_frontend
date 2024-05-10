import Card from '../elements/Card';
import { Question as QuestionType } from './Types';

const Question = ({ question, handleClick }: { question: QuestionType; handleClick: (data: string) => void }) => {
	return (
		<div className='items-center space-y-2 p-6 transition-[height] duration-200'>
			<div className='mx-auto flex flex-col'>
				<h2 className='text-center text-gray-300'>{question.description}</h2>
				<ul className='flex-column mt-4 flex justify-center gap-4'>
					{question.options.map((option, id) => (
						<li key={id} className={`w-1/${question.options.length} `}>
							<Card onClick={() => handleClick(option.data)} center={question.center} icon={option.icon} title={option.title} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Question;
