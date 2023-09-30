import axios from 'axios';

export const authenticateUser = async (userData: { username: string; password: string }) => {
	let url = 'http://localhost:8000/auth/token/';
	let headers = { 'Content-Type': 'application/json' };
	console.log(userData);  
	return await axios.post(url, userData, { headers: headers });
};
