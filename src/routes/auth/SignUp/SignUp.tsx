import { FormEvent } from 'react';

import { useAuth } from '../../../components/hooks/UseAuth';

import TextInput from '../../../components/elements/TextInput';
import Submit from '../../../components/elements/Submit';
import Checkbox from '../../../components/elements/Checkbox';

import { useNavigate } from 'react-router';
import { ResponseData } from '../../../types/Types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const SignUp = () => {
	const { register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userData = {
			username: e.currentTarget.username.value,
			email: e.currentTarget.email.value,
			password: e.currentTarget.password.value,
			password2: e.currentTarget.password2.value,
			first_name: e.currentTarget.first_name.value,
			last_name: e.currentTarget.last_name.value,
		};
		const response: ResponseData = await register(userData);

		if (response.error) {
			Object.keys(response.message).forEach((field) => {
				toast.error(`${response.message[field as keyof typeof response.message]}`);
			});
			return;
		}

		toast.success(response.message);
		return navigate('/auth/login');
	};

	return (
		<div className='mx-auto my-4 w-96 rounded-lg border border-gray-700 bg-gray-800 shadow md:absolute md:bottom-1/2 md:right-1/2 md:w-[600px] md:translate-x-1/2 md:translate-y-1/2'>
			<div className='space-y-4 p-6'>
				<div className=''>
					<h1 className='mb-3 text-2xl font-bold'>Let's get you started!</h1>
					<h2 className='text-gray-300'>Let's get you out of the cave.</h2>
					<h2 className='text-gray-300'>
						Already have an account?{' '}
						<Link to='/auth/login' className='text-lapis-500'>
							Then login here
						</Link>
					</h2>
				</div>
				<form className='flex flex-col gap-4' method='POST' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4'>
						<div className='flex flex-col gap-4 md:flex-row'>
							<TextInput type='text' className='flex-1' name='first_name' placeholder='Diogenes' label='First name' />
							<TextInput type='text' className='flex-1' name='last_name' placeholder='the Cynic' label='Last name' />
						</div>
						<div className='flex flex-col gap-4 md:flex-row'>
							<TextInput type='text' className='flex-1' name='username' placeholder='diogenesdacynic' label='Username' />
							<TextInput type='text' className='flex-1' name='email' placeholder='diogenes@philosopher.com' label='Email' />
						</div>
						<div className='flex flex-col gap-4 md:flex-row'>
							<TextInput type='password' className='flex-1' name='password' placeholder='●●●●●●●●●●●●●' label='Password' />
							<TextInput type='password' className='flex-1' name='password2' placeholder='●●●●●●●●●●●●●' label='Confirm your password' />
						</div>
					</div>
					<div className='my-2 flex justify-between text-gray-300'>
						<Checkbox text='Remember me' id='remember' />
						<a href='/auth/passwordreset' className='text-lapis-500'>
							Forgot your password?
						</a>
					</div>
					<Submit label='Sign up' />
				</form>
			</div>
		</div>
	);
};

export default SignUp;
