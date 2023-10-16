type TextInputWithButtonProps = {
	type: string;
	name: string;
	buttonLabel: string;
	buttonType: 'button' | 'reset' | 'submit' | undefined;
	placeholder?: string;
	className?: string;
	onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const styles = {
	container: 'flex',
	input: 'py-3 px-3 flex-[3] h-12 text-gray bg-gray-900 border border-gray-700 rounded-md rounded-r-none',
	button: 'py-3 px-6 h-12 bg-persian-400 hover:bg-lapis-500 transition-colors duration-100 focus:ring-2 focus:outline-none focus:ring-teal-600 border-r-persian-300 border-l-none rounded-r',
};

const TextInputWithButton = (props: TextInputWithButtonProps) => {
	return (
		<div className={`${styles.container}${props.className ? ' ' + props.className : ''}`}>
			<input className={`${styles.input}`} type={props.type} name={props.name} placeholder={props.placeholder} />
			<button className={styles.button} type={props.buttonType} onClick={props.onClick}>
				{props.buttonLabel}
			</button>
		</div>
	);
};

export default TextInputWithButton;
