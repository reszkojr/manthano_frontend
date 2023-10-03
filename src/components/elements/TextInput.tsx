type TextInputProps = {
	type: string;
	name: string;
	placeholder: string;
	label: string;
	className?: string;
};

const styles = {
	container: 'flex flex-col space-y-2',
	input: 'py-3 px-3 text-gray bg-gray-900 border border-gray-700 rounded-md',
};

const TextInput = (props: TextInputProps) => {
	return (
		<div className={styles.container}>
			<label htmlFor={props.name}>{props.label}</label>
			<input className={`${styles.input} ${props.className}`} type={props.type} name={props.name} placeholder={props.placeholder} />
		</div>
	);
};

export default TextInput;
