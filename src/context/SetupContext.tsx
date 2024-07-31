import {createContext, useCallback, useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import useApi from "../hooks/useApi.tsx";

interface SetupContextType {
    answers: {
        role: string;
        academic_email: string;
        enrollment: string;
        academic_rank: string;
        subjects: string;
    };
    updateAnswer: (key: string, value: string) => void;
    currentQuestion: number;
    nextQuestion: () => void;
    previousQuestion: () => void;
    setCurrentQuestion: (questionNumber: (prev: number) => number) => void;
}

export const SetupContext = createContext<SetupContextType | undefined>(undefined);

export const SetupProvider = () => {
    const navigate = useNavigate();
    const api = useApi();

    const [answers, setAnswers] = useState({
        role: '',
        enrollment: '',
        academic_email: '',
        academic_rank: '',
        subjects: ''
    });
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionUrls, setQuestionUrls] = useState(['/auth/setup/form/role']);

    const updateAnswer = (key: string, value: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [key]: value
        }));
    };

    useEffect(() => {
        if (answers["role"] === 'student') {
            setQuestionUrls(() => ['/auth/setup/form/role', '/auth/setup/form/student/question1', '/auth/setup/form/student/question2']);
            return;
        }
        if (answers["role"] === 'professor') {
            setQuestionUrls(() => ['/auth/setup/form/role', '/auth/setup/form/professor/question1', '/auth/setup/form/professor/question2', '/auth/setup/form/professor/question3']);
            return;
        }
    }, [answers]);

    const nextQuestion = useCallback(() => {
        const nextIndex = Math.min(currentQuestion + 1, questionUrls.length - 1);
        if (nextIndex === currentQuestion) {
            sendData().then(() => navigate('/join'));
        }
        setCurrentQuestion(nextIndex);
        navigate(questionUrls[nextIndex]);
    }, [currentQuestion, answers, questionUrls]);

    const previousQuestion = useCallback(() => {
        const prevIndex = Math.max(currentQuestion - 1, 0);
        setCurrentQuestion(prevIndex);
        navigate(questionUrls[prevIndex]);
    }, [currentQuestion, answers, questionUrls]);

    const sendData = async () => {
        let data = {};

        if (answers['role'] === 'professor') {
            data = {
                role: answers['role'],
                academic_rank: answers['academic_rank'],
                academic_email: answers['academic_email'],
                subjects: answers['subjects']
            };
        } else if (answers['role'] === 'student') {
            data = {
                role: answers['role'],
                academic_email: answers['academic_email'],
                enrollment: answers['enrollment']
            };
        }

        return await api.post('/auth/setup/', data);
    }

    return (
        <SetupContext.Provider
            value={{answers, updateAnswer, currentQuestion, nextQuestion, previousQuestion, setCurrentQuestion}}>
            <Outlet/>
        </SetupContext.Provider>
    );
};
