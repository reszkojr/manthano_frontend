import { useContext } from 'react';

import { NavigationPannelCollapseContext } from '../../context/NavigationPanelCollapseContext';

export const useNavigationPanelCollapse = () => {
	return useContext(NavigationPannelCollapseContext);
};
