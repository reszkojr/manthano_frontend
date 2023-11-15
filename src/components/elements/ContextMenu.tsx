import classNames from 'classnames';

import { ContextMenuOption } from '../../types/Types';

interface Props {
	top: number;
	left: number;
	options: ContextMenuOption[];
	context: unknown;
}
const ContextMenu = (props: Props) => {
	return (
		<div
			className={`text-md absolute flex min-w-[200px] flex-col gap-1 overflow-hidden rounded-sm border border-gray-500 bg-gray-700 p-2 shadow-md`}
			style={{
				top: `${props.top}px`,
				left: `${props.left}px`,
			}}
		>
			{props.options.map((option, index) => (
				<div key={index} onClick={() => option.onClick(props.context)} className={classNames(`flex select-none items-center gap-2 rounded-sm p-[1px] px-1 hover:bg-gray-500 hover:text-gray-50 hover:brightness-105`, { 'pl-5': !option.icon, 'pl-1': option.icon })}>
					<div className='text-gray-400'>{option.icon && option.icon}</div>
					{option.label}
				</div>
			))}
		</div>
	);
};

export default ContextMenu;
