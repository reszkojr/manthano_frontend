import { FormEvent, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
	const { loginUser } = useContext(AuthContext);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		loginUser(e);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' name='username' placeholder='cronaldo7' />
				<input type='password' name='password' placeholder='messisucks' />
				<input type='submit' />
			</form>
		</div>
	);
};

export default LoginPage;
