import { JitsiMeeting } from '@jitsi/react-sdk';
import { useAuth } from '../hooks/UseAuth';

type VoiceChannelProps = {
	room_name: string;
};

const VoiceChannel = ({ room_name }: VoiceChannelProps) => {
	const { user } = useAuth();

	const renderSpinner = () => (
		<div
			style={{
				fontFamily: 'sans-serif',
				textAlign: 'center',
			}}
		>
			Loading..
		</div>
	);

	return (
		<div className='h-full'>
			<JitsiMeeting
				roomName={room_name}
				spinner={renderSpinner}
				configOverwrite={{
					startWithAudioMuted: true,
					disableModeratorIndicator: true,
					enableEmailInStats: false,
					prejoinPageEnabled: false,
				}}
				interfaceConfigOverwrite={{
					DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
					SHOW_INVITE_MORE_HEADER: false,
					SHOW_POWERED_BY: false,
					SHOW_WATERMARK_FOR_GUESTS: false,
					PROVIDER_NAME: 'Manthano',
					REMOVE_LOBBY_CHAT_WITH_MODERATOR: false,
				}}
				userInfo={{
					displayName: user?.username || '',
					email: 'teste@gmail.com',
				}}
				onApiReady={(externalApi) => {
					console.log(externalApi);
				}}
				getIFrameRef={(iframeRef) => {
					iframeRef.style.height = '100%';
				}}
			/>
		</div>
	);
};

export default VoiceChannel;
