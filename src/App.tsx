import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import ClassroomJoinPage from './pages/classroom/ClassroomJoinPage';
import LandingPage from './pages/landingpage/LandingPage';
import LoginPage from './pages/authentication/LoginPage';
import SignUpPage from './pages/authentication/SignUpPage';
import RequireAuth from './utils/RequireAuth';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route
						path='/joinclassroom'
						element={
							<RequireAuth>
								<ClassroomJoinPage />
							</RequireAuth>
						}
					/>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignUpPage />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
