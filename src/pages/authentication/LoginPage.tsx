import { FormEvent } from 'react';
import { useAuth } from '../../components/hooks/UseAuth';
import { Link, useNavigate } from 'react-router-dom';

import TextInput from '../../components/elements/TextInput';
import Submit from '../../components/elements/Submit';
import Checkbox from '../../components/elements/Checkbox';

import { toast } from 'react-toastify';
import { ResponseData } from '../../types/Types';

const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userData = {
			email: e.currentTarget.email.value,
			password: e.currentTarget.password.value,
		};
		const response: ResponseData = await login(userData);

		if (response.error) {
			Object.keys(response.message).forEach((field) => {
				toast.error(`${response.message[field as keyof typeof response.message]}`);
			});
			return;
		}

		toast.success(response.message);
		return navigate('/join');
	};

	return (
		<div className='absolute bottom-1/2 right-1/2 mt-0 w-96 translate-x-1/2 translate-y-1/2 rounded-lg border border-gray-700 bg-gray-800 p-0 shadow'>
			<div className='space-y-4 p-6'>
				<div className=''>
					<h1 className='mb-3 text-2xl font-bold'>Welcome back!</h1>
					<h2 className='text-gray-300'>Let's start your classroom in just a few clicks.</h2>
					<h2 className='text-gray-300'>
						Don't have an account?{' '}
						<Link to='/auth/signup' className='text-lapis-500'>
							Sign up
						</Link>
					</h2>
				</div>
				<form method='POST' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4'>
						<TextInput type='text' name='email' placeholder='fabio@reszko.dev' label='Email' />
						<TextInput type='password' name='password' placeholder='●●●●●●●●●●●●●' label='Password' />
						<div className='my-2 flex justify-between text-gray-300'>
							<Checkbox text='Remember me' id='remember' />
							<a href='/auth/password md:w-[400px]' className='text-lapis-500'>
								Forgot your password?
							</a>
						</div>
						<Submit label='Sign in' />
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
