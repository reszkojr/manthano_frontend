type TextInputProps = {
	type: string;
	name: string;
	label?: string;
	placeholder?: string;
	className?: string;
};

const styles = {
	container: 'flex flex-col space-y-2',
	input: 'py-3 px-3 text-gray bg-gray-900 border border-gray-700 rounded-md',
};

const TextInput = (props: TextInputProps) => {
	return (
		<div className={`${styles.container}${props.className ? ' ' + props.className : ''}`}>
			<label htmlFor={props.name}>{props.label}</label>
			<input className={`${styles.input}`} type={props.type} name={props.name} placeholder={props.placeholder} />
		</div>
	);
};

export default TextInput;
