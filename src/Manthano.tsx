import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {Slide, ToastContainer} from 'react-toastify';
import Channel from './components/classroom/channel/Channel';
import VoiceChannel from './components/classroom/voicechannel/VoiceChannel.tsx';
import Root from './components/Root';
import {AuthProvider} from './context/AuthContext';
import {ClassroomProvider} from './context/ClassroomContext';
import ErrorPage from './routes/404/ErrorPage/ErrorPage';
import Login from './routes/auth/Login/Login';
import Setup from "./routes/auth/Setup/Setup.tsx";
import SignUp from './routes/auth/SignUp/SignUp';
import Classroom from './routes/classroom/Classroom/Classroom';
import Create from "./routes/classroom/creation/Create/Create.tsx";

import '../index.css';
import Join from "./routes/classroom/creation/Join/Join.tsx";
import EvalCreate from "./routes/classroom/evaluation/EvalCreate/EvalCreate.tsx";
import Home from './routes/home/Home/Home';
import Settings from './routes/settings/Settings/Settings'

import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import RequireAuth from './utils/RequireAuth';

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
                <Route path={'eval'}>
                    <Route path={'create'} Component={EvalCreate}/>
                </Route>
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
