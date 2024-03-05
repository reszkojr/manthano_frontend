import Header from './Header';
import Input from './Input';
import Chat from './Chat';

const Channel = () => {
	return (
		<div className='bg-gray-750 relative flex h-full flex-col'>
			<Header />
			<Chat />
			<Input />
		</div>
	);
};

export default Channel;
