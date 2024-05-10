import Header from './Header';
import Input from './Input';
import Chat from './Chat';

const Channel = () => {
	return (
		<div className='bg-classroom-900 relative flex h-full flex-col rounded-2xl'>
			<Header />
			<Chat />
			<Input />
		</div>
	);
};

export default Channel;
