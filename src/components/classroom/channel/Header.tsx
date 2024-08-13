import {FaHashtag, FaVolumeUp} from 'react-icons/fa';
import {useClassroomContext} from '../../hooks/UseClassroomContext';
import {AiOutlineMenu} from 'react-icons/ai';
import {isJitsiChannel} from "../../../utils/Utils.ts";

const Header = () => {
    const {setPanelCollapsed, classroom} = useClassroomContext();

    return (
        <div className='text-white-100 flex h-12 items-center gap-4 px-4'>
            <button className='mt-1 h-auto w-4' onClick={() => setPanelCollapsed((prev) => !prev)}>
                <AiOutlineMenu/>
            </button>
            <div className='flex gap-2'>
                {isJitsiChannel(classroom?.activeChannel) ?
                    <FaVolumeUp className={'mt-1 h-auto w-4'}/> :
                    <FaHashtag className='mt-1 h-auto w-4'/>}
                <span className='min-w-max select-none text-xl font-bold'>{classroom?.activeChannel?.name}</span>
            </div>
        </div>
    );
};

export default Header;
