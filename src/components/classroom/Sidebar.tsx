import {DragDropContext, Draggable, DropResult} from '@hello-pangea/dnd';
import axios from 'axios';
import classNames from 'classnames';
import {FormEvent, MouseEvent, useEffect, useState} from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import {FaHashtag, FaRegEdit, FaRegTrashAlt, FaVolumeUp} from 'react-icons/fa';
import {MdExpandMore} from 'react-icons/md';
import Modal from 'react-modal';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import useApi from '../../hooks/useApi';
import {useContextMenu} from '../../hooks/useContextMenu';
import {Channel, JitsiChannel} from '../../types/Types';
import {isJitsiChannel} from '../../utils/Utils';
import ContextMenu from '../elements/ContextMenu';

import './Sidebar.css';
import CustomModal from '../elements/CustomModal';
import {StrictModeDroppable} from '../elements/StrictModeDroppable';
import TextInput from '../elements/TextInput';

import {useClassroomContext} from '../hooks/UseClassroomContext';

Modal.setAppElement('#root');
Modal.defaultStyles.overlay!.backgroundColor = 'rgba(0, 0, 0, 0.6)';

const Sidebar = () => {
    const {classroom, setClassroom, isPanelCollapsed, setPanelCollapsed} = useClassroomContext();
    const {clicked, setClicked, context, setContext, coords, setCoords} = useContextMenu();

    const [modalAddChannelOpen, setModalAddChannelOpen] = useState(false);
    const [modalEditChannelOpen, setModalEditChannelOpen] = useState(false);
    const [modalDeleteChannelOpen, setModalDeleteChannelOpen] = useState(false);

    const [modalJitsiAddChannelOpen, setModalJitsiAddChannelOpen] = useState(false);
    const [modalJitsiEditChannelOpen, setModalJitsiEditChannelOpen] = useState(false);
    const [modalJitsiDeleteChannelOpen, setModalJitsiDeleteChannelOpen] = useState(false);

    const [channelName, setChannelName] = useState('');

    const [selectedChannel, setSelectedChannel] = useState<Channel | JitsiChannel | undefined>(undefined);

    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const api = useApi();

    useEffect(() => {
        if (classroom?.activeChannel === undefined) setPanelCollapsed(false);

        const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
        if (mobileMediaQuery.matches) {
            setIsMobile(true);
            if (classroom?.activeChannel) setPanelCollapsed(true);
        }
        mobileMediaQuery.addEventListener('change', (event) => setIsMobile(event.matches));
        return () => {
            mobileMediaQuery.removeEventListener('change', (event) => setIsMobile(event.matches));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChannelChange = (channel: Channel | JitsiChannel) => {
        if (classroom?.activeChannel === channel) return;
        if (isMobile) {
            setPanelCollapsed(true);
        }

        navigate(`/classroom/${classroom?.code}/${isJitsiChannel(channel) ? 'vc' : 'c'}/${channel?.name}`);
    };

    const handleEditChannelSubmit = async (event: FormEvent, jitsi: boolean) => {
        event.preventDefault();
        await api
            .put(`/classroom/${jitsi ? 'jitsi_' : ''}channel/edit/${selectedChannel?.id}`, {
                channel: JSON.stringify(selectedChannel),
            })
            .then((response) => {
                const updatedChannel = response.data;
                setSelectedChannel(undefined);

                if (jitsi) {
                    setClassroom((prev) => ({
                        ...prev!,
                        jitsi_channels: [...prev!.jitsi_channels.map((ch) => (ch.id === updatedChannel.id ? updatedChannel : ch))],
                    }));
                    setModalJitsiEditChannelOpen(false);
                } else {
                    setClassroom((prev) => ({
                        ...prev!,
                        channels: [...prev!.channels.map((ch) => (ch.id === updatedChannel.id ? updatedChannel : ch))],
                    }));
                    setModalEditChannelOpen(false);
                    navigate(`/classroom/${classroom?.code}/c/${updatedChannel?.name}`);
                }
            })
            .catch((err) => {
                if (axios.isAxiosError(err)) {
                    toast.error(err.response?.data);
                }
            });
    };

    const handleAddChannelSubmit = async (event: FormEvent, jitsi: boolean) => {
        event.preventDefault();
        if (channelName.trim().length === 0) {
            toast.error('The Channel name cannot be empty!');
            return;
        }
        await api
            .post(`/classroom/${jitsi ? 'jitsi_' : ''}channel/add`, {channel_name: channelName})
            .then((response) => {
                const channel = response.data;
                if (jitsi) {
                    setClassroom((prev) => ({
                        ...prev!,
                        jitsi_channels: [...(prev!.jitsi_channels || []), channel],
                    }));
                    setModalJitsiAddChannelOpen(false);
                } else {
                    setClassroom((prev) => ({
                        ...prev!,
                        channels: [...prev!.channels, channel],
                    }));
                    setModalAddChannelOpen(false);
                    navigate(`/classroom/${classroom?.code}/c/${channel?.name}`);
                }
                setChannelName('');
            })
            .catch((err) => {
                const data = JSON.parse(err.response.data);
                toast.error(data.error.message);
                return;
            });
    };

    const handleDeleteChannelSubmit = async (event: FormEvent, jitsi: boolean) => {
        event.preventDefault();
        await api.delete(`/classroom/${jitsi ? 'jitsi_' : ''}channel/delete/${selectedChannel?.id}`).then(() => {
            if (jitsi) {
                const updatedChannels = classroom?.jitsi_channels.filter((c) => c.id !== selectedChannel?.id) || [];
                setClassroom((prev) => ({...prev!, jitsi_channels: updatedChannels}));
                setModalJitsiDeleteChannelOpen(false);
            } else {
                const updatedChannels = classroom?.channels.filter((c) => c.id !== selectedChannel?.id) || [];
                setClassroom((prev) => ({...prev!, channels: updatedChannels}));
                setModalDeleteChannelOpen(false);
            }
            navigate(`/classroom/${classroom?.code}/c/${classroom?.channels[0]?.name}`);
        });
    };

    const handleChannelContextMenu = (event: MouseEvent, channel: Channel | JitsiChannel) => {
        event.preventDefault();
        setClicked(true);
        setContext(channel);
        setCoords({x: event.clientX, y: event.pageY});
    };

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const channels = classroom?.channels || [];
        const [reorderedItem] = channels.splice(result.source.index, 1);

        channels.splice(result.destination.index, 0, reorderedItem);

        setClassroom((prev) => ({
            ...prev!,
            channels,
        }));

        const channelsIds = channels.map((ch) => ch.id);
        localStorage.setItem('channels_order', JSON.stringify(channelsIds));
    };

    return (
        <div className={classNames('z-[1] overflow-hidden transition-[border-radius,width] duration-200', {
            'collapsed rounded-2xl': isPanelCollapsed,
            'w-[80vw] md:w-64': !isPanelCollapsed
        })}>
            {clicked && (
                <ContextMenu
                    top={coords.y}
                    left={coords.x}
                    context={context}
                    options={[
                        {
                            icon: <FaRegEdit/>,
                            label: 'Rename',
                            onClick: (context) => {
                                setSelectedChannel(context as Channel | JitsiChannel);
                                const channel = context as Channel;
                                if (isJitsiChannel(channel)) {
                                    setModalJitsiEditChannelOpen(true);
                                    return;
                                }
                                setModalEditChannelOpen(true);
                            },
                        },
                        {
                            icon: <FaRegTrashAlt/>,
                            label: 'Delete',
                            onClick: (context) => {
                                setSelectedChannel(context as Channel | JitsiChannel);
                                const channel = context as Channel;

                                if (isJitsiChannel(channel)) {
                                    setModalJitsiDeleteChannelOpen(true);
                                    return;
                                }
                                setModalDeleteChannelOpen(true);
                            },
                        },
                    ]}
                />
            )}
            <aside className='h-full rounded-2xl rounded-l-none bg-gray-800 p-2'>
                <div
                    className={classNames('flex flex-col gap-3 transition-opacity duration-200', {'invisible opacity-0': isPanelCollapsed})}>
                    <nav className='flex h-12 w-full items-center justify-between px-4'>
                        <span className='my-auto min-w-max text-xl font-bold text-gray-50'>{classroom?.name}</span>
                    </nav>
                    <div className='space-y-4 px-3'>
                        <ul className='flex flex-col gap-2'>
                            <li className='flex min-w-max items-center justify-between'>
                                <div
                                    className='min-w-max items-center text-sm text-gray-300 text-opacity-70 hover:cursor-pointer hover:brightness-150 hover:filter'>
									<span className='flex select-none gap-2'>
										CHANNELS <MdExpandMore/>
									</span>
                                </div>
                                <AiOutlinePlus onClick={() => setModalAddChannelOpen(true)}
                                               className='text-gray-300 text-opacity-70 hover:cursor-pointer hover:brightness-150 hover:filter'/>
                            </li>

                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <StrictModeDroppable droppableId='channels'>
                                    {(provided) => (
                                        <section {...provided.droppableProps} ref={provided.innerRef}
                                                 className='flex flex-col gap-2'>
                                            {classroom?.channels.map((channel, index) => (
                                                <Draggable key={channel.id} draggableId={channel.id.toString()}
                                                           index={index}>
                                                    {(provided) => (
                                                        <li {...provided.draggableProps} {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            onContextMenu={(event) => handleChannelContextMenu(event, channel)}
                                                            className={classNames('flex min-w-max cursor-pointer items-center gap-2 rounded-md px-4 py-[4px] text-gray-200 hover:bg-gray-600', {'bg-gray-600 text-gray-200 brightness-125': classroom?.activeChannel === channel})}
                                                            onClick={() => handleChannelChange(channel)}>
                                                            <FaHashtag
                                                                className='text-gray-300 text-opacity-70 hover:cursor-pointer hover:brightness-150 hover:filter'/>
                                                            <span className='select-none'>{channel.name}</span>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </section>
                                    )}
                                </StrictModeDroppable>
                            </DragDropContext>
                        </ul>
                        <ul className='flex flex-col gap-2'>
                            <li className='flex min-w-max items-center justify-between'>
                                <div
                                    className='flex min-w-max items-center gap-2 text-sm text-gray-300 text-opacity-70 hover:cursor-pointer hover:brightness-150 hover:filter'>
                                    <span className='flex select-none gap-2'>VOICE CHANNELS</span> <MdExpandMore/>
                                </div>
                                <AiOutlinePlus onClick={() => setModalJitsiAddChannelOpen(true)}
                                               className='text-gray-300 text-opacity-70 hover:cursor-pointer hover:brightness-150 hover:filter'/>
                            </li>
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <StrictModeDroppable droppableId='channels'>
                                    {(provided) => (
                                        <section {...provided.droppableProps} ref={provided.innerRef}
                                                 className='flex flex-col gap-2'>
                                            {classroom?.jitsi_channels &&
                                                classroom?.jitsi_channels.map((channel, index) => (
                                                    <Draggable key={channel.id} draggableId={channel.id.toString()}
                                                               index={index}>
                                                        {(provided) => (
                                                            <li {...provided.draggableProps} {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                onContextMenu={(event) => handleChannelContextMenu(event, channel)}
                                                                className={classNames('flex min-w-max cursor-pointer items-center gap-2 rounded-md px-4 py-[4px] text-gray-200 hover:bg-gray-600', {'bg-gray-600 text-gray-200 brightness-125': classroom?.activeChannel === channel})}
                                                                onClick={() => handleChannelChange(channel)}>
                                                                <FaVolumeUp
                                                                    className='text-gray-300 text-opacity-70 hover:cursor-pointer hover:brightness-150 hover:filter'/>
                                                                <span className='select-none'>{channel.name}</span>
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </section>
                                    )}
                                </StrictModeDroppable>
                            </DragDropContext>
                        </ul>
                    </div>
                </div>
            </aside>
            {/* prettier-ignore */}
            <CustomModal
                title='Create Text Channel'
                subtitle="What's gonna be the subject of your Channel?"
                submitLabel='Create'
                isOpen={modalAddChannelOpen}
                onRequestClose={() => setModalAddChannelOpen(false)}
                handleSubmit={(e) => handleAddChannelSubmit(e, false)}
                textInput={
                    <TextInput
                        value={channelName}
                        type='text'
                        label='Channel name'
                        name='channel_name'
                        placeholder='philosophy'
                        onChange={(event) => setChannelName(event.target.value)}/>
                }
            />
            {/* prettier-ignore */}
            <CustomModal
                title='Edit Text Channel'
                subtitle="What's gonna be the new name of your Channel?"
                submitLabel='Rename'
                isOpen={modalEditChannelOpen}
                onRequestClose={() => setModalEditChannelOpen(false)}
                handleSubmit={(e) => handleEditChannelSubmit(e, false)}
                textInput={
                    <TextInput
                        value={selectedChannel?.name}
                        type='text'
                        label='New Channel name'
                        name='channel_name'
                        placeholder='philosophy'
                        onChange={(event) => setSelectedChannel(prev => ({...prev!, name: event.target.value}))}/>
                }
            />
            {/* prettier-ignore */}
            <CustomModal
                title='Delete Text Channel'
                subtitle="Are you sure you want to delete this Channel?"
                submitLabel='Delete'
                submitColor='bg-red-500'
                isOpen={modalDeleteChannelOpen}
                onRequestClose={() => setModalDeleteChannelOpen(false)}
                handleSubmit={(e) => handleDeleteChannelSubmit(e, false)}
            />

            {/* 			Jitsi Channels			 */}

            {/* prettier-ignore */}
            <CustomModal
                title='Create Voice Channel'
                subtitle="What's gonna be the subject of your Channel?"
                submitLabel='Create'
                isOpen={modalJitsiAddChannelOpen}
                onRequestClose={() => setModalJitsiAddChannelOpen(false)}
                handleSubmit={(e) => handleAddChannelSubmit(e, true)}
                textInput={
                    <TextInput
                        value={channelName}
                        type='text'
                        label='Channel name'
                        name='channel_name'
                        placeholder='philosophy'
                        onChange={(event) => setChannelName(event.target.value)}/>
                }
            />
            {/* prettier-ignore */}
            <CustomModal
                title='Edit Voice Channel'
                subtitle="What's gonna be the new name of your Channel?"
                submitLabel='Rename'
                isOpen={modalJitsiEditChannelOpen}
                onRequestClose={() => setModalJitsiEditChannelOpen(false)}
                handleSubmit={(e) => handleEditChannelSubmit(e, true)}
                textInput={
                    <TextInput
                        value={selectedChannel?.name}
                        type='text'
                        label='New Channel name'
                        name='channel_name'
                        placeholder='philosophy'
                        onChange={(event) => setSelectedChannel(prev => ({...prev!, name: event.target.value}))}/>
                }
            />
            {/* prettier-ignore */}
            <CustomModal
                title='Delete Voice Channel'
                subtitle="Are you sure you want to delete this Channel?"
                submitLabel='Delete'
                submitColor='bg-red-500'
                isOpen={modalJitsiDeleteChannelOpen}
                onRequestClose={() => setModalJitsiDeleteChannelOpen(false)}
                handleSubmit={(e) => handleDeleteChannelSubmit(e, true)}
            />
        </div>
    );
};

export default Sidebar;
