import { FaHashtag, FaVolumeDown } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdExpandMore } from 'react-icons/md';
import classNames from 'classnames';

import { useClassroomContext } from '../hooks/UseClassroomContext';

import './NavigationPanel.css';

const NavigationPanel = () => {
	const { classroom, setClassroom, isPanelCollapsed } = useClassroomContext();

	const handleChannelChange = (key: number) => {
		const channel = classroom.channels.find((ch) => ch.id === key);
		setClassroom((prev) => ({ ...prev, activeChannel: channel }));
	};

	return (
		<div className={classNames('flex h-screen w-56 flex-col gap-3 border-r border-r-gray-600 bg-gray-800 transition-[width] duration-200', { collapsed: isPanelCollapsed })}>
			<div className='flex h-12 w-full items-center justify-between border-b border-b-gray-600 px-4'>
				<span className='my-auto min-w-max text-xl font-bold text-gray-50'>Classroom Name</span>
			</div>
			<div className='space-y-4 px-3'>
				<ul className='flex flex-col gap-2'>
					<li className='flex items-center justify-between'>
						<div className='flex min-w-max items-center gap-2 text-sm text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter'>
							CHANNELS <MdExpandMore />
						</div>
						<AiOutlinePlus className='text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
					{classroom.channels.map((channel) => (
						<li key={channel.id} className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-[4px] text-gray-200 hover:bg-gray-600 ${classroom.activeChannel?.name === channel.name ? 'bg-gray-700 brightness-150' : ''}`} onClick={() => handleChannelChange(channel.id)}>
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
	);
};

export default NavigationPanel;
