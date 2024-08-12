import Button from "../../../components/elements/Button.tsx";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import useApi from "../../../hooks/useApi.tsx";
import SlideTransition from "../../../components/animation/SlideTransition.tsx";
import {PiStudentFill} from "react-icons/pi";
import TextInput from "../../../components/elements/TextInput.tsx";
import Submit from "../../../components/elements/Submit.tsx";
import {toast} from "react-toastify";

interface UserProperties {
    role?: string;
    academic_email?: string;
    enrollment?: string;
    academic_rank?: string;
    subjects?: string;
}

interface QuestionProps {
    userProperties: UserProperties;
    setUserProperties: React.Dispatch<React.SetStateAction<UserProperties>>;
}

const Setup = () => {

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [userProperties, setUserProperties] = useState<UserProperties>({});

    const navigate = useNavigate();
    const api = useApi();

    const goBack = () => {
        if (currentQuestion === 0) {
            return navigate('/join')
        }
        setCurrentQuestion(prev => prev - 1);

    }

    const goForward = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Função para verificar se todos os campos obrigatórios estão preenchidos
        const isFilled = (field: keyof UserProperties) => {
            return userProperties[field] && userProperties[field]?.trim() !== '';
        };

        switch (currentQuestion) {
            case 0:
                if (!isFilled('role')) {
                    toast.error('Please select a role.');
                    return;
                }
                break;
            case 1:
                if (!isFilled('academic_email')) {
                    toast.error('Please provide your academic email.');
                    return;
                }
                break;
            case 2:
                if (userProperties.role === 'student' && !isFilled('enrollment')) {
                    toast.error('Please provide your enrollment number.');
                    return;
                }
                if (userProperties.role === 'professor' && !isFilled('academic_rank')) {
                    toast.error('Please provide your academic rank.');
                    return;
                }
                break;
            case 3:
                if (!isFilled('subjects')) {
                    toast.error('Please list the subjects you teach.');
                    return;
                }
                break;
            default:
                break;
        }

        setCurrentQuestion(prevState => prevState + 1);

        if ((currentQuestion === 2 && userProperties.role === 'student') || currentQuestion === 3) {
            sendFormData().then(() => navigate('/join'));
        }
    };

    const sendFormData = async () => {
        // complete esse código
        return api.post('/auth/setup/', userProperties);
    }

    const renderQuestion = () => {
        switch (currentQuestion) {
            case 0:
                return <RoleQuestion setUserProperties={setUserProperties} userProperties={userProperties}/>
            case 1:
                return <AcademicEmailQuestion setUserProperties={setUserProperties} userProperties={userProperties}/>
            case 2:
                if (userProperties.role === 'student') {
                    return <EnrollmentQuestion setUserProperties={setUserProperties} userProperties={userProperties}/>
                }
                if (userProperties.role === 'professor') {
                    return <AcademicRankQuestion setUserProperties={setUserProperties} userProperties={userProperties}/>
                }
                break;
            case 3:
                return <SubjectsQuestion setUserProperties={setUserProperties} userProperties={userProperties}/>
        }
    }

    return <div
        className={`absolute bottom-1/2 right-1/2 z-50 translate-x-1/2 translate-y-1/2 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow outline-none transition-all duration-200 md:w-[450px] transform`}>
        <form className='flex h-full flex-col items-center justify-center' onSubmit={event => goForward(event)}>
            <div className="mb-3 w-full flex flex-col gap-4 p-4 items-center">
                <h1 className='text-center font-bold text-gray-300'>Let's setup your account</h1>
                <div className="w-4/5">
                    {renderQuestion()}
                </div>
            </div>
            <div className='bottom-0 mt-auto flex w-full justify-end gap-2 bg-gray-700 px-2 py-3'>
                <Button label={'Return'} onClick={goBack} className='w-32 justify-center'/>
                <Submit label={'Next'} className='w-32 justify-center bg-teal-500'/>
            </div>
        </form>
    </div>
};

const RoleQuestion = ({userProperties, setUserProperties}: QuestionProps) => {
    return (
        <SlideTransition>
            <div className='flex flex-col items-center gap-6 w-full justify-center'>
                <h1 className='text-xl text-gray-100'>Are you a student or a professor?</h1>
                <div className={'flex justify-between gap-6 w-full'}>
                    <Button label={'Student'} icon={<PiStudentFill
                        className={`text-lapis-400 h-auto w-10 ${userProperties.role === 'student' && 'text-lapis-200'}`}/>}
                            className={`w-4/5 justify-center ${userProperties.role === 'student' && 'bg-lapis-500'}`}
                            onClick={() => setUserProperties(prev => ({...prev, role: 'student'}))}/>
                    <Button label={'Professor'} icon={<PiStudentFill
                        className={`text-lapis-400 h-auto w-10 ${userProperties.role === 'professor' && 'text-lapis-200'}`}/>}
                            className={`w-4/5 justify-center ${userProperties.role === 'professor' && 'bg-lapis-500'}`}
                            onClick={() => setUserProperties(prev => ({...prev, role: 'professor'}))}/>
                </div>
            </div>
        </SlideTransition>
    )
}

const AcademicEmailQuestion = ({userProperties, setUserProperties}: QuestionProps) => {
    return <SlideTransition>
        <div className='flex flex-col items-center gap-2 w-full justify-center'>
            <h1 className='text-xl text-gray-100'>What's your academic email?</h1>
            <TextInput defaultValue={userProperties.academic_email} name={'academic_email'}
                       onChange={(text) => setUserProperties(prev => ({
                           ...prev,
                           academic_email: text.target.value
                       }))}
                       placeholder={'Provide your academic email address'} className={'w-80'}
                       type={'text'}/>
        </div>
    </SlideTransition>
};

const EnrollmentQuestion = ({userProperties, setUserProperties}: QuestionProps) => {
    return <SlideTransition>
        <div className='flex flex-col items-center gap-2 w-full justify-center'>
            <h1 className='text-xl text-gray-100'>What is your enrollment number?</h1>
            <TextInput defaultValue={userProperties.enrollment} name='enrollment'
                       onChange={(text) => setUserProperties(prev => ({...prev, enrollment: text.target.value}))}
                       placeholder='Provide your enrollment number' type='text' className={'w-80'}/>
        </div>
    </SlideTransition>
};


const AcademicRankQuestion = ({userProperties, setUserProperties}: QuestionProps) => {
    return <SlideTransition>
        <div className='flex flex-col items-center gap-2 w-full justify-center'>
            <h1 className='text-xl text-gray-100'>What is your academic rank?</h1>
            <TextInput defaultValue={userProperties.academic_rank} name='academic_rank'
                       onChange={(text) => setUserProperties(prev => ({
                           ...prev,
                           academic_rank: text.target.value
                       }))}
                       placeholder="Provide your academic rank" type='text' className={'w-80'}/>
        </div>
    </SlideTransition>
};

const SubjectsQuestion = ({userProperties, setUserProperties}: QuestionProps) => {
    return <SlideTransition>
        <div className='flex flex-col items-center gap-2 w-full justify-center'>
            <h1 className='text-xl text-gray-100'>What subjects do you teach?</h1>
            <TextInput defaultValue={userProperties.subjects} name='subjects'
                       onChange={(text) => setUserProperties(prev => ({...prev, subjects: text.target.value}))}
                       placeholder='List the subjects you teach' type='text' className={'w-80'}/>
        </div>
    </SlideTransition>
};

export default Setup;
