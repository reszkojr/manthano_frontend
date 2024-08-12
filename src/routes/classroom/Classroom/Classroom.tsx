import {Outlet} from 'react-router-dom';

import Sidebar from '../../../components/classroom/Sidebar';
import {useEffect, useState} from 'react';
import UserList from '../../../components/classroom/UserList/UserList.tsx';
import {useClassroomContext} from "../../../components/hooks/UseClassroomContext.tsx";
import Button from "../../../components/elements/Button.tsx";

const Classroom = () => {
    const [key, setKey] = useState(Date.now());

    const {classroom} = useClassroomContext();

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
