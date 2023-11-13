type SubmitProps = {
	label: string;
	className?: string;
};

const Submit = (props: SubmitProps) => {
	const styles = {
		Submit: 'text-white bg-persian-400 hover:bg-lapis-500 transition-colors duration-100 focus:ring-4 focus:outline-none focus:ring-teal-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center ' + props.className,
	};
	return (
		<button type='submit' className={styles.Submit}>
			{props.label}
		</button>
	);
};

export default Submit;
