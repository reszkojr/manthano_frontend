import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import {Slide, ToastContainer} from 'react-toastify';
import Root from './components/Root';
import Home from './routes/home/Home/Home';
import Login from './routes/auth/Login/Login';
import SignUp from './routes/auth/SignUp/SignUp';
import RequireAuth from './utils/RequireAuth';
import {ClassroomProvider} from './context/ClassroomContext';
import Classroom from './routes/classroom/Classroom/Classroom';
import Channel from './components/classroom/channel/Channel';
import ErrorPage from './routes/404/ErrorPage/ErrorPage';
import Settings from './routes/settings/Settings/Settings'

import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import VoiceChannel from './components/classroom/voicechannel/VoiceChannel.tsx';
import Setup from "./routes/auth/Setup/Setup.tsx";
import Join from "./routes/classroom/creation/Join/Join.tsx";
import Create from "./routes/classroom/creation/Create/Create.tsx";

import '../index.css';

const Manthano = () => {
    const router = createBrowserRouter(createRoutesFromElements(<Route path='/' Component={Root}>
        <Route index Component={Home}/>
        <Route path='auth'>
            <Route Component={RequireAuth}>
                <Route path='setup' Component={Setup}/>
            </Route>
            <Route path='login' Component={Login}/>
            <Route path='signup' Component={SignUp}/>
        </Route>
        <Route Component={RequireAuth}>
            <Route path='join' Component={Join}/>
            <Route path='create' Component={Create}/>
            <Route path='classroom' Component={ClassroomProvider}>
                <Route path=':classroom_code' Component={Classroom}>
                    <Route path='vc'>
                        <Route path=':channel_code' Component={VoiceChannel}/>
                    </Route>
                    <Route path='c'>
                        <Route path=':channel_code' Component={Channel}/>
                    </Route>
                </Route>
            </Route>
            <Route path='settings' Component={Settings}>
                <Route path='profile' Component={undefined}/>
                <Route path='account' Component={undefined}/>
                <Route path='settings' Component={undefined}/>
                <Route path='settings' Component={undefined}/>
                <Route path='settings' Component={undefined}/>
                <Route path='settings' Component={undefined}/>
            </Route>
        </Route>
        <Route path='*' Component={ErrorPage}/>
    </Route>));

    return (<>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
        <ToastContainer position='top-center' transition={Slide} autoClose={3000} hideProgressBar={false}
                        newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover
                        theme='dark'/>
    </>);
};

export default Manthano;
