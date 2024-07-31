import {createContext, useCallback, useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";

interface SetupContextType {
    answers: {
        role: string;
        username: string;
        academicEmail: string;
        enrollment: string;
        academicRank: string;
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

    const [answers, setAnswers] = useState({
        role: '',
        username: '',
        academicEmail: '',
        enrollment: '',
        academicRank: '',
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
        setCurrentQuestion(nextIndex);
        navigate(questionUrls[nextIndex]);
    }, [currentQuestion, answers, questionUrls]);

    const previousQuestion = useCallback(() => {
        const prevIndex = Math.max(currentQuestion - 1, 0);
        setCurrentQuestion(prevIndex);
        navigate(questionUrls[prevIndex]);
    }, [currentQuestion, answers, questionUrls]);

    return (
        <SetupContext.Provider value={{ answers, updateAnswer, currentQuestion, nextQuestion, previousQuestion, setCurrentQuestion }}>
            <Outlet/>
        </SetupContext.Provider>
    );
};
