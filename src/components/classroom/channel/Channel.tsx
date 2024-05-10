import Header from './Header';
import Input from './Input';
import Chat from './Chat';

const Channel = () => {
	return (
		<div className='relative flex h-full flex-col rounded-2xl bg-gray-800'>
			<Header />
			<Chat />
			<Input />
		</div>
	);
};

export default Channel;
