import { BiImageAdd, BiSolidSend } from 'react-icons/bi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { FiAtSign } from 'react-icons/fi';

import './ChannelInput.css';
import { AiOutlineGif } from 'react-icons/ai';

const MessageInput = () => {
	return (
		<div className='m-4 overflow-auto rounded-md border border-gray-600 px-2 pt-2 shadow-2xl'>
			<div className='mb-2 flex gap-4'>
				<div contentEditable={true} spellCheck={false} id='message_input' className='min-h-8 max-h-28 w-full resize-none p-0 text-gray-50'></div>
				<BiSolidSend className='mb-auto h-auto w-6 hover:cursor-pointer hover:brightness-150 hover:filter' />
			</div>
			<div className='h-8'>
				<ul className='mb-auto flex items-center gap-3'>
					<li>
						<BiImageAdd className='h-auto w-5 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
					<li>
						<AiOutlineGif className='h-auto w-6 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
					<li>
						<HiOutlineEmojiHappy className='h-auto w-5 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
					<li>
						<FiAtSign className='h-auto w-5 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default MessageInput;
