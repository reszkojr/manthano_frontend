import { ChangeEvent, Component, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

interface SignUpPageState {
	username: string;
	email: string;
	password: string;
	password2: string;
	first_name: string;
	last_name: string;
	message: string;
	errors: Record<string, string[]>;
}

class SignUpPage extends Component<{}, SignUpPageState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			password2: '',
			first_name: '',
			last_name: '',
			message: '',
			errors: {},
		};
	}

	handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		this.setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (this.state.password !== this.state.password2) {
			alert('The passwords do not match!');
			return;
		}

		const { username, email, password, password2, first_name, last_name } = this.state;

		const formData = { username, email, password, password2, first_name, last_name };

		try {
			const response: AxiosResponse<any> = await axios.post('http://127.0.0.1:8000/auth/register/', formData);

			switch (response.status) {
				case 201:
					this.setState({ message: 'Account succesfully created! Welcome to Manthano!' });
					break;
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				switch (error.response?.status) {
					case 400:
						console.log(error.response?.data);
						this.setState({ errors: error.response?.data });
						break;
					case 500:
						break;
				}
				return;
			}
			console.error('Error:', error);
		}
	};

	render() {
		const errorNotifications = Object.keys(this.state.errors).map((field) => (
			<div key={field}>
				{this.state.errors[field].map((error, index) => (
					<div key={index} className='error-notification'>
						{error}
					</div>
				))}
			</div>
		));
		return (
			<div id='signup-form'>
				<p>{this.state.message}</p>
				{errorNotifications}
				<form onSubmit={this.handleSubmit}>
					<div className='username'>
						<input type='text' id='username' name='username' placeholder='cronaldo7' value={this.state.username} onChange={this.handleChange} />
					</div>
					<div className='email'>
						<input type='text' id='email' name='email' placeholder='cristiano@ronaldo.com' value={this.state.email} onChange={this.handleChange} />
					</div>
					<div className='password'>
						<input type='password' id='password' name='password' placeholder='**********' value={this.state.password} onChange={this.handleChange} />
					</div>
					<div className='password2'>
						<input type='password' id='password2' name='password2' placeholder='**********' value={this.state.password2} onChange={this.handleChange} />
					</div>
					<div className='first-name'>
						<input type='text' id='first_name' name='first_name' placeholder='First name' value={this.state.first_name} onChange={this.handleChange} />
					</div>
					<div className='last-name'>
						<input type='text' id='last_name' name='last_name' placeholder='Last name' value={this.state.last_name} onChange={this.handleChange} />
					</div>
					<input type='submit' value='Sign up' />
				</form>
			</div>
		);
	}
}

export default SignUpPage;
