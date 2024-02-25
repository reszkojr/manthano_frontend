import { JitsiMeeting } from '@jitsi/react-sdk';
import { useAuth } from '../../hooks/UseAuth';

const JitsiFrame = ({ room_name }: { room_name: string }) => {
	const { user } = useAuth();

	const render_spinner = () => (
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
		<JitsiMeeting
			roomName={room_name}
			spinner={render_spinner}
			configOverwrite={{
				startWithAudioMuted: true,
				disableModeratorIndicator: true,
				enableEmailInStats: false,
				prejoinPageEnabled: false,
				disableDeepLinking: true,
			}}
			interfaceConfigOverwrite={{
				DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
				SHOW_INVITE_MORE_HEADER: false,
				SHOW_POWERED_BY: false,
				SHOW_WATERMARK_FOR_GUESTS: false,
				PROVIDER_NAME: 'Manthano',
				REMOVE_LOBBY_CHAT_WITH_MODERATOR: false,
				MOBILE_APP_PROMO: false,
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
				iframeRef.style.minWidth = '400px';
				iframeRef.style.width = '100%';
			}}
		/>
	);
};

export default JitsiFrame;
