import React, { FormEventHandler } from 'react';
import Modal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import Submit from './Submit';
import Button from './Button';

interface CustomModalProps {
	title: string;
	subtitle: string;
	submitLabel: string;
	isOpen: boolean;
	onRequestClose: () => void;
	handleSubmit: FormEventHandler<HTMLFormElement>;
	textInput: React.ReactNode;
}

const CustomModal = ({ title, subtitle, submitLabel, isOpen, onRequestClose, handleSubmit, textInput }: CustomModalProps) => {
	return (
		<Modal isOpen={isOpen} className={'absolute bottom-1/2 right-1/2 w-[400px] translate-x-1/2 translate-y-1/2 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow outline-none transition-all md:w-[500px]'} onRequestClose={onRequestClose} contentLabel='Create Channel'>
			<form method='POST' className='flex h-full flex-col items-center justify-center' onSubmit={handleSubmit}>
				<AiFillCloseCircle className='absolute right-2 top-2 h-auto w-5 text-gray-300 transition-all duration-150 hover:cursor-pointer hover:brightness-150' onClick={onRequestClose} />
				<div className='mb-3 w-full p-3'>
					<h1 className='text-lg font-bold'>{title}</h1>
					<h2 className='mb-4 text-gray-200'>{subtitle}</h2>
					{textInput}
				</div>
				<div className='bottom-0 mt-auto flex w-full justify-end gap-2 bg-gray-700 px-2 py-3'>
					<Button label='Cancel' className='w-32' />
					<Submit label={submitLabel} className='w-32' />
				</div>
			</form>
		</Modal>
	);
};

export default CustomModal;
