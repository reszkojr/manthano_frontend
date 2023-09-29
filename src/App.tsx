import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

const App = () => {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
