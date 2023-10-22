import { Dispatch, SetStateAction, createContext, useState } from 'react';
import Props from '../utils/Props';

interface ContextData {
	isPanelCollapsed: boolean;
	setPanelCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const NavigationPannelCollapseContext = createContext<ContextData>({} as ContextData);

export const NavigationPanelCollapseProvider = ({ children }: Props) => {
	const [isPanelCollapsed, setPanelCollapsed] = useState(false);

	return <NavigationPannelCollapseContext.Provider value={{ isPanelCollapsed, setPanelCollapsed }}>{children}</NavigationPannelCollapseContext.Provider>;
};
