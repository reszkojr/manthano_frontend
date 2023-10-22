import ChannelHeader from './ChannelHeader';
import ChannelInput from './ChannelInput';
import ChannelChat from './ChannelChat';

const ClassroomChannel = (props: { panelCollapse: boolean; setPanelCollapse: React.Dispatch<React.SetStateAction<boolean>> }) => {
	return (
		<div className='flex h-screen w-full flex-col bg-gray-800'>
			<ChannelHeader panelCollapse={props.panelCollapse} setPanelCollapse={props.setPanelCollapse} />
			<ChannelChat />
			<ChannelInput />
		</div>
	);
};

export default ClassroomChannel;
