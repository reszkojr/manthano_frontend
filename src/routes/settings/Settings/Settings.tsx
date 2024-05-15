import {Outlet} from "react-router-dom";

import settings from './settings.json'

const Settings = () => {
    return <div
        className={'flex bg-gray-800 margin-0 absolute select-none h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 rounded-2xl gap-2 border border-gray-700'}>
        <ul className={'min-w-1/5 w-1/5 flex flex-col m-4 gap-3'}>
            {
                Object.keys(settings).map((module, key) => (
                    <>
                        <li key={key}>
                            <h1 className={'text-gray-400 text-sm uppercase'}>{module}</h1>
                        </li>
                        <ul className={'gap-1 flex flex-col'}>
                            {settings[module as keyof typeof settings].map((setting, key) => (
                                <li key={key}
                                    className={`py-1 hover:bg-gray-500 px-2 hover:cursor-pointer hover:text-gray-100 text-gray-200 hover:border rounded-md transition-[border-color,color] border border-gray-800 duration-150 hover:border-gray-400 `}>
                                    <span>{setting}</span>
                                </li>
                            ))}
                        </ul>
                        <hr className={'w-full my-1 border-gray-600'}/>
                    </>
                ))
            }
        </ul>
        <div className={'w-full bg-gray-750 rounded-2xl border-l-gray-650 border-l p-4'}>
            <h1 className={'text-2xl font-extrabold text-center'}>Profile</h1>
            <Outlet/>
        </div>
    </div>
}

export default Settings;