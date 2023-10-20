interface CardProps {
	title: string;
	icon?: React.ReactNode;
	href: string;
	subtitle?: string;
	className?: string;
}

const Card = (props: CardProps) => {
	const styles = { card: `bg-gray-700 shadow-md rounded-md p-3 hover:filter hover:brightness-125 cursor-pointer transition-all duration-75 ${props.className}` };

	return (
		<div className={styles.card}>
			<a href={props.href} className='flex'>
				{props.icon && <div className='my-auto ml-2 mr-6'>{props.icon}</div>}
				<div className='pr-2'>
					<h2 className='text-md font-semibold'>{props.title}</h2>
					{props.subtitle && <p className='text-md text-gray-300'>{props.subtitle}</p>}
				</div>
			</a>
		</div>
	);
};

export default Card;
