interface CardProps {
	title: string;
	icon?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
	subtitle?: string;
	className?: string;
}

const Card = (props: CardProps) => {
	const styles = { card: `flex gap-3 bg-gray-700 shadow-md rounded-md p-3 hover:filter hover:brightness-125 cursor-pointer transition-all duration-75 ${props.className}` };

	return (
		<div onClick={props.onClick} className={styles.card}>
			{props.icon && <div>{props.icon}</div>}
			<div className='content-center pr-2'>
				<h2 className='text-md font-semibold text-gray-100'>{props.title}</h2>
				{props.subtitle && <p className='text-md text-gray-300'>{props.subtitle}</p>}
			</div>
		</div>
	);
};

export default Card;
