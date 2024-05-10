import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Slide, ToastContainer } from 'react-toastify';
import Root from './components/Root';
import LandingPage from './pages/landingpage/LandingPage';
import LoginPage from './pages/authentication/LoginPage';
import SignUpPage from './pages/authentication/SignUpPage';
import RequireAuth from './utils/RequireAuth';
import ClassroomJoinPage from './pages/classroom/ClassroomJoinPage';
import { ClassroomProvider } from './context/ClassroomContext';
import ClassroomPage from './pages/classroom/ClassroomPage';
import Channel from './components/classroom/channel/Channel';
import ErrorPage from './pages/ErrorPage';

import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import VoiceChannel from './components/classroom/VoiceChannel';
import AccountSetupPage from './pages/authentication/AccountSetupPage';

const Manthano = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' Component={Root}>
				<Route index Component={LandingPage} />
				<Route path='auth'>
					<Route path='setup' Component={AccountSetupPage} />
					<Route path='login' Component={LoginPage} />
					<Route path='signup' Component={SignUpPage} />
				</Route>
				<Route Component={RequireAuth}>
					<Route path='join' Component={ClassroomJoinPage} />
					<Route path='classroom' Component={ClassroomProvider}>
						<Route path=':classroom_code' Component={ClassroomPage}>
							<Route path='vc'>
								<Route path=':channel_code' Component={VoiceChannel} />
							</Route>
							<Route path='c'>
								<Route path=':channel_code' Component={Channel} />
							</Route>
						</Route>
					</Route>
				</Route>
				<Route path='*' Component={ErrorPage} />
			</Route>
		)
	);

	return (
		<>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
			<ToastContainer position='top-center' transition={Slide} autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover theme='dark' />
		</>
	);
};

export default Manthano;
