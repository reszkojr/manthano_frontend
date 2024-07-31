import {useSetupContext} from "../../../components/hooks/useSetupContext.tsx";

import Button from "../../../components/elements/Button.tsx";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";
import {Outlet} from "react-router-dom";

const Setup = () => {
    const {answers, currentQuestion, nextQuestion, previousQuestion} = useSetupContext();

    return (
        <div
            className='absolute bottom-0 left-0 right-0 top-0 mx-auto flex w-[400px] min-w-[400px] max-w-[700px] flex-col items-center overflow-hidden justify-center'>
            <header className='w-full rounded-xl rounded-b-none border border-gray-700 bg-gray-600 p-3'>
                <h1 className='text-center text-xl font-semibold text-gray-300'>Let's setup your account</h1>
            </header>
            <div
                className='w-full rounded-lg rounded-t-none border p-4 border-gray-700 bg-gray-800 shadow transition-all duration-500'>
                <div className='flex flex-col items-center gap-6 w-full justify-center'>
                    <Outlet/>
                </div>
            </div>
            <div className='m-2 w-full flex justify-between'>
                <Button disabled={currentQuestion === 0} onClick={previousQuestion}
                        className={`w-28 bg-gray-700 transition-opacity duration-150 disabled opacity-0'}`}
                        icon={<FaArrowLeft className='text-lapis-400'/>} label='Return'/>
                <Button disabled={answers["role"] === ''} label='Next' onClick={nextQuestion} icon={<FaArrowRight className='text-lapis-400'/>}
                        className='w-28 bg-gray-700 transition-opacity duration-150'/>
            </div>
        </div>
    );
};

export default Setup;
