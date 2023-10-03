type CheckboxProps = {
	id: string;
	text: string;
};

const styles = {
	container: 'flex space-x-2 items-center',
	checkbox: 'w-4 h-4 text-blue-60 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600',
};

const Checkbox = (props: CheckboxProps) => {
	return (
		<div className={styles.container}>
			<input type='checkbox' className={styles.checkbox} />
			<span>{props.text}</span>
		</div>
	);
};

export default Checkbox;
