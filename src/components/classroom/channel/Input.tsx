import EmojiPicker, { EmojiStyle, SuggestionMode, Theme } from 'emoji-picker-react';
import { BiImageAdd, BiSolidSend } from 'react-icons/bi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { FiAtSign } from 'react-icons/fi';
import classNames from 'classnames';
import { AiOutlineGif } from 'react-icons/ai';

import { KeyboardEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { useClassroomContext } from '../../hooks/UseClassroomContext';

import './Input.css';

const Input = () => {
	const [inputContent, setInputContent] = useState('');
	const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

	const { sendMessage, classroom } = useClassroomContext();

	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const emojiPickerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickEmojiPicker = (event: MouseEvent) => {
			if (emojiPickerRef === null || !emojiPickerVisible || !emojiPickerRef.current) return;
			if (!emojiPickerRef.current.contains(event.target as Node)) {
				setEmojiPickerVisible(false);
			}
		};

		document.addEventListener('mousedown', handleClickEmojiPicker);
		return () => document.removeEventListener('mousedown', handleClickEmojiPicker);
	}, [emojiPickerVisible]);

	const handleMessageSend = () => {
		if (inputContent.trim() == '') return;
		const message = {
			text: inputContent,
		};
		sendMessage(message);
		setInputContent('');
	};

	const handleTextAreaEnter = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleMessageSend();
		}
	};

	const handleTouchEnd = (event: TouchEvent<SVGElement>) => {
		event.preventDefault();
		handleMessageSend();
	};

	return (
		<div className='blur-backdrop m-4 w-[95%] rounded-md px-2 pt-2'>
			<div className='mb-2 flex gap-4'>
				<textarea ref={textAreaRef} value={inputContent} placeholder={`Message #${classroom?.activeChannel?.name}`} onKeyDown={handleTextAreaEnter} onChange={(event) => setInputContent(event.target.value)} spellCheck={false} id='message_input' className='min-h-8 bg-classroom-700 placeholder:text-classroom-400 max-h-28 w-full resize-none rounded-xl border-none bg-transparent bg-opacity-20 p-2 text-gray-100 outline-none' />
				<BiSolidSend onTouchEnd={handleTouchEnd} onClick={handleMessageSend} className='mb-auto h-auto w-6 hover:cursor-pointer hover:brightness-150 hover:filter' />
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
						<HiOutlineEmojiHappy onClick={() => setEmojiPickerVisible((prev) => !prev)} className='h-auto w-5 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
					<li>
						<FiAtSign className='h-auto w-5 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
				</ul>
			</div>
			<div ref={emojiPickerRef} className={classNames('z-index-30 absolute bottom-28 overflow-auto', { hidden: !emojiPickerVisible })}>
				<EmojiPicker
					theme={Theme.DARK}
					lazyLoadEmojis={true}
					suggestedEmojisMode={SuggestionMode.RECENT}
					emojiStyle={EmojiStyle.TWITTER}
					searchDisabled
					onEmojiClick={(emoji) => {
						setInputContent((prev) => prev + ` ${emoji.emoji} `);
					}}
				/>
			</div>
		</div>
	);
};

export default Input;
