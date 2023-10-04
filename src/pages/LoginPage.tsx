import { FormEvent } from 'react';

import AuthService from '../services/AuthService';

import TextInput from '../components/elements/TextInput';
import Submit from '../components/elements/Submit';
import Checkbox from '../components/elements/Checkbox';

import './LoginPage.css';

const LoginPage = () => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userData = {
			username: e.currentTarget.username.value,
			password: e.currentTarget.password.value
		}
		const loginResponse = AuthService.handleLogin(userData);
	}

	return (
		<div className='flex flex-col items-center px-6 py-8'>
			<div className='mt-0 w-full max-w-md rounded-lg border border-gray-700 bg-gray-800 p-0 shadow'>
				<div className='space-y-4 p-6'>
					<div className=''>
						<h1 className='mb-3 text-2xl font-bold'>Welcome back!</h1>
						<h2 className='text-gray-300'>Let's start your classroom in just a few clicks.</h2>
						<h2 className='text-gray-300'>
							Still don't have an account? <span className='text-lapis-500'>Sign up</span>
						</h2>
					</div>
					<form className='flex flex-col gap-4' method='POST' onSubmit={handleSubmit}>
						<TextInput type='text' name='username' placeholder='fabio@reszko.dev' label='Email' />
						<TextInput type='password' name='password' placeholder='●●●●●●●●●●●●●' label='Password' />
						<div className='my-2 flex justify-between text-gray-300'>
							<Checkbox text='Remember me' id='remember' />
							<a href='/password/reset' className='text-lapis-500'>
								Forgot your password?
							</a>
						</div>
						<Submit label='Sign in' />
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
