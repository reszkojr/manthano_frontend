import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage';

import { AuthProvider } from './context/AuthContext';

import SignUpPage from './pages/SignUpPage';

const App = () => {
	return (
		<>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/signup' element={<SignUpPage />} />
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
};

export default App;
