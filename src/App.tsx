import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

import Header from './components/Header';

import RequireAuth from './utils/RequireAuth';

const App = () => {
	return (
		<>
			<Router>
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
				</Routes>
			</Router>
		</>
	);
};

export default App;
