import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage';
import LargeHeader from './components/landing-page/LargeHeader';

import SignUpPage from './pages/SignUpPage';

const App = () => {
	return (
		<>
			<AuthProvider>
				<Router>
					<LargeHeader />
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/signup' element={<SignUpPage />} />
					</Routes>
				</Router>
			</AuthProvider>
		</>
	);
};

export default App;
