import { JaaSMeeting } from '@jitsi/react-sdk';
import { useAuth } from '../../hooks/UseAuth.tsx';

import { useEffect, useState } from 'react';
import { IJitsiMeetExternalApi } from '@jitsi/react-sdk/lib/types';

const JitsiFrame = ({ room_name, token }: { room_name: string; token: string }) => {
	const { user } = useAuth();
	const [externalApi, setExternalApi] = useState<IJitsiMeetExternalApi>();

	useEffect(() => {
		return () => {
			if (externalApi) {
				// externalApi.dispose();
			}
		};
	}, []);

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
		<JaaSMeeting
			appId={'vpaas-magic-cookie-703a24e42f9945bb92d05923ce73c114'}
			jwt={token}
			roomName={room_name}
			spinner={render_spinner}
			configOverwrite={{
				startWithAudioMuted: true,
				startWithVideoMuted: true,
				disableModeratorIndicator: true,
				enableEmailInStats: false,
				prejoinPageEnabled: false,
				disableDeepLinking: true,
				logging: {
					defaultLogLevel: 'error',
				},
			}}
			interfaceConfigOverwrite={{
				DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
				DISPLAY_WELCOME_PAGE_CONTENT: false,
				SHOW_INVITE_MORE_HEADER: false,
				SHOW_POWERED_BY: false,
				SHOW_WATERMARK_FOR_GUESTS: false,
				PROVIDER_NAME: 'Manthano',
				REMOVE_LOBBY_CHAT_WITH_MODERATOR: false,
				MOBILE_APP_PROMO: false,
				LANG_DETECTION: true,
			}}
			userInfo={{
				displayName: user?.username || '',
				email: user?.email || '',
			}}
			onApiReady={(api) => {
				console.log('api ready');
				setExternalApi(api);
			}}
			getIFrameRef={(iframeRef) => {
				iframeRef.style.flex = '1';
				iframeRef.style.minWidth = '400px';
				iframeRef.style.width = '100%';
			}}
		/>
	);
};

export default JitsiFrame;
