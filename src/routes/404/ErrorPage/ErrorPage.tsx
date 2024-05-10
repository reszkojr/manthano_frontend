import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // Importe o ícone desejado

const ErrorPage = () => {
	return (
		<div className='flex h-screen flex-col items-center justify-center'>
			<div className='text-6xl font-bold text-persian-500'>404</div>
			<div className='mt-4 text-2xl'>Page not found</div>
			<Link to='/' className='mt-4 flex items-center text-persian-300 hover:underline'>
				<FiArrowLeft className='mr-2' /> Return to Home
			</Link>
		</div>
	);
};

export default ErrorPage;
