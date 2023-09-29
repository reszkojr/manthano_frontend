import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';

import RequireAuth from './utils/RequireAuth';
import SignUpPage from './pages/SignUpPage';

const App = () => {
	return (
		<>
			<Router>
				<AuthProvider>
					<Header />
					<Routes>
						<Route
							path='/'
							element={
								<RequireAuth>
									<LandingPage />
								</RequireAuth>
							}
						/>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/signup' element={<SignUpPage />} />
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
};

export default App;
