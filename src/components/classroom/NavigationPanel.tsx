import { FaHashtag, FaVolumeDown } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdExpandMore } from 'react-icons/md';
import classNames from 'classnames';

import { useNavigationPanelCollapse } from '../hooks/UseNavigationPanelCollapse';

import './NavigationPanel.css';

const NavigationPanel = () => {
	const { isPanelCollapsed } = useNavigationPanelCollapse();

	return (
		<div className={classNames('flex h-screen w-56 flex-col gap-3 border-r border-r-gray-600 bg-gray-800 transition-[width] duration-200', { collapsed: isPanelCollapsed })}>
			<div className='flex h-12 w-full items-center justify-between border-b border-b-gray-600 px-4'>
				<span className='my-auto min-w-max text-xl font-bold text-gray-50'>Classroom Name</span>
			</div>
			<div className='space-y-4 px-3'>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<div className='flex min-w-max items-center gap-2 text-sm text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter'>
							CHANNELS <MdExpandMore />
						</div>
						<AiOutlinePlus className='text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</div>
					<div className='text-md ml-4 flex min-w-max flex-col gap-1 text-lg'>
						<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
							<FaHashtag className='h-auto w-4' />
							math
						</div>
						<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
							<FaHashtag className='h-auto w-4' />
							science
						</div>
						<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
							<FaHashtag className='h-auto w-4' />
							geography
						</div>
						<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
							<FaHashtag className='h-auto w-4' />
							chemistry
						</div>
						<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
							<FaHashtag className='h-auto w-4' />
							english
						</div>
					</div>
				</div>
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
