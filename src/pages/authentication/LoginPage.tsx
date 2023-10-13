import { FormEvent } from 'react';
import { useAuth } from '../../components/hooks/UseAuth';
import { useNavigate } from 'react-router-dom';

import TextInput from '../../components/elements/TextInput';
import Submit from '../../components/elements/Submit';
import Checkbox from '../../components/elements/Checkbox';

import './form.css';

const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userData = {
			username: e.currentTarget.email.value,
			password: e.currentTarget.password.value,
		};
		try {
			const response = await login(userData);
			if (response?.status === 200 || response?.status === 201) {
				navigate('/classroom');
			}
		} catch (error) {
			console.error('There was an error while attempting to login:', error);
		}
	};

	return (
		<div className='mt-0 w-96 rounded-lg border border-gray-700 bg-gray-800 p-0 shadow absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2'>
			<div className='space-y-4 p-6'>
				<div className=''>
					<h1 className='mb-3 text-2xl font-bold'>Welcome back!</h1>
					<h2 className='text-gray-300'>Let's start your classroom in just a few clicks.</h2>
					<h2 className='text-gray-300'>
						Still don't have an account?{' '}
						<a href='/signup' className='text-lapis-500'>
							Sign up
						</a>
					</h2>
				</div>
				<form className='flex flex-col gap-4' method='POST' onSubmit={handleSubmit}>
					<TextInput type='text' name='email' placeholder='fabio@reszko.dev' label='Email' />
					<TextInput type='password' name='password' placeholder='●●●●●●●●●●●●●' label='Password' />
					<div className='my-2 flex justify-between text-gray-300'>
						<Checkbox text='Remember me' id='remember' />
						<a href='/auth/password md:w-[400px] rreset' className='text-lapis-500'>
							Forgot your password?
						</a>
					</div>
					<Submit label='Sign in' />
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
