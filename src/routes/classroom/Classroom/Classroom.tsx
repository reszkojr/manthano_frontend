import {Outlet} from 'react-router-dom';

import Sidebar from '../../../components/classroom/Sidebar';
import {useEffect, useState} from 'react';
import UserList from '../../../components/classroom/UserList/UserList.tsx';
import {useClassroomContext} from "../../../components/hooks/UseClassroomContext.tsx";
import Button from "../../../components/elements/Button.tsx";
import {PiNotePencilBold} from "react-icons/pi";
import {useAuth} from "../../../components/hooks/UseAuth.tsx";

const Classroom = () => {
    const [key, setKey] = useState(Date.now());

    const {classroom} = useClassroomContext();
    const {user} = useAuth();

    useEffect(() => setKey(Date.now()), []);

    return (
        <div className={`bg-gray-850 flex h-screen w-screen p-4`}>
            <div className='flex md:mr-4'>
                <UserList/>
                <Sidebar/>
            </div>
            <div className='w-full'>
                {classroom?.activeChannel ? <Outlet key={key}/> : <EmptyChannel/>}

            </div>
            <div className="absolute top-7 right-7 group">
                <div title={'EvalCreate an evaluation'}
                     className={'rounded-2xl bg-persian-600 cursor-pointer group-hover:brightness-125 transition-all duration-150 flex items-center justify-center w-12 h-12'}>
                    <PiNotePencilBold
                        className={'w-3/5 h-auto text-teal-800 transition-all group-hover:text-teal-900 duration-150 group-hover:scale-105'}/>
                </div>
            </div>
        </div>
    );
};

const EmptyChannel = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <img src="/m_manthano.png" className="mx-auto h-auto w-32 opacity-20 mb-4 select-none" alt="m_manthano"/>
            <h1 className="text-4xl font-bold mb-6">
                Welcome to Manthano!
            </h1>
            <div className="flex gap-4">
                <Button
                    label="Select a Channel to start"
                    onClick={() => alert('nothing here')}
                />
                <Button
                    label="Create a Channel"
                    onClick={() =>
                        alert('nothing here too')
                    }
                />
            </div>
        </div>
    );
};

export default Classroom;

