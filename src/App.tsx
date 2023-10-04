import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage';

import LargeHeader from './components/landing-page/LargeHeader';

import SignUpPage from './pages/SignUpPage';

const App = () => {
	return (
		<>
			<Router>
				<LargeHeader />
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignUpPage />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
