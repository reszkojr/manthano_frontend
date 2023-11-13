
type ButtonProps = {
    label: string;
    className: string;
};

const Button = (props: ButtonProps) => {
    const styles = {
        Button: 'w-full text-white bg-gray-600 hover:bg-lapis-500 transition-colors duration-100 focus:ring-4 focus:outline-none focus:ring-teal-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center' + props.className,
    };
	return (
		<button type='button' className={styles.Button}>
			{props.label}
		</button>
	);
};

export default Button;
