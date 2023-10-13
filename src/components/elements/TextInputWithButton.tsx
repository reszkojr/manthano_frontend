type TextInputWithButtonProps = {
	type: string;
	name: string;
	buttonLabel: string;
	buttonType: 'button' | 'reset' | 'submit' | undefined;
	placeholder?: string;
	className?: string;
};

const styles = {
	container: 'table space-y-2',
	input: 'py-3 px-3 text-gray bg-gray-900 border border-gray-700 rounded-md border-r-none rounded-r-none',
	button: 'py-3 px-4 h-full bg-persian-400 hover:bg-lapis-500 transition-colors duration-100 focus:ring-2 focus:outline-none focus:ring-teal-600 border-r-gray-700 rounded-r',
};

const TextInputWithButton = (props: TextInputWithButtonProps) => {
	return (
		<div className={`${styles.container}${props.className ? ' ' + props.className : ''}`}>
			<input className={`${styles.input}`} type={props.type} name={props.name} placeholder={props.placeholder} />
			<button className={styles.button} type={props.buttonType}>
				{props.buttonLabel}
			</button>
		</div>
	);
};

export default TextInputWithButton;
