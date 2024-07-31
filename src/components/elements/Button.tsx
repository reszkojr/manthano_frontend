import { MouseEventHandler } from 'react';

type ButtonProps = {
	icon?: React.ReactNode;
	label: string;
	className?: string;
	disabled?: boolean;
	onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = (props: ButtonProps) => {
	const styles = {
		Button: 'flex gap-2 items-center disabled:bg-gray-500 disabled:text-gray-200 text-white bg-gray-600 hover:bg-lapis-500 transition-all disabled:transition-all duration-100 focus:outline-none focus:ring-teal-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center ' + props.className,
	};
	return (
		<button type='button' disabled={props.disabled} onClick={props.onClick} className={styles.Button}>
			{props.icon && <div>{props.icon}</div>}
			{props.label}
		</button>
	);
};

export default Button;
