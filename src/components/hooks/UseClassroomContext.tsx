import { useContext } from 'react';

import { ClassroomContext } from '../../context/ClassroomContext';

export const useClassroomContext = () => {
	return useContext(ClassroomContext);
};
