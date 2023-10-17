import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import ClassroomJoinPage from './pages/classroom/ClassroomJoinPage';
import LandingPage from './pages/landingpage/LandingPage';
import LoginPage from './pages/authentication/LoginPage';
import SignUpPage from './pages/authentication/SignUpPage';
import RequireAuth from './utils/RequireAuth';
import ClassroomPage from './pages/classroom/ClassroomPage';
import { Slide, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<>
			<ToastContainer position='top-right' transition={Slide} autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover theme='dark' />
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
						<Route
							path='/classroom'
							element={
								<RequireAuth>
									<ClassroomPage />
								</RequireAuth>
							}
						/>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/signup' element={<SignUpPage />} />
					</Routes>
				</Router>
			</AuthProvider>
		</>
	);
};

export default App;
