import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

import LoginPage from './pages/authentication/LoginPage.tsx';
import LandingPage from './pages/landingpage/LandingPage.tsx';
import SignUpPage from './pages/authentication/SignUpPage.tsx';
import Root from './components/Root.tsx';

import '../index.css';
import 'react-toastify/dist/ReactToastify.css';

import { Slide, ToastContainer } from 'react-toastify';
import ClassroomJoinPage from './pages/classroom/ClassroomJoinPage.tsx';
import ClassroomPage from './pages/classroom/ClassroomPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import RequireAuth from './utils/RequireAuth.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route index element={<LandingPage />} />
			{/* Authentication routes */}
			<Route path='auth'>
				<Route path='login' element={<LoginPage />} />
				<Route path='signup' element={<SignUpPage />} />
			</Route>
			{/* Classroom routes */}
			<Route path='classroom' element={<RequireAuth />}>
				<Route path='join' element={<ClassroomJoinPage />} />
				<Route path=':classroom_code'>
					<Route index element={<ClassroomPage />} />
					{/* <Route path=':channel_code' element={<ClassroomChannel />} />   */}
				</Route>
			</Route>
			<Route path='*' element={<ErrorPage />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
		<ToastContainer position='top-center' transition={Slide} autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover theme='dark' />
	</React.StrictMode>
);
