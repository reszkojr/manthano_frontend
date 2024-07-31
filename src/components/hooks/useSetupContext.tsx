import {useContext} from "react";
import {SetupContext} from "../../context/SetupContext.tsx";

export const useSetupContext = () => {
    const context = useContext(SetupContext);
    if (!context) {
        throw new Error('useSetupContext must be used within a SetupProvider');
    }
    return context;
};