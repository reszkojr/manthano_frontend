import Header from '../channel/Header.tsx';
import {useClassroomContext} from '../../hooks/UseClassroomContext.tsx';
import {useEffect, useState} from 'react';
import useApi from '../../../hooks/useApi.tsx';
import {JaaSMeeting} from "@jitsi/react-sdk";
import {JitsiChannel} from "../../../types/Types.tsx";
import {useAuth} from "../../hooks/UseAuth.tsx";
import {IJitsiMeetExternalApi} from "@jitsi/react-sdk/lib/types";

const VoiceChannel = () => {
    const [token, setToken] = useState('');

    const {classroom} = useClassroomContext();
    // const {channel_code} = useParams();
    const [, setExternalApi] = useState<IJitsiMeetExternalApi>();
    const {user} = useAuth();
    const api = useApi();

    useEffect(() => {
        const getToken = async () => {
            await api.get('auth/token/jaas').then((response) => {
                if (response) setToken(response.data);
            });
        };
        getToken();
    }, [classroom?.activeChannel]);

    useEffect(() => {

    }, [token]);

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
        <div className='flex h-full flex-col bg-gray-800'>
            <Header/>
            {/*<JitsiFrame channel_code={channel_code} token={token} room_name={(classroom?.activeChannel as JitsiChannel).room_name || ''} />*/}
            <JaaSMeeting
                key={classroom?.activeChannel?.id}
                appId={'vpaas-magic-cookie-703a24e42f9945bb92d05923ce73c114'}
                jwt={token}
                roomName={(classroom?.activeChannel as JitsiChannel).room_name}
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
        </div>
    );
};

export default VoiceChannel;
