import {MdAccountCircle} from 'react-icons/md';
import {AiFillPlusCircle} from 'react-icons/ai';
import {IoSettings} from 'react-icons/io5';
import {useClassroomContext} from '../../hooks/UseClassroomContext.tsx';
import {BsMortarboardFill} from "react-icons/bs";
import {IoIosBook} from "react-icons/io";

const UserList = () => {
    const {isPanelCollapsed, classroom} = useClassroomContext();

    return (
        <div
            className={`transition-[border-radius, background-color] hidden h-full w-16 flex-col items-center gap-3 rounded-2xl p-3 duration-200 md:flex ${isPanelCollapsed && 'bg-gray-850'} ${!isPanelCollapsed && 'rounded-r-none bg-gray-800'}`}>
            <img src='/m_manthano.png' className='mx-auto h-auto w-8 mb-4 select-none' alt='m_manthano'/>
            <ul className='flex flex-col gap-4'>
                <ul className='flex flex-col gap-2'>
                    {classroom?.users.filter(user => user.role === 'student').map((user) => (
                        <li key={user.id}>
                            <div className='w-10 h-10 relative'>
                                {
                                    user.profile_picture ?
                                        <img src={user.profile_picture} alt={user.username}/> :
                                        <MdAccountCircle
                                            className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter'/>
                                }
                                <BsMortarboardFill
                                    className="h-auto w-6 absolute -right-[4px] -bottom-[4px] border-[3px] border-gray-800 bg-gray-800 w-fill rounded-full text-gray-400 transition-all duration-150 hover:cursor-pointer"/>
                            </div>
                        </li>
                    ))}
                </ul>
                <ul className='flex flex-col gap-2'>
                        {classroom?.users.filter(user => user.role === 'professor').map((user) => (
                        <li key={user.id}>
                            <div className='w-10 h-10 relative'>
                                {
                                    user.profile_picture ?
                                        <img src={user.profile_picture} alt={user.username}/> :
                                        <MdAccountCircle
                                            className='h-auto w-10 text-gray-400 transition-all duration-150 hover:cursor-pointer hover:brightness-125 hover:filter'/>
                                }

                                <IoIosBook
                                    className="h-auto w-6 absolute -right-[4px] -bottom-[4px] border-4 border-gray-800 bg-gray-800 w-fill rounded-full text-gray-400 transition-all duration-150 hover:cursor-pointer"/>
                            </div>
                        </li>
                    ))}
                </ul>
            </ul>
            <AiFillPlusCircle
                className='h-auto w-8 text-gray-200 text-opacity-20 hover:cursor-pointer hover:brightness-150 hover:filter'/>
            <IoSettings
                className='mt-auto h-auto w-8 text-gray-200 text-opacity-20 hover:cursor-pointer hover:brightness-150 hover:filter'/>
        </div>
    );
};

export default UserList;
