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

Modal.setAppElement('#root');
Modal.defaultStyles.overlay!.backgroundColor = 'rgba(0, 0, 0, 0.6)';

const NavigationPanel = () => {
	const { classroom, setClassroom, isPanelCollapsed, setPanelCollapsed } = useClassroomContext();
	const { clicked, setClicked, context, setContext, coords, setCoords } = useContextMenu();
	const [channelName, setChannelName] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
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
		navigate(`${channel?.name}`);
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
				setModalOpen(false);
			})
			.catch((err) => {
				const data = JSON.parse(err.response.data);
				toast.error(data.error.message);
				return;
			});
	};

	const handleChannelContextMenu = (event: MouseEvent, channel: Channel) => {
		event.preventDefault();
		setClicked(true);
		setContext(channel);
		setCoords({ x: event.clientX, y: event.pageY });
	};

	return (
		<div className={classNames('max-h-screen overflow-hidden border-r border-r-gray-600 bg-gray-800 transition-[width] duration-200', { collapsed: isPanelCollapsed, 'w-56': !isPanelCollapsed })}>
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
							<AiOutlinePlus onClick={() => setModalOpen(true)} className='text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter' />
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
			{
				// prettier-ignore
			}
			<CustomModal 
				title='Create Text Channel'
				subtitle="What's gonna be the subject of your channel?"
				submitLabel='Create'
				isOpen={modalOpen}
				onRequestClose={() => setModalOpen(false)}
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
								const targetChannel = context as Channel;
								api.put(`/classroom/channel/edit/${targetChannel.id}`, {
									params: {
										channel_name: (context as Channel).name,
									},
								});
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
		</div>
	);
};

export default NavigationPanel;
