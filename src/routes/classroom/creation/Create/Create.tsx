import Button from "../../../../components/elements/Button.tsx";
import TextInput from "../../../../components/elements/TextInput.tsx";
import React, {useState} from "react";
import SlideTransition from "../../../../components/animation/SlideTransition.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import useApi from "../../../../hooks/useApi.tsx";
import {isAxiosError} from "axios";

interface CreateProps {
    professor_managed?: boolean
}


const Create = (props: CreateProps) => {

    const [formQuestion, setFormQuestion] = useState<number>(0);
    const [classroomName, setClassroomName] = useState<string>('')
    const [classroomCode, setClassroomCode] = useState<string>('')

    const api = useApi();
    const navigate = useNavigate();

    const goBack = () => {
        switch (formQuestion) {
            case 0:
                navigate('/join');
                break;
            case 1:
                setFormQuestion(0);
                break;
        }
    }

    const goForward = () => {
        if (formQuestion === 0) {
            if (!classroomName) {
                toast.error("Classroom name is required.");
                return;
            }
            if (classroomName.length > 255) {
                toast.error("Classroom name is too big.");
                return;
            }
            setFormQuestion(1);
        } else if (formQuestion === 1) {
            if (!classroomCode) {
                toast.error("Classroom code is required.");
                return;
            }
            if (/\s/.test(classroomCode)) {
                toast.error("Classroom code cannot contain spaces.");
                return;
            }

            sendFormData()
                .then(response => {
                    toast.success('Your Classroom ' + response.data.name + ' was successfully created!')
                    navigate('/classroom/' + response.data.code)
                })
                .catch(error => {
                    if (isAxiosError(error)) {
                        // if (error.status === )
                        toast.error(error.response?.data)
                    }
                })
        }
    };

    const sendFormData = async () => {
        return api.post('/classroom/create/', {
            name: sanitizeInput('classroom_name', classroomName),
            code: sanitizeInput('classroom_code', classroomCode),
            professor_managed: props.professor_managed
        })
    }

    const sanitizeInput = (name: string, value: string): string => {
        if (name === 'classroom_name') {
            return value.slice(0, 255);
        }
        if (name === 'classroom_code') {
            return value.trim().replace(/\s+/g, '');
        }
        return value;
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        if (name === 'classroom_name') {
            setClassroomName(value);
        } else if (name === 'classroom_code') {
            setClassroomCode(value);
        }
    };

    return <div
        className={`absolute bottom-1/2 right-1/2 z-50 w-[400px] translate-x-1/2 translate-y-1/2 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow outline-none transition-all duration-200 md:w-[500px] transform`}>
        <div className='flex h-full flex-col items-center justify-center'>
            <div className="mb-3 w-full p-4">
                <h1 className='text-lg font-bold'>Create your Classroom</h1>
                {
                    formQuestion == 0 &&
                    <SlideTransition>
                        <h2 className='mb-4 text-gray-200'>Choose a name for your Classroom</h2>
                        <TextInput name={'classroom_name'} defaultValue={classroomName}
                                   type={'text'}
                                   onChange={handleInputChange}
                                   label={'Classroom\'s Name'}
                                   placeholder={'11th Grade'}/>

                    </SlideTransition>
                }
                {
                    formQuestion == 1 &&
                    <SlideTransition>
                        <h2 className='mb-4 text-gray-200'>Now, create a code for your Classroom</h2>
                        <TextInput name={'classroom_code'} defaultValue={classroomCode}
                                   type={'text'}
                                   onChange={handleInputChange}
                                   label={'Classroom\'s Code'}
                                   placeholder={'gradethe11th'}/>

                    </SlideTransition>
                }
            </div>
            <div className='bottom-0 mt-auto flex w-full justify-end gap-2 bg-gray-700 px-2 py-3'>
                <Button label={'Return'} onClick={goBack} className='w-32 justify-center'/>
                <Button label={'Next'} onClick={goForward} className='w-32 justify-center bg-teal-500'/>
            </div>
        </div>
    </div>
}

export default Create;