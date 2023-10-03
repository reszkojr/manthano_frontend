const styles = {
	submit: 'w-full text-white bg-persian-400 hover:bg-lapis-500 transition-colors duration-100 focus:ring-4 focus:outline-none focus:ring-teal-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center ',
};

type SubmitProps = {
	label: string;
};

const Submit = (props: SubmitProps) => {
	return (
		<button type='submit' className={styles.submit}>
			{props.label}
		</button>
	);
};

export default Submit;
