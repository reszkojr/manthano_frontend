import Button from "../elements/Button.tsx";
import SlideTransition from "../animation/SlideTransition.tsx";
import TextInput from "../elements/TextInput.tsx";
import {useSetupContext} from "../hooks/useSetupContext.tsx";
import {PiStudentFill} from "react-icons/pi";

const GeneralQuestion = () => {
    const {answers, updateAnswer} = useSetupContext();

    return (
        <SlideTransition>
            <div className='flex flex-col items-center gap-6 w-full justify-center'>
                <h1 className='text-xl text-gray-100'>Are you a student or a professor?</h1>
                <div className={'flex justify-between gap-12 w-full'}>
                    <Button label={'Student'} icon={<PiStudentFill
                        className={`text-lapis-400 h-auto w-10 ${answers['role'] === 'student' && 'text-lapis-200'}`}/>}
                            className={`w-3/5 justify-center ${answers['role'] === 'student' && 'bg-lapis-500'}`}
                            onClick={() => updateAnswer('role', 'student')}/>
                    <Button label={'Professor'} icon={<PiStudentFill
                        className={`text-lapis-400 h-auto w-10 ${answers['role'] === 'professor' && 'text-lapis-200'}`}/>}
                            className={`w-3/5 justify-center ${answers['role'] === 'professor' && 'bg-lapis-500'}`}
                            onClick={() => updateAnswer('role', 'professor')}/>
                </div>
            </div>
        </SlideTransition>
    )
}

const StudentQuestion1 = () => {
    const {answers, updateAnswer} = useSetupContext();

    return <SlideTransition>
        <div className='flex flex-col items-center gap-2 w-full justify-center'>
            <h1 className='text-xl text-gray-100'>What's your academic email?</h1>
            <TextInput defaultValue={answers['academic_email']} name={'academic_email'}
                       onChange={(text) => updateAnswer('academic_email', text.currentTarget.value)}
                       placeholder={'Provide your academic email address'} className={'w-full'}
                       type={'text'}/>
        </div>
    </SlideTransition>
};

const StudentQuestion2 = () => {
    const {answers, updateAnswer} = useSetupContext();

    return <SlideTransition>
        <div className='flex flex-col items-center gap-2 w-full justify-center'>
            <h1 className='text-xl text-gray-100'>What is your enrollment number?</h1>
            <TextInput defaultValue={answers['enrollment']} name='enrollment' onChange={(text) => updateAnswer('enrollment', text.currentTarget.value)}
                       placeholder='Provide your enrollment number' type='text' className={'w-full'}/>
        </div>
    </SlideTransition>
};

const ProfessorQuestion1 = () => {
    const {answers, updateAnswer} = useSetupContext();

    return <SlideTransition>
        <div className='flex flex-col items-center gap-2 w-full justify-center'>
            <h1 className='text-xl text-gray-100'>What is your academic email address?</h1>
            <TextInput defaultValue={answers['academic_email']} name='academic_email'
                       onChange={(text) => updateAnswer('academic_email', text.currentTarget.value)}
                       placeholder='Provide your academic email address' type='email'
                       className={'w-full'}/>
        </div>
    </SlideTransition>
};

const ProfessorQuestion2 = () => {
    const {answers, updateAnswer} = useSetupContext();

    return <SlideTransition>
        <div className='flex flex-col items-center gap-2 w-full justify-center'>
            <h1 className='text-xl text-gray-100'>What is your academic rank?</h1>
            <TextInput defaultValue={answers['academic_rank']} name='academic_rank' onChange={(text) => updateAnswer('academic_rank', text.currentTarget.value)}
                       placeholder="Provide your academic rank" type='text' className={'w-full'}/>
        </div>
    </SlideTransition>
};

const ProfessorQuestion3 = () => {
    const {answers, updateAnswer} = useSetupContext();

    return <SlideTransition>
        <div className='flex flex-col items-center gap-2 w-full justify-center'>
            <h1 className='text-xl text-gray-100'>What subjects do you teach?</h1>
            <TextInput defaultValue={answers['subjects']} name='subjects' onChange={(text) => updateAnswer('subjects', text.currentTarget.value)}
                       placeholder='List the subjects you teach' type='text' className={'w-full'}/>
        </div>
    </SlideTransition>
};

export {
    GeneralQuestion,
    ProfessorQuestion1,
    ProfessorQuestion2,
    ProfessorQuestion3,
    StudentQuestion1,
    StudentQuestion2,
};