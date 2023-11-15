import { FaHashtag, FaVolumeDown } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdExpandMore } from 'react-icons/md';
import classNames from 'classnames';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContextMenu } from '../../hooks/useContextMenu';
import { FormEvent, useEffect, useState } from 'react';

import { useClassroomContext } from '../hooks/UseClassroomContext';
import useApi from '../../hooks/useApi';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import {} from 'react-icons/fa';
import ContextMenu from '../elements/ContextMenu';

import './NavigationPanel.css';
import { Channel } from '../../types/Types';
import CustomModal from '../elements/CustomModal';
import TextInput from '../elements/TextInput';
import axios from 'axios';

Modal.setAppElement('#root');
Modal.defaultStyles.overlay!.backgroundColor = 'rgba(0, 0, 0, 0.6)';

const NavigationPanel = () => {
	const { classroom, setClassroom, isPanelCollapsed, setPanelCollapsed } = useClassroomContext();
	const { clicked, setClicked, context, setContext, coords, setCoords } = useContextMenu();
	const [modalAddChannelOpen, setModalAddChannelOpen] = useState(false);
	const [modalEditChannelOpen, setModalEditChannelOpen] = useState(false);
	const [channelName, setChannelName] = useState('');
	const [currentEditChannel, setCurrentEditChannel] = useState<Channel | undefined>(undefined);
	const [isMobile, setIsMobile] = useState(false);
	const navigate = useNavigate();
	const api = useApi();

	useEffect(() => {
		const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
		if (mobileMediaQuery.matches) {
			setIsMobile(true);
			setPanelCollapsed(true);
		}
		mobileMediaQuery.addEventListener('change', (event) => setIsMobile(event.matches));
		return () => {
			mobileMediaQuery.removeEventListener('change', (event) => setIsMobile(event.matches));
		};
	}, []);

	const handleChannelChange = (key: number) => {
		if (isMobile) {
			setPanelCollapsed(true);
		}
		const channel = classroom?.channels.find((ch) => ch.id === key);
		setClassroom((prev) => ({ ...prev!, activeChannel: channel }));
		navigate(`/classroom/${classroom?.code}/${channel?.name}`);
	};

	const handleEditChannelSubmit = async (event: FormEvent) => {
		event.preventDefault();
		await api
			.put(`/classroom/channel/edit/${currentEditChannel?.id}`, {
				channel: JSON.stringify(currentEditChannel),
			})
			.then((response) => {
				const updatedChannel: Channel = response.data;
				setCurrentEditChannel(undefined);
				setModalEditChannelOpen(false);

				setClassroom((prev) => ({
					...prev!,
					channels: [...prev!.channels.map((ch) => (ch.id === updatedChannel.id ? updatedChannel : ch))],
				}));
				navigate(`/classroom/${classroom?.code}/${updatedChannel?.name}`);
			})
			.catch((err) => {
				if (axios.isAxiosError(err)) {
					toast.error(err.response?.data);
				}
			});
	};

	const handleAddChannelSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (channelName.trim().length === 0) {
			toast.error('The Channel name cannot be empty!');
			return;
		}
		await api
			.post('/classroom/channel/add', { channel_name: channelName })
			.then((response) => {
				const channel = response.data;
				setClassroom((prev) => ({
					...prev!,
					channels: [...prev!.channels, channel],
					activeChannel: channel,
				}));
				setChannelName('');
				setModalAddChannelOpen(false);
			})
			.catch((err) => {
				const data = JSON.parse(err.response.data);
				toast.error(data.error.message);
				return;
			});
	};

	const handleChannelContextMenu = (event: MouseEvent<HTMLLIElement, MouseEvent>, channel: Channel) => {
		event.preventDefault();
		setClicked(true);
		setContext(channel);
		setCoords({ x: event.clientX, y: event.pageY });
	};

	return (
		<div className={classNames('max-h-screen overflow-hidden border-r border-r-gray-600 bg-gray-800 transition-[width] duration-200', { collapsed: isPanelCollapsed, 'w-56': !isPanelCollapsed })}>
			{/* Context menu logic */}
			{clicked && (
				<ContextMenu
					top={coords.y}
					left={coords.x}
					context={context}
					options={[
						{
							icon: <FaRegEdit />,
							label: 'Rename',
							onClick: (context) => {
								setCurrentEditChannel(context as Channel);
								setModalEditChannelOpen(true);
							},
						},
						{
							icon: <FaRegTrashAlt />,
							label: 'Delete',
							onClick: (context) => {
								const targetChannel = context as Channel;
								api.delete(`/classroom/channel/delete/${targetChannel.id}`);
								const updatedChannels = classroom?.channels.filter((c) => c.id !== targetChannel.id) || [];
								setClassroom((prev) => ({ ...prev!, channels: updatedChannels, activeChannel: updatedChannels[0] }));
							},
						},
					]}
				/>
			)}
			<div className={classNames('flex flex-col gap-3 transition-opacity duration-200', { 'invisible opacity-0': isPanelCollapsed })}>
				<div className='flex h-12 w-full items-center justify-between border-b border-b-gray-600 px-4'>
					<span className='my-auto min-w-max text-xl font-bold text-gray-50'>{classroom?.name}</span>
				</div>
				<div className='space-y-4 px-3'>
					<ul className='flex flex-col gap-2'>
						<li className='flex min-w-max items-center justify-between'>
							<div className='flex min-w-max items-center gap-2 text-sm text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter'>
								CHANNELS <MdExpandMore />
							</div>
							<AiOutlinePlus onClick={() => setModalAddChannelOpen(true)} className='text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter' />
						</li>
						{classroom?.channels.map((channel) => (
							<li key={channel.id} onContextMenu={(event) => handleChannelContextMenu(event, channel)} className={classNames('flex min-w-max cursor-pointer items-center gap-2 rounded-md px-4 py-[4px] text-gray-200 hover:bg-gray-600', { 'bg-gray-600 text-gray-200 brightness-125': classroom?.activeChannel?.name === channel.name })} onClick={() => handleChannelChange(channel.id)}>
								<FaHashtag className='text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter' />
								{channel.name}
							</li>
						))}
					</ul>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<div className='flex min-w-max items-center gap-2 text-sm text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter'>
								VOICE CHANNELS <MdExpandMore />
							</div>
							<AiOutlinePlus className='text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter' />
						</div>
						<div className='text-md ml-4 flex min-w-max flex-col gap-1 text-lg'>
							<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
								<FaVolumeDown className='h-auto w-4' />
								math
							</div>
							<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
								<FaVolumeDown className='h-auto w-4' />
								science
							</div>
							<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
								<FaVolumeDown className='h-auto w-4' />
								geography
							</div>
							<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
								<FaVolumeDown className='h-auto w-4' />
								chemistry
							</div>
							<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
								<FaVolumeDown className='h-auto w-4' />
								english
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* prettier-ignore */}
			<CustomModal 
				title='Create Text Channel'
				subtitle="What's gonna be the subject of your Channel?"
				submitLabel='Create'
				isOpen={modalAddChannelOpen}
				onRequestClose={() => setModalAddChannelOpen(false)}
				handleSubmit={handleAddChannelSubmit}
				textInput={
					<TextInput
						value={channelName}
						type='text'
						label='Channel name'
						name='channel_name'
						placeholder='philosophy'
						onChange={(event) => setChannelName(event.target.value)} />
				}
			/>
			{/* prettier-ignore */}
			<CustomModal 
				title='Edit Text Channel'
				subtitle="What's gonna be the new name of your Channel?"
				submitLabel='Rename'
				isOpen={modalEditChannelOpen}
				onRequestClose={() => setModalAddChannelOpen(false)}
				handleSubmit={handleEditChannelSubmit}
				textInput={
					<TextInput
						value={currentEditChannel?.name}
						type='text'
						label='New Channel name'
						name='channel_name'
						placeholder='philosophy'
						onChange={(event) => setCurrentEditChannel(prev => ({...prev!, name: event.target.value}))} />
				}
			/>
		</div>
	);
};

export default NavigationPanel;
