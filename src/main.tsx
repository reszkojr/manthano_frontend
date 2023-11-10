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
import ClassroomChannel from './components/classroom/ClassroomChannel.tsx';
import { ClassroomProvider } from './context/ClassroomContext.tsx';
import RequireAuth from './utils/RequireAuth.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' Component={Root}>
			<Route index Component={LandingPage} />
			<Route path='auth'>
				<Route path='login' Component={LoginPage} />
				<Route path='signup' Component={SignUpPage} />
			</Route>
			<Route Component={RequireAuth}>
				<Route path='classroom' Component={ClassroomProvider}>
					<Route path='join' Component={ClassroomJoinPage} />
					<Route path=':classroom_code' Component={ClassroomPage}>
						<Route path=':channel_code' Component={ClassroomChannel} />
					</Route>
				</Route>
			</Route>
			<Route path='*' Component={ErrorPage} />
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
